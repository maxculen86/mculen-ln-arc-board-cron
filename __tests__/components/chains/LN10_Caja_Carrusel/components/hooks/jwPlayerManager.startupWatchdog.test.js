// Startup watchdog integration suite (WI 175632, SDD change
// carrusel-session-reducer). Exercises the IMPERATIVE side of the Startup FSM
// watchdog: arming/clearing STARTUP_WATCHDOG_MS in dispatchStartup based on
// the resulting FSM state, the STARTUP_TIMEOUT effect chain (console.error
// diagnostic + best-effort PLAY_AND_REVEAL) actually reaching the real
// player/host, and the timer being torn down on close()/teardownStartupListener
// so it can never fire against a torn-down session. The pure `nextStartup`
// transition table itself is covered separately in
// jwPlayerManager.startupFsm.test.js — this suite never asserts on FSM shape
// directly, only on observable side effects (mirrors the style of
// jwPlayerManager.prerollIntegration.test.js for the sibling preroll
// watchdog).

import { createPlayerMock } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/__helpers__/persistentPlayerHarness';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper',
    () => ({
        buildAdPlayerConfig: jest.fn(() => ({ playlist: [] })),
        setupPersistentPlayer: jest.fn(),
        attachComscorePlugin: jest.fn(),
        loadPlaylist: jest.fn(),
        buildJwPlaylist: jest.fn(({ playlist = [] } = {}) =>
            playlist.map(item => ({ mediaid: item.id }))
        ),
        registerPersistentPlayerEvents: jest.fn().mockReturnValue(jest.fn()),
        isMutePreferred: jest.fn().mockReturnValue(false),
        shouldMuteContent: jest.fn().mockReturnValue(false),
        toPlaylistIndex: jest.fn((playlist, index) => index),
        PREROLL_AD_VIDEO_POSITION: 3
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwAdPlayerManager',
    () => ({
        AD_HOST_ID: 'jw-ad-player-host',
        HANDOFF_WATCHDOG_MS: 7000,
        POST_IMPRESSION_WATCHDOG_MS: 120000,
        playPreroll: jest.fn(),
        destroy: jest.fn(),
        positionAdHost: jest.fn(),
        getAdHostElement: jest.fn(() => null)
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/comscoreAttachment',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/comscoreAttachment'
        ),
        attachComscorePlugin: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/utils/videoPlayerHelper',
    () => ({
        markProgrammaticMute: jest.fn(),
        registerJwVideoControlsTracking: jest.fn().mockReturnValue(jest.fn()),
        registerVideoResumeTracking: jest.fn().mockReturnValue(jest.fn())
    })
);

const loadManager = () =>
    require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerManager'); // eslint-disable-line global-require

describe('jwPlayerManager startup watchdog', () => {
    let helper;
    let adManager;
    let player;
    let listeners;

    const createAnchor = () => {
        const anchor = document.createElement('div');
        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 300,
            height: 500
        }));
        document.body.appendChild(anchor);
        return anchor;
    };

    const openStuckSession = manager => {
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.open({ playlist, variant: 'vertical', index: 0 });
        manager.positionOver(createAnchor());
        // JW never emits 'playlistItem': the session is stuck in `opening`
        // for the rest of the test, exactly the defect scenario (stuck
        // provider / malformed source / buggy JW build / a self-correction
        // loop that never lands).

        return playlist;
    };

    let consoleErrorSpy;

    beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
        document.body.innerHTML = '';
        consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        helper = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper'); // eslint-disable-line global-require
        adManager = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwAdPlayerManager'); // eslint-disable-line global-require

        ({ player, listeners } = createPlayerMock());
        helper.setupPersistentPlayer.mockReturnValue(player);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
        consoleErrorSpy.mockRestore();
    });

    it('exports STARTUP_WATCHDOG_MS as a named constant, sibling to the preroll watchdog constants', () => {
        const manager = loadManager();

        expect(manager.STARTUP_WATCHDOG_MS).toBe(10000);
    });

    // WI 175632 Blocker 3 fix (fresh adversarial review): PLAY_AND_REVEAL was
    // removed from the STARTUP_TIMEOUT effects. Re-targeting the provider
    // with playlistItem() AFTER a play() is already in flight does not
    // re-bind it (wrong-video-playing / stuck-idle) — so a later
    // `failed`+NAVIGATE recovery's COMMAND_ITEM would race against this
    // blind play. Worse for a measurement-correctness ticket: revealContent()
    // plays whatever index JW happens to have loaded, NOT `desired` (reaching
    // `failed` means the provider was never confirmed on target) — a
    // wrong-video Comscore/dataLayer hit. The watchdog's job is now strictly
    // to make the failure OBSERVABLE (console.error) and stop the infinite
    // COMMAND_ITEM loop — never to issue a blind play. User-visible behavior
    // is no worse than today (a hung startup was already a black player).
    it('reports a startup-timeout diagnostic via console.error but does NOT play (no blind play after a startup failure) when JW never settles within STARTUP_WATCHDOG_MS', () => {
        const manager = loadManager();
        openStuckSession(manager);

        expect(player.play).not.toHaveBeenCalled();

        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS);

        // NO play — see Blocker 3 fix note above.
        expect(player.play).not.toHaveBeenCalled();
        // The host is never revealed either: revealContent() (which flips
        // visibility) is only reachable through PLAY_AND_REVEAL, removed
        // from this path. Exactly as broken (not worse) as today's black
        // player.
        expect(
            document.getElementById('jw-player-manager-host').style.visibility
        ).toBe('hidden');

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error), {
            reason: 'startup-timeout',
            startupState: 'opening',
            desired: 0,
            source: 'jwPlayerManager/startup'
        });
    });

    it('never fires the watchdog once JW settles on the desired index before the timeout', () => {
        const manager = loadManager();
        openStuckSession(manager);

        player.getPlaylistIndex.mockReturnValue(0);
        listeners.playlistItem({ index: 0 });

        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS);

        expect(consoleErrorSpy).not.toHaveBeenCalled();
        // The regular SETTLE-driven PLAY_AND_REVEAL already played it once;
        // the watchdog must not fire a SECOND time on top of that.
        expect(player.play).toHaveBeenCalledTimes(1);
    });

    it('does NOT postpone the deadline when a thrashing provider keeps landing on the WRONG index (SETTLE while already in opening/settling must never re-arm)', () => {
        // Regression coverage for the exact defect named in the brief: a
        // provider that keeps emitting 'playlistItem' with the WRONG index
        // re-enters `settling` (landed!==desired -> COMMAND_ITEM) on every
        // event. The watchdog is an ABSOLUTE BUDGET from session start, not
        // a keep-alive — any sign of life must NOT push the deadline out,
        // or an infinite correction loop would run forever, actively
        // protected by the very watchdog meant to catch it.
        const manager = loadManager();
        openStuckSession(manager); // t=0: OPEN arms the deadline for t=10000

        jest.advanceTimersByTime(5000); // t=5000
        player.getPlaylistIndex.mockReturnValue(9);
        listeners.playlistItem({ index: 9 }); // opening -> settling, thrash #1

        jest.advanceTimersByTime(4999); // t=9999 -- still short of t=10000
        expect(consoleErrorSpy).not.toHaveBeenCalled();

        // Crossing the ORIGINAL 10s deadline from OPEN must fire the
        // watchdog even though 'playlistItem' kept arriving throughout —
        // a re-arming implementation would have pushed the deadline to
        // t=15000 here and this assertion would fail.
        jest.advanceTimersByTime(1); // t=10000
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        // WI 175632 Blocker 3 fix: STARTUP_TIMEOUT no longer issues
        // PLAY_AND_REVEAL, even here (the thrash never landed, so there is
        // still no play in flight to fall back to correctly).
        expect(player.play).not.toHaveBeenCalled();
    });

    it('does NOT postpone the deadline when NAVIGATE changes the desired index while still settling', () => {
        // NAVIGATE can legitimately change `desired` while already in
        // opening/settling (e.g. a swipe mid-startup) — this must not
        // postpone the absolute budget either.
        const manager = loadManager();
        const playlist = openStuckSession(manager); // t=0: deadline at t=10000

        jest.advanceTimersByTime(3000); // t=3000
        player.getPlaylistIndex.mockReturnValue(9);
        listeners.playlistItem({ index: 9 }); // opening -> settling

        jest.advanceTimersByTime(3000); // t=6000
        manager.goToIndex(4, playlist); // NAVIGATE while settling

        jest.advanceTimersByTime(3999); // t=9999
        expect(consoleErrorSpy).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1); // t=10000 -- original deadline from OPEN
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('never stacks two watchdog timers when re-entering the startup phase via close+reopen before the first deadline fires', () => {
        const manager = loadManager();
        const playlist = openStuckSession(manager); // t=0: deadline at t=10000

        jest.advanceTimersByTime(2000); // t=2000
        manager.close(); // clears the first (t=10000) deadline
        manager.open({ playlist, variant: 'vertical', index: 0 }); // re-arms fresh: t=2000+10000=12000
        manager.positionOver(createAnchor());

        jest.advanceTimersByTime(9999); // t=11999
        expect(consoleErrorSpy).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1); // t=12000
        // Exactly ONE timeout fires (the fresh deadline from the reopen). If
        // the FIRST timer had leaked instead of being cleared, it would have
        // already fired at t=10000, producing a second call by now.
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('clears the watchdog on close() so it cannot fire against a torn-down session', () => {
        const manager = loadManager();
        openStuckSession(manager);

        manager.close();
        jest.clearAllMocks();
        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS + 1000);

        expect(player.play).not.toHaveBeenCalled();
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('recovers on a fresh OPEN after a startup failure: the new session settles and plays normally', () => {
        const manager = loadManager();
        const playlist = openStuckSession(manager);

        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();

        manager.close();
        manager.open({ playlist, variant: 'vertical', index: 0 });
        manager.positionOver(createAnchor());

        player.getPlaylistIndex.mockReturnValue(0);
        listeners.playlistItem({ index: 0 });

        expect(player.play).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('still degrades cleanly (no throw, no play) when console.error itself throws inside the diagnostic report', () => {
        consoleErrorSpy.mockImplementation(() => {
            throw new Error('boom');
        });

        const manager = loadManager();
        openStuckSession(manager);

        expect(() =>
            jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS)
        ).not.toThrow();

        // WI 175632 Blocker 3 fix: no blind play, even if diagnostics throw.
        expect(player.play).not.toHaveBeenCalled();
    });

    // Blocker 1 regression coverage (fresh adversarial review): the earlier
    // watchdog tests mocked playPreroll as a bare jest.fn() that was never
    // invoked, so the interaction between the startup watchdog and an
    // ACTUAL ad break was never exercised. This drives the real preroll
    // path (queue -> playPreroll -> onHandoff) exactly like
    // jwPlayerManager.prerollIntegration.test.js does.
    const startupErrorCalls = () =>
        consoleErrorSpy.mock.calls.filter(
            ([, context]) =>
                context && context.source === 'jwPlayerManager/startup'
        );

    it('defers the startup watchdog (re-arms instead of failing) while a preroll legitimately owns the session, and stops deferring once it hands off', () => {
        const manager = loadManager();
        const requestTerminal = jest.fn();
        adManager.playPreroll.mockReturnValue({ requestTerminal });

        const playlist = [{ id: 'ad-video', counterVideo: 3 }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        // positionOver BEFORE open(), like prerollIntegration.test.js: a slot
        // must already be resolved for maybeStartPreroll() to fire from
        // inside open()'s own goToIndex() call.
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 0,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        // The preroll is genuinely in flight — content must NOT have started.
        expect(player.play).not.toHaveBeenCalled();

        // Advance across TWO full STARTUP_WATCHDOG_MS budgets while the ad
        // is still loading. A falsely-failing watchdog would have reported
        // an ERROR and force-played content by now; a correctly deferring
        // one must do neither.
        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS * 2);
        expect(startupErrorCalls()).toHaveLength(0);
        expect(player.play).not.toHaveBeenCalled();

        // Bounded termination: the ad's own handoff (forced eventually by
        // its own watchdogs) ends the deferral for good.
        const callbacks = adManager.playPreroll.mock.calls[0][0];
        callbacks.onHandoff({ reason: 'success' });

        expect(player.playlistItem).toHaveBeenCalledWith(0);
        expect(player.play).toHaveBeenCalledTimes(1);

        // The startup watchdog is now cleared (`started`) — no further
        // deferral re-arms and no diagnostic ever fires, however long we
        // wait afterward.
        consoleErrorSpy.mockClear();
        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS * 2);
        expect(startupErrorCalls()).toHaveLength(0);
    });

    it('goToIndex actually recovers (COMMAND_ITEM + a freshly re-armed watchdog) instead of silently no-oping when the session is already `failed`, with NO play() ever preceding the recovery command (WI 175632 Blocker 3)', () => {
        // Blocker 2 regression coverage: goToIndex() dispatches NAVIGATE
        // whenever startup !== 'started' (which includes `failed`) and
        // always returns true. Before the fix, NAVIGATE from `failed` hit
        // an inert fallthrough — every post-failure swipe silently did
        // NOTHING while reporting success.
        const manager = loadManager();
        const playlist = openStuckSession(manager); // no preroll; JW never settles

        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS); // -> failed
        expect(startupErrorCalls()).toHaveLength(1);
        // Blocker 3 regression coverage: STARTUP_TIMEOUT no longer issues
        // PLAY_AND_REVEAL, so nothing was ever in flight by the time the
        // session reaches `failed` — this is what makes the recovery below
        // genuinely safe (playlistItem() while idle, never after a play()).
        expect(player.play).not.toHaveBeenCalled();
        consoleErrorSpy.mockClear();
        player.playlistItem.mockClear();

        const result = manager.goToIndex(2, playlist);

        expect(result).toBe(true);
        // A user-initiated recovery attempt actually commands the provider —
        // it does not silently no-op while claiming success.
        expect(player.playlistItem).toHaveBeenCalledWith(2);

        // Test 2 (WI 175632 Blocker 3): assert ORDERING, not just absence —
        // whatever play() calls exist by the end of the test (there are
        // none at this point) must never have happened BEFORE this recovery
        // command. The old assertion (call-count only) was blind to this.
        const recoveryCallOrder =
            player.playlistItem.mock.invocationCallOrder[
                player.playlistItem.mock.invocationCallOrder.length - 1
            ];
        expect(
            player.play.mock.invocationCallOrder.every(
                order => order > recoveryCallOrder
            )
        ).toBe(true);

        // The recovery re-arms the watchdog with a FRESH budget: if JW still
        // never settles, it must fire again — the session must never be
        // left permanently dead after one failure.
        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS - 1);
        expect(startupErrorCalls()).toHaveLength(0);
        jest.advanceTimersByTime(1);
        expect(startupErrorCalls()).toHaveLength(1);
    });

    it('completes the `failed`+NAVIGATE recovery to EXACTLY ONE play() once JW genuinely settles on the recovered index (WI 175632 Blocker 3: this is now safe because no play() was ever in flight)', () => {
        const manager = loadManager();
        const playlist = openStuckSession(manager); // no preroll; JW never settles

        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS); // opening -> failed
        expect(startupErrorCalls()).toHaveLength(1);
        expect(player.play).not.toHaveBeenCalled();
        player.playlistItem.mockClear();

        manager.goToIndex(2, playlist); // failed + NAVIGATE -> settling, COMMAND_ITEM(2)
        expect(player.playlistItem).toHaveBeenCalledWith(2);
        expect(player.play).not.toHaveBeenCalled();

        // JW genuinely settles on the recovered index this time.
        player.getPlaylistIndex.mockReturnValue(2);
        listeners.playlistItem({ index: 2 }); // SETTLE{landed:2===desired:2} -> started, PLAY_AND_REVEAL

        expect(player.play).toHaveBeenCalledTimes(1);

        // Startup is genuinely done (`started`): no further watchdog fires,
        // however long we wait afterward.
        consoleErrorSpy.mockClear();
        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS * 2);
        expect(startupErrorCalls()).toHaveLength(0);
    });

    // CRITICAL fix (fresh adversarial review): the preroll deferral above is
    // bounded ONLY because preroll's own watchdogs
    // (HANDOFF_WATCHDOG_MS/POST_IMPRESSION_WATCHDOG_MS) always force a
    // HANDOFF eventually — FALSE for a preroll stuck at `queued` and never
    // reaching `loading`, since HANDOFF_WATCHDOG_MS is armed only INSIDE
    // maybeStartPreroll() AFTER a successful START. Without a ceiling,
    // isPrerollPendingOrActive() stays true forever and the deferral re-arms
    // indefinitely.
    it('WI 175632 CRITICAL fix: a preroll stuck in `queued` forever (never reaches `loading`, so its own HANDOFF_WATCHDOG_MS is never armed) does NOT defer past PREROLL_DEFERRAL_CEILING_MS — it fails with a distinct reason instead of hanging forever', () => {
        const manager = loadManager();
        const playlist = [{ id: 'ad-video', counterVideo: 3 }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        // open() targets the ad-marked slide directly. Its OWN internal
        // goToIndex() call queues the preroll then immediately attempts
        // maybeStartPreroll() — with no mount resolved yet, that attempt
        // fails and goToIndex's cancel-fallback reverts it to idle (unlike
        // positionOver(), goToIndex() always guards this case). Session
        // stays `opening`, the single startup watchdog is armed at t=10000.
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 0,
            urlAds: 'ads-url'
        });
        expect(adManager.playPreroll).not.toHaveBeenCalled();

        // Reproduces the documented pre-existing gap (OUT OF SCOPE to fix
        // here, noted separately): positionOver() force-queues the preroll
        // and calls maybeStartPreroll() with NO cancelPreroll() fallback if
        // it returns false — unlike goToIndex() above. A slot element that
        // resolves but is not yet connected (a realistic DOM-timing race)
        // leaves the preroll genuinely stuck at `queued` forever, with NO
        // watchdog of its own: HANDOFF_WATCHDOG_MS is only armed INSIDE
        // maybeStartPreroll() after a successful START, which never happens
        // here.
        const notYetConnectedAnchor = document.createElement('div');
        notYetConnectedAnchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 300,
            height: 500
        }));
        manager.positionOver(notYetConnectedAnchor);

        expect(adManager.playPreroll).not.toHaveBeenCalled();
        expect(player.play).not.toHaveBeenCalled();

        // Deferring for the full ceiling budget must NOT fail yet.
        jest.advanceTimersByTime(manager.PREROLL_DEFERRAL_CEILING_MS);
        expect(startupErrorCalls()).toHaveLength(0);
        expect(player.play).not.toHaveBeenCalled();

        // The NEXT watchdog cycle (the earliest point this can actually be
        // detected, since the ceiling is only checked when the timer fires)
        // must stop deferring and fail instead of hanging forever.
        jest.advanceTimersByTime(manager.STARTUP_WATCHDOG_MS);
        expect(startupErrorCalls()).toHaveLength(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error), {
            reason: 'startup-timeout-preroll-stuck',
            startupState: 'opening',
            desired: 0,
            source: 'jwPlayerManager/startup'
        });
        // Blocker 3 (still applies on the ceiling path too): never a blind
        // play, even when the ceiling forces a failure.
        expect(player.play).not.toHaveBeenCalled();
    });

    it('a healthy, legitimately long-running preroll (e.g. 90s, still well under POST_IMPRESSION_WATCHDOG_MS) is STILL deferred and NOT failed by the ceiling (no regression of the original preroll-deferral fix)', () => {
        const manager = loadManager();
        const requestTerminal = jest.fn();
        adManager.playPreroll.mockReturnValue({ requestTerminal });

        const playlist = [{ id: 'ad-video', counterVideo: 3 }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 0,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        expect(player.play).not.toHaveBeenCalled();

        // 90s of a genuinely active ad (loading/playing) — well under the
        // PREROLL_DEFERRAL_CEILING_MS ceiling — must never trip the startup
        // watchdog.
        jest.advanceTimersByTime(90000);
        expect(startupErrorCalls()).toHaveLength(0);
        expect(player.play).not.toHaveBeenCalled();

        const callbacks = adManager.playPreroll.mock.calls[0][0];
        callbacks.onHandoff({ reason: 'success' });

        expect(player.playlistItem).toHaveBeenCalledWith(0);
        expect(player.play).toHaveBeenCalledTimes(1);
    });
});
