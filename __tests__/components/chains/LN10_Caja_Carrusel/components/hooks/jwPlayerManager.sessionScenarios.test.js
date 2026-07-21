// Step0/Slice-1 characterization suite (SDD change carrusel-session-reducer,
// spec #1853, design v3 #1855, CT-1..CT-21). CT-1/CT-2 are REWRITTEN and
// CT-3/CT-4/CT-5/CT-6/CT-7/CT-14/CT-19 are UPDATED to the Slice 1 Startup FSM
// contract (spec §2 authorizes these behavior changes; design v3 §2 is the
// full transition table). All other CTs stay characterization-only, unchanged
// from Phase 0.
//
// CT -> it() mapping (this file covers the 18 CTs that exercise
// jwPlayerManager.js; CT-10/CT-11/CT-12 characterize useHandleBack/
// useScrollTo, which live in hooks/index.js — a DIFFERENT production
// module — and are therefore characterized in the paired
// __tests__/.../hooks/index.test.js file instead, per this codebase's
// 1:1 test-to-module convention (screaming architecture). See that file's
// "useHandleBack" and "useScrollTo" describe blocks.):
//
// | CT    | it() description                                                                          |
// |-------|--------------------------------------------------------------------------------------------|
// | CT-1  | (REWRITTEN) issues NO play()/command synchronously on a fresh session until JW settles     |
// | CT-2  | (REWRITTEN) SETTLE landed!==target commands playlistItem(target) with NO play; a later     |
// |       | SETTLE landed===target plays                                                               |
// | CT-3  | settle correction resolves against the LIVE index, not the captured open target             |
// | CT-4  | settle correction no-ops while a preroll owns index selection (pending or in-progress)      |
// | CT-5  | a stale settle listener from a closed session is guarded and never fires on the new session |
// | CT-6  | double navigation during the settle window resolves to the LAST live index                 |
// | CT-7  | goToIndex away from a PENDING preroll target cancels it and resumes normal content flow     |
// | CT-8  | goToIndex to the SAME in-progress preroll target keeps the ad running to completion         |
// | CT-9  | an out-of-range index fully tears down (stop, hide host, clear index) and returns false     |
// | CT-10 | SEE __tests__/.../hooks/index.test.js (useHandleBack — different module)                   |
// | CT-11 | SEE __tests__/.../hooks/index.test.js (useScrollTo — different module)                     |
// | CT-12 | SEE __tests__/.../hooks/index.test.js (useScrollTo — different module)                     |
// | CT-13 | setHostVisibility always forces pointerEvents none, whether revealing or hiding             |
// | CT-14 | close() before settle ever fires, then reopen, does not bleed session 1 target into session 2 |
// | CT-15 | ad handoff firing then close() in the SAME TICK ends with a single clean teardown           |
// | CT-16 | close() immediately after a natural auto-advance leaves no leaked listeners (zombie #2)     |
// | CT-17 | close() right after a mid-ad cancel makes the stale onHandoff a total no-op (zombie #1)     |
// | CT-18 | an owner switch mid-preroll destroys the outgoing ad and arms a fresh controller            |
// | CT-19 | rapid triple open/close/open/close/open (no yield) leaves only the last session live       |
// | CT-20 | it.todo — see discovery comment above that test: unreachable via current public API        |
// | CT-21 | close() when playerInstance exists but hostElement is null does not throw                  |

import get from '../../../../../../components/private/common/utils/get';
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
        toPlaylistIndex: jest.fn(),
        PREROLL_AD_VIDEO_POSITION: 3
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwAdPlayerManager',
    () =>
        require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/__helpers__/persistentPlayerHarness').createAdManagerMockModule() // eslint-disable-line global-require
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

// Only used by CT-21: wraps createPlayerHost so a single call can be forced
// to return null (teardown-order edge case) while every other collaborator
// keeps its real implementation.
jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerShared',
    () => {
        const actual = jest.requireActual(
            '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerShared'
        );
        return {
            ...actual,
            createPlayerHost: jest.fn(actual.createPlayerHost)
        };
    }
);

const loadManager = () =>
    require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerManager'); // eslint-disable-line global-require

const createConnectedElement = () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    return element;
};

describe('jwPlayerManager - session scenarios (step0 characterization, CT-1..CT-21)', () => {
    let helper;
    let adManager;
    let jwPlayerShared;
    let player;
    let listeners;
    let listenerStacks;
    let fireAll;

    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = '';

        helper = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper'); // eslint-disable-line global-require
        adManager = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwAdPlayerManager'); // eslint-disable-line global-require
        jwPlayerShared = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerShared'); // eslint-disable-line global-require

        ({ player, listeners, listenerStacks, fireAll } = createPlayerMock());
        helper.setupPersistentPlayer.mockReturnValue(player);
        helper.toPlaylistIndex.mockImplementation((playlist, index) => {
            const item = get(playlist, [index]);
            if (!item || get(item, 'isBanner')) return -1;
            return (
                playlist
                    .slice(0, index + 1)
                    .filter(entry => !get(entry, 'isBanner')).length - 1
            );
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('CT-1: (REWRITTEN, gate-2 amendment) issues a synchronous playlistItem(target) command on open, but NO play() until JW settles on the target', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

        // Startup FSM (Slice 1, design v3 §2 + §9 Addendum gate-2 amendment):
        // OPEN{target} -> opening, effect COMMAND_ITEM(target) — a
        // synchronous INDEX command IS issued with load/setup (measured
        // live: required on WARM, silently dropped on COLD — one uniform
        // rule, no cold/warm special-casing). This was never the bug: the
        // blind PLAY was. PLAY stays gated behind JW's own settle event
        // (CT-2), and the FSM stays in `opening` until that happens.
        // fullListVideoData is passed explicitly (matching real
        // usePersistentJwPlayer.js usage) so the target resolves against the
        // REAL playlist, not an empty fallback.
        expect(() =>
            manager.open({
                playlist,
                fullListVideoData: playlist,
                variant: 'vertical',
                index: 1
            })
        ).not.toThrow();

        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.play).not.toHaveBeenCalled();
        expect(player.on).toHaveBeenCalledWith(
            'playlistItem',
            expect.any(Function)
        );
        expect(listenerStacks.playlistItem).toHaveLength(1);
    });

    it('CT-2: (REWRITTEN) SETTLE landed!==target commands playlistItem(target) with NO play; a later SETTLE landed===target plays', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 1 });

        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.play).not.toHaveBeenCalled();

        player.getPlaylistIndex.mockReturnValue(1);
        fireAll('playlistItem', { index: 1, item: { mediaid: 'video-2' } });

        expect(player.play).toHaveBeenCalledTimes(1);
    });

    it('CT-3: settle correction resolves against the LIVE index, not the captured open target', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1' },
            { id: 'video-2' },
            { id: 'video-3' }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 }); // target A = 0

        manager.goToIndex(1, playlist); // user navigates to B = 1 before settle

        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.play).not.toHaveBeenCalled();
    });

    it('CT-4: cancels an unstartable queued preroll so startup can select content', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1' },
            { id: 'video-2' },
            { id: 'video-3' },
            { id: 'ad-video', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        // Lands on the preroll video, still PENDING — no slot resolved yet
        // (no positionOver()), so maybeStartPreroll() has not started it.
        manager.open({ playlist, variant: 'vertical', index: 3 });

        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

        // Without a mounted slot, the queued preroll is cancelled so content
        // can continue instead of remaining paused behind an impossible ad.
        expect(player.playlistItem).toHaveBeenCalledWith(3);
        expect(player.play).not.toHaveBeenCalled();
    });

    it('CT-5: a stale settle listener from a closed session is guarded and never fires on the new session', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 1 });

        const staleHandler = player.on.mock.calls.find(
            ([eventName]) => eventName === 'playlistItem'
        )[1];

        manager.close(); // session A closed before its settle event ever fires
        manager.open({ playlist, variant: 'vertical', index: 0 }); // session B

        expect(player.off).toHaveBeenCalledWith('playlistItem', staleHandler);

        // Clear the sync OPEN-effect calls from both sessions (gate-2
        // amendment) so this assertion observes ONLY the stale
        // (bypassed-off()) handler's own effect, if any.
        player.playlistItem.mockClear();

        player.getPlaylistIndex.mockReturnValue(1);
        // Bypass the mock's own off()-based removal to prove the CLOSED-state
        // structural guard (closed+SETTLE->NONE, not only explicit
        // deregistration) blocks it.
        staleHandler({ index: 1, item: { mediaid: 'video-2' } });

        expect(player.playlistItem).not.toHaveBeenCalled();
    });

    it('CT-6: double navigation during the settle window resolves to the LAST live index', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1' },
            { id: 'video-2' },
            { id: 'video-3' }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 }); // target A = 0

        manager.goToIndex(1, playlist); // -> B
        manager.goToIndex(2, playlist); // -> C (last write wins)

        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

        expect(player.playlistItem).toHaveBeenCalledWith(2);
    });

    it('CT-7: goToIndex away from a PENDING (not-yet-started) preroll target cancels it and resumes normal content flow', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'v1', counterVideo: 1 },
            { id: 'v2', counterVideo: 2 },
            { id: 'v3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        // No positionOver(): the slot never resolves, so the ad stays
        // pending (queued) — this is the preroll's LOAD phase, before
        // playPreroll() is ever invoked.
        manager.open({
            playlist,
            variant: 'vertical',
            index: 2,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).not.toHaveBeenCalled();

        manager.goToIndex(1, playlist); // navigate away from the pending target (2)

        expect(adManager.destroy).toHaveBeenCalledTimes(1);

        // FSM is still `opening` (never settled or handed off): the
        // corrective command is gated behind JW's own settle event
        // (Slice 1 — Startup FSM), NAVIGATE alone never issues it.
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'v1' } });

        expect(player.playlistItem).toHaveBeenCalledWith(1);
    });

    it('CT-8: goToIndex to the SAME in-progress preroll target keeps the ad running to completion', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'v1', counterVideo: 1 },
            { id: 'v3', counterVideo: 3 }
        ];
        const anchor = createConnectedElement();
        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 300,
            height: 500
        }));

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor);
        manager.open({
            playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);

        adManager.destroy.mockClear();
        player.playlistItem.mockClear();

        const result = manager.goToIndex(1, playlist); // same target, mid-ad

        expect(result).toBe(true);
        expect(adManager.destroy).not.toHaveBeenCalled();
        expect(player.playlistItem).not.toHaveBeenCalled();
        expect(adManager.playPreroll).toHaveBeenCalledTimes(1); // no re-arm
    });

    it('CT-9: an out-of-range index fully tears down (stop, hide host, clear index) and returns false', () => {
        const manager = loadManager();
        const playlist = [{ id: 'v1' }, { id: 'v2' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });
        // Reach `started` (Slice 1 — Startup FSM) so the out-of-range/
        // recovery assertions below exercise the real steady-state
        // goToIndex path, not the closed/opening FSM gate.
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'v1' } });

        const host = document.getElementById('jw-player-manager-host');
        player.stop.mockClear();
        player.playlistItem.mockClear();

        const result = manager.goToIndex(99, playlist);

        expect(result).toBe(false);
        expect(player.stop).toHaveBeenCalledTimes(1);
        expect(host.style.visibility).toBe('hidden');
        expect(player.playlistItem).not.toHaveBeenCalled();

        // currentPlaylistIndex was cleared (not left stale): navigating
        // back to the SAME index it was on before must re-issue
        // playlistItem instead of silently no-oping as a "duplicate" call.
        const recovered = manager.goToIndex(0, playlist);

        expect(recovered).toBe(true);
        expect(player.playlistItem).toHaveBeenCalledWith(0);
    });

    it('CT-13: setHostVisibility always forces pointerEvents none, whether revealing or hiding', () => {
        const manager = loadManager();
        const playlist = [{ id: 'v1' }];
        const anchor = createConnectedElement();
        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 300,
            height: 500
        }));

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor);
        // Reveals (visible=true) via maybeReveal() -> revealContent().
        manager.open({
            playlist,
            variant: 'vertical',
            index: 0,
            urlAds: 'ads-url'
        });

        const host = document.getElementById('jw-player-manager-host');
        // Cross-referenced: jwPlayerManager.regression.test.js:118/145 assert
        // the same two branches individually; consolidated here as one CT.
        expect(host.style.pointerEvents).toBe('none');

        manager.close(); // hides (visible=false)

        expect(host.style.pointerEvents).toBe('none');
    });

    it('CT-14: close() before settle ever fires, then reopen, does not bleed session 1 target into session 2', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1' },
            { id: 'video-2' },
            { id: 'video-3' }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 2 }); // session 1 target = 2

        const session1StaleHandler = player.on.mock.calls.find(
            ([eventName]) => eventName === 'playlistItem'
        )[1];

        manager.close(); // before session 1's settle ever fires
        manager.open({ playlist, variant: 'vertical', index: 0 }); // session 2, DIFFERENT target

        // Clear the sync OPEN-effect calls from both sessions (gate-2
        // amendment) so the assertions below observe ONLY each subsequent
        // fired event's own effect.
        player.playlistItem.mockClear();

        // Session 1's stale handler, if it somehow still fired, must
        // no-op — proving no bleed of session 1's target (2) into
        // session 2.
        player.getPlaylistIndex.mockReturnValue(1);
        session1StaleHandler({ index: 1, item: { mediaid: 'video-2' } });

        expect(player.playlistItem).not.toHaveBeenCalled();

        // Session 2's OWN settle correction still works correctly and
        // independently, resolving to session 2's target (0), never
        // session 1's.
        fireAll('playlistItem', { index: 1, item: { mediaid: 'video-2' } });

        expect(player.playlistItem).toHaveBeenCalledWith(0);
    });

    it('CT-15: ad handoff firing then close() in the SAME TICK ends with a single clean teardown, no dangling play()', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'v1', counterVideo: 1 },
            { id: 'v3', counterVideo: 3 }
        ];
        const anchor = createConnectedElement();
        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 300,
            height: 500
        }));

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor);
        manager.open({
            playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const handoff = adManager.playPreroll.mock.calls[0][0].onHandoff;

        adManager.destroy.mockClear();
        player.stop.mockClear();

        // Handoff reveals content (calls play()), then close() runs
        // immediately after in the same synchronous tick.
        handoff();
        const playCountAfterHandoff = player.play.mock.calls.length;
        manager.close();

        // Teardown happens exactly once, at the provider-safe terminal
        // boundary inside the ad module (requestTerminal -> remove owned IMA
        // iframes -> player.remove()), which runs BEFORE onHandoff fires. A
        // completed handoff therefore leaves nothing for close() to dispose,
        // so close() must NOT issue a second teardown. The guard in close()
        // still destroys if anything is left over (preroll not idle, or an ad
        // host lingering in the DOM) — see CT-17 for the mid-ad cancel path.
        expect(adManager.destroy).not.toHaveBeenCalled();
        expect(player.stop).toHaveBeenCalledTimes(1);
        // No extra play() reaches the now-closed session.
        expect(player.play.mock.calls.length).toBe(playCountAfterHandoff);

        const host = document.getElementById('jw-player-manager-host');
        expect(host.style.visibility).toBe('hidden');
    });

    it('CT-16: close() immediately after a natural auto-advance leaves no leaked listeners on the dead player (zombie #2 characterization)', () => {
        const manager = loadManager();
        const playlist = [{ id: 'v1' }, { id: 'v2' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });

        // Simulate: video completes naturally and auto-advances
        // (handleNextCallback, registered externally via
        // registerPersistentPlayerEvents — mocked here) into the next
        // item, which starts actively playing.
        manager.goToIndex(1, playlist);

        // close() runs in the SAME macrotask, no yield in between.
        expect(() => manager.close()).not.toThrow();

        // clearListenerRegistrations() tears down the event wiring exactly
        // once — the closest observable proxy at this module boundary for
        // "no post-close heartbeat cadence". The real Comscore heartbeat
        // itself lives in the external SDK driven by
        // registerPersistentPlayerEvents (mocked away here); live silence
        // is the P3 exit criterion re-verified on-device against
        // #1841/#1845, not a unit-level assertion.
        expect(helper.registerPersistentPlayerEvents).toHaveBeenCalledTimes(1);

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });

        // Fresh registration for the next session — proving no double
        // registration/leak from the raced close().
        expect(helper.registerPersistentPlayerEvents).toHaveBeenCalledTimes(2);
    });

    it('CT-17: close() right after a mid-ad cancel makes the stale onHandoff, when it later fires, a total no-op (zombie #1 characterization)', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'v1', counterVideo: 1 },
            { id: 'v3', counterVideo: 3 }
        ];
        const anchor = createConnectedElement();
        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 300,
            height: 500
        }));

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor);
        manager.open({
            playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const staleHandoff = adManager.playPreroll.mock.calls[0][0].onHandoff;

        manager.goToIndex(0, playlist); // swipe away mid-ad: cancelPreroll()

        expect(adManager.destroy).toHaveBeenCalledTimes(1);

        manager.close(); // runs BEFORE the ad's own stale onHandoff would fire

        player.playlistItem.mockClear();
        player.play.mockClear();

        staleHandoff(); // the late callback arrives after both cancel AND close

        expect(player.playlistItem).not.toHaveBeenCalled();
        expect(player.play).not.toHaveBeenCalled();
    });

    it('CT-18: an owner switch mid-preroll destroys the outgoing ad, keeps its stale handoff inert, and arms a fresh controller for the new owner', () => {
        const manager = loadManager();
        const playlistA = [
            { id: 'a1', counterVideo: 1 },
            { id: 'a3', counterVideo: 3 }
        ];
        const playlistB = [
            { id: 'b1', counterVideo: 1 },
            { id: 'b3', counterVideo: 3 }
        ];
        const anchor = createConnectedElement();
        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 300,
            height: 500
        }));

        manager.ensure({ playlist: playlistA, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor);
        manager.open({
            playlist: playlistA,
            variant: 'vertical',
            ownerKey: 'ownerA',
            index: 1,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        const staleHandoffA = adManager.playPreroll.mock.calls[0][0].onHandoff;

        // ownerB opens before ownerA's handoff fires: open() closes
        // ownerA's session internally (different ownerKey), destroying its
        // ad and clearing pendingPosition as part of that teardown. Real
        // callers re-apply positionOver once the new owner's slot is
        // measured (a later effect tick); simulate that here by
        // re-applying it right after open() resolves the new session.
        manager.open({
            playlist: playlistB,
            variant: 'vertical',
            ownerKey: 'ownerB',
            index: 1,
            urlAds: 'ads-url'
        });
        manager.positionOver(anchor);

        expect(adManager.destroy).toHaveBeenCalled();
        // ownerB lands on its own preroll target: a fresh controller arms.
        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);

        player.playlistItem.mockClear();
        player.play.mockClear();
        staleHandoffA(); // ownerA's stale handoff, if it still fires, is inert

        expect(player.playlistItem).not.toHaveBeenCalled();
        expect(player.play).not.toHaveBeenCalled();
    });

    it('H4: swipe away from an IN-PROGRESS preroll cancels the ad and plays the target video immediately (not deferred to the ad handoff)', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'v1', counterVideo: 1 },
            { id: 'v2', counterVideo: 2 },
            { id: 'v3', counterVideo: 3 }
        ];
        const anchor = createConnectedElement();
        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 300,
            height: 500
        }));

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor);
        manager.open({
            playlist,
            variant: 'vertical',
            index: 2,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        const staleHandoff = adManager.playPreroll.mock.calls[0][0].onHandoff;

        // User swipes to a different item while the ad is still playing: the
        // ad must be cancelled and the swiped-to video played immediately,
        // not deferred until the ad's own handoff.
        manager.goToIndex(0, playlist);

        expect(adManager.destroy).toHaveBeenCalled();
        expect(player.playlistItem).toHaveBeenCalledWith(0);
        expect(player.play).toHaveBeenCalled();

        // The cancelled ad's own handoff is now stale and must be a no-op.
        player.playlistItem.mockClear();
        player.play.mockClear();
        staleHandoff();

        expect(player.playlistItem).not.toHaveBeenCalled();
        expect(player.play).not.toHaveBeenCalled();
    });

    it('CT-19: rapid triple open/close/open/close/open (no yield) leaves only the last session live, no leaked listeners (P2-1 hard gate)', () => {
        const manager = loadManager();
        const playlist = [{ id: 'v1' }, { id: 'v2' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });

        expect(() => {
            manager.open({
                playlist,
                variant: 'vertical',
                ownerKey: 'a',
                index: 0
            });
            manager.close();
            manager.open({
                playlist,
                variant: 'vertical',
                ownerKey: 'a',
                index: 1
            });
            manager.close();
            manager.open({
                playlist,
                variant: 'vertical',
                ownerKey: 'a',
                index: 0
            });
        }).not.toThrow();

        // Only the LAST session's startup listener is still armed — the
        // first two were explicitly deregistered (teardownStartupListener())
        // by their own close(), and off() removes the SPECIFIC stacked
        // callback (mock fidelity per persistentPlayerHarness).
        expect(listenerStacks.playlistItem).toHaveLength(1);

        player.getPlaylistIndex.mockReturnValue(1);
        fireAll('playlistItem', { index: 1, item: { mediaid: 'v2' } });

        // Only the third (last) session's target (0) is corrected to — no
        // bleed from either of the two intermediate sessions.
        expect(player.playlistItem).toHaveBeenCalledWith(0);

        // NOTE: openCounter itself is a private module counter never
        // surfaced through the public API or any mocked collaborator's
        // call args, so its exact monotonic-across-closes value is not
        // observable at this black-box boundary; the OBSERVABLE contract
        // asserted above (single live listener set, no cross-session
        // bleed) is what this CT characterizes.
    });

    // CT-20 discovery: every reachable path to a second preroll arm (id
    // N+1) while a previous controller (id N) still exists runs
    // abortPrerollController() FIRST (via cancelPreroll() or close()),
    // which synchronously sets the outgoing controller's `.aborted = true`
    // before any new controller is created. The onHandoff guard is
    // `!capturedController || capturedController.aborted ||
    // capturedController.id !== get(sessionState.prerollController, 'id')`
    // (jwPlayerManager.js, inside maybeStartPreroll's onHandoff, ~line
    // 171) — `||` short-circuits on `.aborted` first, so no
    // publicly-reachable sequence exists today where the id-mismatch
    // clause ALONE (with `.aborted === false`) is what stops a stale
    // handoff. Observed vs specified: the spec's Given ("id=1 pending
    // handoff, NOT aborted") describes a precondition this module's
    // current code cannot reach through open()/goToIndex()/close() — the
    // `.aborted` flag and the id-check currently always co-occur. This is
    // a spec-correction signal for the P3 reducer design, not a step0 bug:
    // flagging it here instead of forcing a synthetic private-state test.
    it.todo(
        'CT-20: a new preroll arming while the previous onHandoff is pending and NOT aborted no-ops the old handoff via id mismatch alone'
    );

    it('CT-21: close() when playerInstance exists but hostElement is null does not throw', () => {
        const manager = loadManager();
        const playlist = [{ id: 'v1' }];

        // Force the host-creation collaborator to fail for exactly this
        // one call (teardown-order edge case per spec): ensure() does not
        // gate setupPersistentPlayer() on createHost()'s success, so
        // playerInstance still gets set while hostElement stays null.
        jwPlayerShared.createPlayerHost.mockReturnValueOnce(null);

        manager.ensure({ playlist, urlAds: 'ads-url' });

        expect(() => manager.close()).not.toThrow();
    });

    describe('Slice 1 — Startup FSM integration (cold + warm startup)', () => {
        it('cold open never calls play() before a SETTLE event lands on the target', () => {
            const manager = loadManager();
            const playlist = [
                { id: 'video-1' },
                { id: 'video-2' },
                { id: 'video-3' }
            ];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 2 });

            expect(player.play).not.toHaveBeenCalled();

            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

            expect(player.play).not.toHaveBeenCalled();
        });

        it('cold open of a late card: exactly one play() across two settle events (SETTLE{0}->COMMAND_ITEM(target)->SETTLE{target}->play)', () => {
            const manager = loadManager();
            const playlist = [
                { id: 'video-1' },
                { id: 'video-2' },
                { id: 'video-3' }
            ];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 2 });

            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

            expect(player.playlistItem).toHaveBeenCalledWith(2);
            expect(player.play).not.toHaveBeenCalled();

            player.getPlaylistIndex.mockReturnValue(2);
            fireAll('playlistItem', { index: 2, item: { mediaid: 'video-3' } });

            expect(player.play).toHaveBeenCalledTimes(1);
        });

        it('warm reopen (existing player, reused instance) also gates play() behind the target settle', () => {
            const manager = loadManager();
            const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 0 });
            manager.close();

            // Warm reopen: playerInstance is reused (never destroyed by
            // close()).
            manager.open({ playlist, variant: 'vertical', index: 1 });

            expect(player.play).not.toHaveBeenCalled();

            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

            expect(player.playlistItem).toHaveBeenCalledWith(1);
            expect(player.play).not.toHaveBeenCalled();

            player.getPlaylistIndex.mockReturnValue(1);
            fireAll('playlistItem', { index: 1, item: { mediaid: 'video-2' } });

            expect(player.play).toHaveBeenCalledTimes(1);
        });

        it('gate-3 amendment: warm reopen of the SAME playlist issues NO setup()/load()/remove(), still commands playlistItem(target) synchronously, and plays only after settle-on-target — direct single-settle success AND settle(0)-first cold-style fallback', () => {
            const manager = loadManager();
            const playlist = [
                { id: 'video-1' },
                { id: 'video-2' },
                { id: 'video-3' }
            ];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 0 });
            manager.close();

            // Warm reopen, SAME playlist content (design v3 §9 Addendum
            // gate-3 amendment): the unwinnable WARM post-settle race is
            // eliminated by construction — setup()/load() never run again
            // (the player is already stopped by close() and already has
            // this exact content), so there is no provider-prep window to
            // race against. The synchronous OPEN-time playlistItem(target)
            // command (gate-2) now binds the provider DETERMINISTICALLY at
            // idle (measured live, experiments E2/A1).
            manager.open({
                playlist,
                fullListVideoData: playlist,
                variant: 'vertical',
                index: 1
            });

            expect(helper.setupPersistentPlayer).toHaveBeenCalledTimes(1);
            expect(player.remove).not.toHaveBeenCalled();
            expect(player.playlistItem).toHaveBeenCalledWith(1);
            expect(player.play).not.toHaveBeenCalled();

            // WARM success path: JW's FIRST settle lands DIRECTLY on the
            // target — a single settle event suffices, no intermediate
            // mismatch/re-command needed.
            player.getPlaylistIndex.mockReturnValue(1);
            fireAll('playlistItem', { index: 1, item: { mediaid: 'video-2' } });

            expect(player.play).toHaveBeenCalledTimes(1);

            // COLD-style fallback (still supported by the SAME uniform FSM
            // rule, no cold/warm special-casing): a second warm reopen (same
            // playlist again) where the first settle lands elsewhere first —
            // the command is simply re-issued (redundant but harmless) and
            // play still waits for the target settle.
            manager.close();
            manager.open({
                playlist,
                fullListVideoData: playlist,
                variant: 'vertical',
                index: 2
            });
            expect(helper.setupPersistentPlayer).toHaveBeenCalledTimes(1);
            expect(player.remove).not.toHaveBeenCalled();

            player.playlistItem.mockClear();
            player.play.mockClear();

            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

            expect(player.playlistItem).toHaveBeenCalledWith(2);
            expect(player.play).not.toHaveBeenCalled();

            player.getPlaylistIndex.mockReturnValue(2);
            fireAll('playlistItem', { index: 2, item: { mediaid: 'video-3' } });

            expect(player.play).toHaveBeenCalledTimes(1);
        });

        it('Comscore-regression fix: reopening with a DIFFERENT playlist calls loadPlaylist() on the EXISTING player, never remove()s it, never re-setup()s it, and still settles+plays the target', () => {
            const manager = loadManager();
            const firstPlaylist = [{ id: 'video-1' }, { id: 'video-2' }];
            const secondPlaylist = [{ id: 'video-9' }, { id: 'video-10' }];

            manager.ensure({ playlist: firstPlaylist, urlAds: 'ads-url' });
            manager.open({
                playlist: firstPlaylist,
                variant: 'vertical',
                index: 0
            });
            expect(helper.setupPersistentPlayer).toHaveBeenCalledTimes(1);

            manager.close();
            manager.open({
                playlist: secondPlaylist,
                fullListVideoData: secondPlaylist,
                variant: 'vertical',
                index: 1
            });

            // The ONE persistent player instance survives the cross-carousel
            // reopen — its single Comscore plugin survives with it (fixes
            // regression #1877: remove()+setup() destroyed the plugin and it
            // could not be re-attached). No 2nd setup(), no remove().
            expect(player.remove).not.toHaveBeenCalled();
            expect(helper.setupPersistentPlayer).toHaveBeenCalledTimes(1);
            expect(helper.loadPlaylist).toHaveBeenCalledWith(
                player,
                helper.buildJwPlaylist({ playlist: secondPlaylist })
            );

            // The FSM's own synchronous OPEN-effect command still fires
            // (provider-init window — silently dropped by real JW, harmless
            // here; the settle-gated correction row below handles it).
            expect(player.playlistItem).toHaveBeenCalledWith(1);
            expect(player.play).not.toHaveBeenCalled();

            player.getPlaylistIndex.mockReturnValue(1);
            fireAll('playlistItem', {
                index: 1,
                item: { mediaid: 'video-10' }
            });

            expect(player.play).toHaveBeenCalledTimes(1);
        });

        it('signature correctness: same ordered mediaids -> same signature; a changed or reordered id -> different signature', () => {
            const { computePlaylistSignature } = loadManager();

            const same1 = computePlaylistSignature([
                { id: 'a' },
                { id: 'b' },
                { id: 'c' }
            ]);
            const same2 = computePlaylistSignature([
                { id: 'a' },
                { id: 'b' },
                { id: 'c' }
            ]);
            const changedId = computePlaylistSignature([
                { id: 'a' },
                { id: 'x' },
                { id: 'c' }
            ]);
            const reordered = computePlaylistSignature([
                { id: 'a' },
                { id: 'c' },
                { id: 'b' }
            ]);

            expect(same1).toBe(same2);
            expect(same1).not.toBe(changedId);
            expect(same1).not.toBe(reordered);
        });

        it('gate-driven fix: a goToIndex() call BEFORE open() re-runs (session `closed`, same reused player) issues NO command/play, and the subsequent open()+settle plays the target normally', () => {
            // Measured localhost warm-reopen race (post-apply gate failure):
            // usePersistentJwPlayer.js runs a SEPARATE effect that calls
            // goToIndex(currentIndex, ...) whenever currentIndex changes,
            // independently of the effect that calls open() once metadata
            // resolves — so on a warm reopen, goToIndex can fire BEFORE
            // open() re-runs, against the SAME reused (still-loaded) player
            // instance from the previous session, while
            // `sessionState.startup === 'closed'`. The OLD (pre-gate-fix)
            // routing only diverted `opening`/`settling` to the FSM and let
            // `closed` fall through to the unconditional legacy
            // playlistItem()+play() pair — exactly the blind-play race the
            // FSM exists to eliminate (model lands on the new target, the
            // pre-open play() thread latches the PREVIOUS session's item 0
            // across the next load()).
            const manager = loadManager();
            const playlist = [
                { id: 'video-1' },
                { id: 'video-2' },
                { id: 'video-3' }
            ];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 0 });
            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });
            manager.close();

            // Clear the calls from the first (now-closed) session so the
            // assertions below observe ONLY the pre-open goToIndex() call.
            player.playlistItem.mockClear();
            player.play.mockClear();

            // Reproduces the exact race: goToIndex() is called with the
            // NEXT target BEFORE open() runs again for the new session.
            const preOpenResult = manager.goToIndex(2, playlist);

            expect(preOpenResult).toBe(true);
            expect(player.playlistItem).not.toHaveBeenCalled();
            expect(player.play).not.toHaveBeenCalled();

            // open() now runs for real, carrying the target via OPEN{target}.
            manager.open({ playlist, variant: 'vertical', index: 2 });

            expect(player.play).not.toHaveBeenCalled();

            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

            expect(player.playlistItem).toHaveBeenCalledWith(2);
            expect(player.play).not.toHaveBeenCalled();

            player.getPlaylistIndex.mockReturnValue(2);
            fireAll('playlistItem', { index: 2, item: { mediaid: 'video-3' } });

            expect(player.play).toHaveBeenCalledTimes(1);
        });

        it('target=0 plays immediately on the first settle (REQ-14 parity: index 0 is not a special case)', () => {
            const manager = loadManager();
            const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 0 });

            // Gate-2 amendment: open() already issued the synchronous
            // OPEN-effect command (playlistItem(0)).
            expect(player.playlistItem).toHaveBeenCalledTimes(1);
            expect(player.playlistItem).toHaveBeenCalledWith(0);

            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

            // landed===desired immediately -> PLAY_AND_REVEAL; no ADDITIONAL
            // corrective COMMAND_ITEM was ever needed.
            expect(player.playlistItem).toHaveBeenCalledTimes(1);
            expect(player.play).toHaveBeenCalledTimes(1);
        });

        it('preroll-owned startup stays inert through settle, transitions to started on HANDOFF, and the post-handoff settle echo does not double-play', () => {
            const manager = loadManager();
            const playlist = [
                { id: 'v1', counterVideo: 1 },
                { id: 'v3', counterVideo: 3 }
            ];
            const anchor = createConnectedElement();
            anchor.getBoundingClientRect = jest.fn(() => ({
                top: 0,
                left: 0,
                width: 300,
                height: 500
            }));

            manager.ensure({ playlist, urlAds: 'ads-url' });
            listeners.ready();
            manager.positionOver(anchor);
            manager.open({
                playlist,
                variant: 'vertical',
                index: 1,
                urlAds: 'ads-url'
            });

            expect(adManager.playPreroll).toHaveBeenCalledTimes(1);

            // A settle landing while the preroll owns selection must stay
            // inert (CT-4).
            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', { index: 0, item: { mediaid: 'v1' } });

            expect(player.playlistItem).not.toHaveBeenCalled();
            expect(player.play).not.toHaveBeenCalled();

            const handoff = adManager.playPreroll.mock.calls[0][0].onHandoff;
            handoff();

            // Handoff's own (unchanged) mechanism selects + plays content
            // once, and dispatches HANDOFF -> started.
            expect(player.playlistItem).toHaveBeenCalledWith(1);
            expect(player.play).toHaveBeenCalledTimes(1);

            player.play.mockClear();
            player.playlistItem.mockClear();

            // The real JW 'playlistItem' event that follows the handoff's
            // own playlistItem() call echoes back into this same listener —
            // the FSM is already `started`, so it must not fire a second
            // play() (no double play on the post-handoff echo).
            player.getPlaylistIndex.mockReturnValue(1);
            fireAll('playlistItem', { index: 1, item: { mediaid: 'v3' } });

            expect(player.play).not.toHaveBeenCalled();
            expect(player.playlistItem).not.toHaveBeenCalled();
        });
    });
});
