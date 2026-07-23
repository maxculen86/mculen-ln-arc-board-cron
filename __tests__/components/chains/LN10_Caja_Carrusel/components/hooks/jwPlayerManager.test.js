import get from '../../../../../../components/private/common/utils/get';
import { createPlayerMock } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/__helpers__/persistentPlayerHarness';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper',
    () => ({
        buildAdPlayerConfig: jest.fn(() => ({ playlist: [] })),
        setupPersistentPlayer: jest.fn(),
        attachComscorePlugin: jest.fn(),
        loadPlaylist: jest.fn(),
        // Content-only mapping (mediaid + comscore labels, NO adschedule).
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

// Only the leaf attachComscorePlugin is mocked (controllable per test); the
// real retry/backoff loop (tryAttachComscorePlugin) runs unmodified so the
// timing tests below exercise the actual implementation.
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

const createConnectedElement = () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    return element;
};

describe('jwPlayerManager', () => {
    let helper;
    let adManager;
    let comscoreAttachment;
    let player;
    let listeners;
    let fireAll;

    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = '';

        helper = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper'); // eslint-disable-line global-require
        adManager = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwAdPlayerManager'); // eslint-disable-line global-require
        comscoreAttachment = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/comscoreAttachment'); // eslint-disable-line global-require

        ({ player, listeners, fireAll } = createPlayerMock());
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

    it('should reuse the same player while switching variants and keep Comscore attached once per page', () => {
        comscoreAttachment.attachComscorePlugin.mockReturnValue(true);

        const manager = loadManager();
        const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        listeners.ready();

        manager.open({ playlist, variant: 'vertical', index: 0 });
        const anchor1 = createConnectedElement();
        anchor1.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 300,
            height: 500
        }));
        manager.positionOver(anchor1);

        // Startup FSM (Slice 1 + gate-2 amendment): open() already issued a
        // synchronous playlistItem(0) command (OPEN's COMMAND_ITEM effect);
        // play() is still gated behind JW's own settle confirming the
        // target — one matching settle suffices (WARM-style single-settle
        // success, per the gate-2 measured evidence).
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

        manager.close();
        manager.open({ playlist, variant: 'horizontal', index: 1 });
        const anchor2 = createConnectedElement();
        anchor2.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 500,
            height: 300
        }));
        manager.positionOver(anchor2);

        player.getPlaylistIndex.mockReturnValue(1);
        fireAll('playlistItem', { index: 1, item: { mediaid: 'video-2' } });

        // Gate-3 amendment (design v3 §9 Addendum): SAME playlist content
        // across both opens -> warm reopen, setup()/load() never re-run.
        expect(helper.setupPersistentPlayer).toHaveBeenCalledTimes(1);
        expect(comscoreAttachment.attachComscorePlugin).toHaveBeenCalledTimes(
            2
        );
        expect(player.remove).not.toHaveBeenCalled();
        expect(player.playlistItem).toHaveBeenNthCalledWith(1, 0);
        expect(player.playlistItem).toHaveBeenNthCalledWith(2, 1);
        expect(player.play).toHaveBeenCalledTimes(2);
    });

    it('should retry Comscore attachment until the plugin becomes available', () => {
        jest.useFakeTimers();
        comscoreAttachment.attachComscorePlugin
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);

        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();

        expect(comscoreAttachment.attachComscorePlugin).toHaveBeenCalledTimes(
            1
        );

        jest.advanceTimersByTime(100);

        expect(comscoreAttachment.attachComscorePlugin).toHaveBeenCalledTimes(
            2
        );

        jest.useRealTimers();
    });

    it('should retry Comscore attachment after a close/reopen cycle when the plugin was not ready yet', () => {
        jest.useFakeTimers();
        comscoreAttachment.attachComscorePlugin
            .mockReturnValueOnce(false)
            .mockReturnValue(true);

        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();

        expect(comscoreAttachment.attachComscorePlugin).toHaveBeenCalledTimes(
            1
        );

        manager.close();
        jest.advanceTimersByTime(1000);

        expect(comscoreAttachment.attachComscorePlugin).toHaveBeenCalledTimes(
            1
        );

        manager.ensure({ playlist, urlAds: 'ads-url' });

        expect(comscoreAttachment.attachComscorePlugin).toHaveBeenCalledTimes(
            2
        );

        jest.useRealTimers();
    });

    it('should stop retrying Comscore attachment after exhausting the retry budget', () => {
        jest.useFakeTimers();
        comscoreAttachment.attachComscorePlugin.mockReturnValue(false);

        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();

        // First attempt is triggered immediately by the ready event.
        expect(comscoreAttachment.attachComscorePlugin).toHaveBeenCalledTimes(
            1
        );

        // Exhaust the exponential-backoff retries (capped at 1000 ms).
        jest.advanceTimersByTime(200000);

        expect(comscoreAttachment.attachComscorePlugin).toHaveBeenCalledTimes(
            100
        );

        jest.useRealTimers();
    });

    // WI 175632 code review R4: exhausting the Comscore retry ceiling was
    // previously SILENT — no console, no Datadog, no signal — the exact
    // measurement gap this ticket exists to fix. These tests cover the new
    // jwPlayerManager/comscore diagnostic wired through comscoreAttachment's
    // onGiveUp callback. Datadog RUM was replaced by console.error as the
    // diagnostic sink (team decision, WI 175632 code review R5).
    describe('Comscore give-up diagnostic (WI 175632 review R4)', () => {
        let consoleErrorSpy;

        beforeEach(() => {
            consoleErrorSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});
        });

        afterEach(() => {
            consoleErrorSpy.mockRestore();
        });

        it('reports a comscore-attach-giveup diagnostic via console.error when Comscore retries are exhausted', () => {
            jest.useFakeTimers();
            comscoreAttachment.attachComscorePlugin.mockReturnValue(false);

            const manager = loadManager();
            const playlist = [{ id: 'video-1' }];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            listeners.ready();

            expect(consoleErrorSpy).not.toHaveBeenCalled();

            jest.advanceTimersByTime(200000);

            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error), {
                reason: 'comscore-attach-giveup',
                attempts: 100,
                source: 'jwPlayerManager/comscore'
            });

            jest.useRealTimers();
        });

        it('does not re-report on a later ensure() call within the same session once retries are already exhausted (single-fire, comscoreReadyHandled guard)', () => {
            jest.useFakeTimers();
            comscoreAttachment.attachComscorePlugin.mockReturnValue(false);

            const manager = loadManager();
            const playlist = [{ id: 'video-1' }];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            listeners.ready();
            jest.advanceTimersByTime(200000);

            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

            // Re-invoking ensure() without an intervening close() must not
            // re-trigger the retry loop or the diagnostic a second time.
            manager.ensure({ playlist, urlAds: 'ads-url' });

            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

            jest.useRealTimers();
        });

        it('does not report when Comscore attaches successfully before the retry ceiling', () => {
            jest.useFakeTimers();
            comscoreAttachment.attachComscorePlugin
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(true);

            const manager = loadManager();
            const playlist = [{ id: 'video-1' }];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            listeners.ready();
            jest.advanceTimersByTime(100);

            expect(consoleErrorSpy).not.toHaveBeenCalled();

            jest.useRealTimers();
        });

        it('does not throw when console.error itself throws during the give-up report', () => {
            jest.useFakeTimers();
            consoleErrorSpy.mockImplementation(() => {
                throw new Error('console.error boom');
            });
            comscoreAttachment.attachComscorePlugin.mockReturnValue(false);

            const manager = loadManager();
            const playlist = [{ id: 'video-1' }];

            expect(() => {
                manager.ensure({ playlist, urlAds: 'ads-url' });
                listeners.ready();
                jest.advanceTimersByTime(200000);
            }).not.toThrow();

            jest.useRealTimers();
        });
    });

    it('should reuse the same player and never remove it when closing and reopening', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        const firstPlayer = manager.ensure({ playlist, urlAds: 'ads-url' });

        manager.open({ playlist, variant: 'vertical', index: 0 });
        manager.close();
        const secondPlayer = manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });

        expect(secondPlayer).toBe(firstPlayer);
        expect(player.stop).toHaveBeenCalledTimes(1);
        expect(player.remove).not.toHaveBeenCalled();
    });

    it('should stop instead of switching when the requested index is a banner or invalid', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1' },
            { isBanner: true },
            { id: 'video-2' }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });

        manager.goToIndex(1, playlist);
        manager.goToIndex(99, playlist);

        expect(player.stop).toHaveBeenCalledTimes(2);
        expect(player.playlistItem).not.toHaveBeenCalled();
    });

    it('should cancel an active preroll before stopping when navigating to a banner or invalid slot', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];
        const fullListVideoData = [
            { id: 'video-1', counterVideo: 1 },
            { isBanner: true },
            { id: 'video-3', counterVideo: 3 }
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
            fullListVideoData,
            variant: 'vertical',
            index: 2,
            urlAds: 'ads-url'
        });

        // The preroll must actually be armed; previously the banner was passed
        // as the JW playlist so the preroll target was a banner and never fired.
        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);

        player.stop.mockClear();

        manager.goToIndex(1, fullListVideoData);

        expect(adManager.destroy).toHaveBeenCalledTimes(1);
        expect(player.stop).toHaveBeenCalledTimes(1);
        expect(player.playlistItem).not.toHaveBeenCalled();
    });

    it('should switch to the mapped playlist item for valid video indexes', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1' },
            { isBanner: true },
            { id: 'video-2' }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });
        // Reach `started` (Slice 1 — Startup FSM) so goToIndex below
        // exercises the real steady-state mapping/switch path.
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

        manager.goToIndex(2, playlist);

        expect(helper.toPlaylistIndex).toHaveBeenCalledWith(playlist, 2);
        expect(player.playlistItem).toHaveBeenCalledWith(1);
    });

    it('should position the fixed host over the provided element', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];
        const anchor = createConnectedElement();
        const mountElement = document.createElement('div');

        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 10,
            left: 20,
            width: 300,
            height: 180
        }));
        document.body.appendChild(mountElement);

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.positionOver(anchor, mountElement);

        const host = document.getElementById('jw-player-manager-host');

        expect(host.parentElement).toBe(mountElement);
        expect(host.style.position).toBe('fixed');
        expect(host.style.top).toBe('10px');
        expect(host.style.left).toBe('20px');
        expect(host.style.width).toBe('300px');
        expect(host.style.height).toBe('180px');
        // The ad host tracks the same slot, so a preroll never stays where the
        // slot was at launch time (off-screen when navigating to the ad video).
        expect(adManager.positionAdHost).toHaveBeenCalledWith(anchor);
    });

    it('should clip the content host overflow so children cannot spill outside the positioned box', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];
        const anchor = createConnectedElement();
        const mountElement = document.createElement('div');

        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 928,
            height: 522
        }));
        document.body.appendChild(mountElement);

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.positionOver(anchor, mountElement);

        const host = document.getElementById('jw-player-manager-host');

        expect(host.style.overflow).toBe('hidden');
    });

    it('passes the CONTENT-only playlist (no adschedule) to setupPersistentPlayer on a cold setup (gate-3: playlist mapping now lives entirely inside setupPersistentPlayer, buildJwPlaylist has its own dedicated unit test in JwVideoPlayerHelper.test.js)', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-2', counterVideo: 2 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.open({
            playlist,
            variant: 'vertical',
            index: 0,
            urlAds: 'ads-url'
        });

        expect(helper.setupPersistentPlayer).toHaveBeenCalledWith(
            expect.objectContaining({ playlist })
        );
    });

    it('gate-3 amendment: does not re-setup or remove() the player across repeated opens or a close+reopen with the SAME playlist (player.load() is gone from the startup path entirely)', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1', counterVideo: 1 }];

        manager.ensure({ playlist, urlAds: 'ads-url' });

        // Repeated open() calls within one open session (the effect re-runs as
        // metadata resolves) must not re-setup.
        manager.open({ playlist, variant: 'vertical', index: 0 });
        manager.open({ playlist, variant: 'vertical', index: 0 });
        expect(helper.setupPersistentPlayer).toHaveBeenCalledTimes(1);

        // A new open session with the SAME playlist (after close): warm
        // reopen — the player is already stopped by close() and already has
        // this exact content loaded, so setup()/load() are skipped entirely.
        // A fresh Comscore session and preroll still happen via
        // resetOpenSessionState()/close(), unaffected by this change.
        manager.close();
        manager.open({ playlist, variant: 'vertical', index: 0 });
        expect(helper.setupPersistentPlayer).toHaveBeenCalledTimes(1);
        expect(player.remove).not.toHaveBeenCalled();
    });

    it('Comscore-regression fix: loadPlaylist()s the EXISTING player (never remove()s/re-setup()s it) when reopening with a DIFFERENT playlist (fresh session)', () => {
        const manager = loadManager();
        const firstPlaylist = [{ id: 'video-1', counterVideo: 1 }];
        const secondPlaylist = [{ id: 'video-2', counterVideo: 1 }];

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
            variant: 'vertical',
            index: 0
        });

        // The single persistent player (and its single Comscore plugin)
        // survives the cross-carousel reopen; only its content is swapped.
        expect(player.remove).not.toHaveBeenCalled();
        expect(helper.setupPersistentPlayer).toHaveBeenCalledTimes(1);
        expect(helper.loadPlaylist).toHaveBeenCalledWith(
            player,
            helper.buildJwPlaylist({ playlist: secondPlaylist })
        );
    });

    it('should treat a different ownerKey as a different player owner even with the same variant', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-2', counterVideo: 2 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({
            playlist,
            variant: 'vertical',
            ownerKey: 'owner-a',
            index: 0,
            urlAds: 'ads-url'
        });
        manager.open({
            playlist,
            variant: 'vertical',
            ownerKey: 'owner-b',
            index: 1,
            urlAds: 'ads-url'
        });

        // Startup FSM (Slice 1): the corrective command is gated behind
        // JW's own settle event, not issued synchronously by open().
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

        // Gate-3 amendment: SAME playlist content across both owners -> warm
        // reopen, setup()/load() never re-run, no remove().
        expect(player.stop).toHaveBeenCalledTimes(1);
        expect(helper.setupPersistentPlayer).toHaveBeenCalledTimes(1);
        expect(player.remove).not.toHaveBeenCalled();
        expect(player.playlistItem).toHaveBeenLastCalledWith(1);
    });

    it('should not re-select the same playlist item on duplicate goToIndex calls', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });
        // Reach `started` (Slice 1 — Startup FSM) so the duplicate-call
        // assertion below exercises the real steady-state goToIndex path.
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });
        player.playlistItem.mockClear();

        manager.goToIndex(1, playlist);
        manager.goToIndex(1, playlist);

        // Re-selecting the same item restarts it and re-arms its preroll.
        expect(player.playlistItem).toHaveBeenCalledTimes(1);
        expect(player.playlistItem).toHaveBeenCalledWith(1);
    });

    it('should resize the player to the positioned box so each variant keeps its aspect', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];
        const anchor = createConnectedElement();
        const mountElement = document.createElement('div');

        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 176,
            width: 928,
            height: 522
        }));
        document.body.appendChild(mountElement);

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.positionOver(anchor, mountElement);

        expect(player.resize).toHaveBeenCalledWith(928, 522);
    });

    it('should defer positioning requested before the host exists and apply it on ensure', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];
        const anchor = createConnectedElement();
        const mountElement = document.createElement('div');

        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 16,
            left: 438,
            width: 405,
            height: 688
        }));
        document.body.appendChild(mountElement);

        // Race observed on d=6066: the positioning effect runs before the
        // async open()/ensure() created the host element.
        manager.positionOver(anchor, mountElement);

        expect(document.getElementById('jw-player-manager-host')).toBeNull();

        // The host is created later, when the JW script + metadata resolve.
        // open() (not a bare ensure()+goToIndex()) makes the open decision
        // (no preroll here); positioning is applied synchronously, and
        // reveal/play is gated behind JW's own settle (Slice 1 — Startup
        // FSM) — see the fireAll() below.
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 0
        });

        const host = document.getElementById('jw-player-manager-host');

        expect(host.parentElement).toBe(mountElement);
        expect(host.style.position).toBe('fixed');
        expect(host.style.top).toBe('16px');
        expect(host.style.left).toBe('438px');
        expect(host.style.width).toBe('405px');
        expect(host.style.height).toBe('688px');

        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

        expect(host.style.visibility).toBe('visible');
        expect(player.play).toHaveBeenCalledTimes(1);
    });

    it('should keep the hidden host measurable before JW setup', () => {
        let hostSnapshot;
        helper.setupPersistentPlayer.mockImplementation(() => {
            const host = document.getElementById('jw-player-manager-host');

            hostSnapshot = {
                display: host.style.display,
                visibility: host.style.visibility,
                width: host.style.width,
                height: host.style.height,
                pointerEvents: host.style.pointerEvents
            };

            return player;
        });

        const manager = loadManager();

        manager.ensure({ playlist: [{ id: 'video-1' }], urlAds: 'ads-url' });

        expect(hostSnapshot).toEqual({
            display: 'block',
            visibility: 'hidden',
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none'
        });
    });

    it('should move the hidden host back to body when closing', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];
        const anchor = createConnectedElement();
        const mountElement = document.createElement('div');

        anchor.getBoundingClientRect = jest.fn(() => ({
            top: 10,
            left: 20,
            width: 300,
            height: 180
        }));
        document.body.appendChild(mountElement);

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.positionOver(anchor, mountElement);
        manager.close();

        const host = document.getElementById('jw-player-manager-host');

        expect(host.parentElement).toBe(document.body);
        expect(host.style.visibility).toBe('hidden');
        expect(host.style.pointerEvents).toBe('none');
        expect(player.stop).toHaveBeenCalledTimes(1);
    });

    it('plays the preroll on the ad player for the counterVideo===3 video, revealing content only on handoff', () => {
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
        const arg = adManager.playPreroll.mock.calls[0][0];
        // Parity with prod/master (WI 175632): the preroll ad config does NOT
        // force a mute state — IMA/googima negotiates ad autoplay audio itself.
        expect(arg.config).not.toHaveProperty('mute');
        expect(typeof arg.onImpression).toBe('function');
        expect(typeof arg.onError).toBe('function');
        // The content is NOT selected or played behind the ad — it stays
        // deferred until the handoff so it never measures during the preroll.
        expect(player.pause).toHaveBeenCalled();
        expect(player.play).not.toHaveBeenCalled();
        expect(player.playlistItem).not.toHaveBeenCalled();

        arg.onHandoff();
        // Only now is the deferred content selected (index 1) and played.
        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.play).toHaveBeenCalledTimes(1);
    });

    it('cancels an in-progress preroll immediately and hands off cleanly when swiping to a different video mid-ad', () => {
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
        const staleHandoff = adManager.playPreroll.mock.calls[0][0].onHandoff;

        adManager.destroy.mockClear();
        player.play.mockClear();
        player.playlistItem.mockClear();

        // Accepted product behavior (device-confirmed F2 regression): a swipe
        // during ad load OR playback must cancel the ad and navigate to the
        // swiped video immediately — never leave it running/wedged.
        manager.goToIndex(0, playlist);

        expect(adManager.destroy).toHaveBeenCalledTimes(1);
        expect(player.playlistItem).toHaveBeenCalledWith(0);
        expect(player.play).toHaveBeenCalledTimes(1);

        // The ad's own (now stale) handoff must be a no-op — the controller
        // was aborted by the cancellation, same guard as a closed session.
        player.playlistItem.mockClear();
        player.play.mockClear();
        staleHandoff();

        expect(player.playlistItem).not.toHaveBeenCalled();
        expect(player.play).not.toHaveBeenCalled();
    });

    it('re-arms a fresh preroll when swiping back to the ad video after the in-progress ad was cancelled', () => {
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

        // Swipe away mid-ad: cancels the first ad (invariant PA).
        manager.goToIndex(1, playlist);
        expect(adManager.destroy).toHaveBeenCalledTimes(1);

        // Swipe back to the ad's own video: must re-arm a FRESH preroll, not
        // resume/hand off the cancelled one (invariant P still holds).
        manager.goToIndex(2, playlist);

        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);
    });

    it('cancels a still-pending (not yet started) preroll when navigating to a different valid video before the ad loads', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'v1', counterVideo: 1 },
            { id: 'v2', counterVideo: 2 },
            { id: 'v3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();

        // No positionOver(): the slot never resolves, so maybeStartPreroll()
        // bails and the ad stays queued (pending) — this is the ad's LOAD
        // phase before playPreroll() is ever invoked.
        manager.open({
            playlist,
            variant: 'vertical',
            index: 2,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).not.toHaveBeenCalled();

        manager.goToIndex(1, playlist);

        expect(adManager.destroy).toHaveBeenCalledTimes(1);

        // FSM is still `opening` (never settled/handed off): the corrective
        // command is gated behind JW's own settle event (Slice 1 — Startup
        // FSM), NAVIGATE alone never issues it.
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'v1' } });

        expect(player.playlistItem).toHaveBeenCalledWith(1);
    });

    it('falls back to prerollTargetIndex when currentPlaylistIndex is not set', () => {
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

        // No navigation during the ad, so the live index is never set.
        // The handoff must still resolve to the original ad target.
        handoff();

        expect(player.playlistItem).toHaveBeenCalledWith(1);
    });

    it('hands off to preroll target after navigating from a previous video without mid-ad swipe', () => {
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
            index: 0,
            urlAds: 'ads-url'
        });

        // Navigate to a normal video first.
        manager.goToIndex(0, playlist);

        // Then navigate to the preroll video.
        manager.goToIndex(2, playlist);

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        const handoff = adManager.playPreroll.mock.calls[0][0].onHandoff;

        player.playlistItem.mockClear();
        handoff();

        // Handoff must resolve to the preroll target, not the previous video.
        expect(player.playlistItem).toHaveBeenCalledWith(2);
    });

    it('does not play a preroll for non-preroll videos and reveals content directly', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'v1', counterVideo: 1 },
            { id: 'v2', counterVideo: 2 }
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
            index: 0,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).not.toHaveBeenCalled();

        // Startup FSM (Slice 1): target=0 plays immediately once JW settles
        // on it (REQ-14 parity) — no play() before that settle.
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'v1' } });

        expect(player.play).toHaveBeenCalledTimes(1);
    });

    it('plays the preroll once per open session and re-arms after a safe handoff closes the session', () => {
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

        const openPrerollVideo = () => {
            manager.positionOver(anchor);
            manager.open({
                playlist,
                variant: 'vertical',
                index: 1,
                urlAds: 'ads-url'
            });
        };

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();

        openPrerollVideo();
        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        adManager.playPreroll.mock.calls[0][0].onHandoff();
        expect(adManager.destroy).not.toHaveBeenCalled();

        // Re-opening the same preroll video in the SAME session does not replay.
        openPrerollVideo();
        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);

        manager.close();
        expect(adManager.destroy).not.toHaveBeenCalled();

        // After close it re-arms (master parity: ad shows again on reopen).
        openPrerollVideo();
        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);
    });

    it('re-arms the preroll when navigating back to the ad video within the same session (master parity)', () => {
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

        // First arrival at the ad video plays the preroll, then hands off.
        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        adManager.playPreroll.mock.calls[0][0].onHandoff();

        // Navigate away to a normal video, then back to the ad video.
        manager.goToIndex(1, playlist);
        manager.goToIndex(2, playlist);

        // The preroll re-arms on the fresh arrival — exactly the back/forward
        // case the user hit (v3 → v2 → v3 must show the ad again).
        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);
    });

    it('ignores a stale handoff callback from a closed session so reopen can play the preroll', () => {
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
        const staleHandoff = adManager.playPreroll.mock.calls[0][0].onHandoff;

        // User closes before the ad handoff completes.
        manager.close();

        // Reopen the same preroll video.
        manager.positionOver(anchor);
        manager.open({
            playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);
        const newHandoff = adManager.playPreroll.mock.calls[1][0].onHandoff;

        // The stale callback from the first session arrives late.
        staleHandoff();

        // It must not reveal content or mark the new session as done.
        expect(player.playlistItem).not.toHaveBeenCalled();
        expect(player.play).not.toHaveBeenCalled();

        // The new session's handoff still works.
        newHandoff();
        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.play).toHaveBeenCalledTimes(1);
    });

    it('gives every open session a fresh preroll controller even on rapid close/open cycles', () => {
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

        const openPrerollVideo = () => {
            manager.positionOver(anchor);
            manager.open({
                playlist,
                variant: 'vertical',
                index: 1,
                urlAds: 'ads-url'
            });
        };

        openPrerollVideo();
        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);

        manager.close();
        openPrerollVideo();
        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);

        manager.close();
        openPrerollVideo();
        expect(adManager.playPreroll).toHaveBeenCalledTimes(3);
    });

    it('does not play a preroll when reopening directly on a non-preroll video', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'v1', counterVideo: 1 },
            { id: 'v2', counterVideo: 2 }
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
            index: 0,
            urlAds: 'ads-url'
        });

        // Startup FSM (Slice 1): play() is gated behind JW's own settle.
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'v1' } });

        expect(adManager.playPreroll).not.toHaveBeenCalled();
        expect(player.play).toHaveBeenCalledTimes(1);

        manager.close();
        manager.positionOver(anchor);
        manager.open({
            playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        player.getPlaylistIndex.mockReturnValue(1);
        fireAll('playlistItem', { index: 1, item: { mediaid: 'v2' } });

        expect(adManager.playPreroll).not.toHaveBeenCalled();
        expect(player.play).toHaveBeenCalledTimes(2);
    });

    it('should be SSR-safe noops when window or document are unavailable', () => {
        const originalWindow = Object.getOwnPropertyDescriptor(
            global,
            'window'
        );
        const originalDocument = Object.getOwnPropertyDescriptor(
            global,
            'document'
        );

        Object.defineProperty(global, 'window', {
            value: undefined,
            configurable: true
        });
        Object.defineProperty(global, 'document', {
            value: undefined,
            configurable: true
        });

        try {
            const manager = loadManager();

            expect(manager.ensure({ playlist: [] })).toBeNull();
            expect(() =>
                manager.open({ playlist: [], variant: 'vertical', index: 0 })
            ).not.toThrow();
            expect(() => manager.goToIndex(0, [])).not.toThrow();
            expect(() => manager.positionOver(null)).not.toThrow();
            expect(() => manager.close()).not.toThrow();
        } finally {
            Object.defineProperty(global, 'window', originalWindow);
            Object.defineProperty(global, 'document', originalDocument);
        }
    });

    it('should inject a vertical touch-action CSS rule for the vertical variant', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });

        const style = document.getElementById(
            'jw-player-manager-player-touch-action-style'
        );

        expect(style).not.toBeNull();
        expect(style.textContent).toContain('#jw-player-manager-player');
        expect(style.textContent).toContain('touch-action: pan-y');
    });

    it('should not inject the vertical touch-action style for the horizontal variant', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'horizontal', index: 0 });

        const style = document.getElementById(
            'jw-player-manager-player-touch-action-style'
        );

        expect(style).toBeNull();
    });

    it('should remove the vertical touch-action style on close', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });

        expect(
            document.getElementById(
                'jw-player-manager-player-touch-action-style'
            )
        ).not.toBeNull();

        manager.close();

        expect(
            document.getElementById(
                'jw-player-manager-player-touch-action-style'
            )
        ).toBeNull();
    });

    it('should re-inject the vertical touch-action style when reopening vertical after close', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });
        manager.close();
        manager.open({ playlist, variant: 'vertical', index: 0 });

        const style = document.getElementById(
            'jw-player-manager-player-touch-action-style'
        );

        expect(style).not.toBeNull();
        expect(style.textContent).toContain('touch-action: pan-y');
    });

    it('should pause before stop when closing', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });

        const calls = [];
        player.pause.mockImplementation(() => {
            calls.push('pause');
        });
        player.stop.mockImplementation(() => {
            calls.push('stop');
        });

        manager.close();

        expect(calls).toEqual(['pause', 'stop']);
    });

    it('does not skip remaining cleanup when pause() throws while closing', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 0 });

        const eventsCleanupSpy =
            helper.registerPersistentPlayerEvents.mock.results[0].value;

        player.pause.mockImplementation(() => {
            throw new Error('JW already torn down');
        });

        expect(() => manager.close()).not.toThrow();

        const host = document.getElementById('jw-player-manager-host');
        expect(host.style.visibility).toBe('hidden');
        expect(adManager.destroy).toHaveBeenCalled();
        expect(eventsCleanupSpy).toHaveBeenCalled();
    });

    it('should clear current index state before stop so reopen starts fresh', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        manager.open({ playlist, variant: 'vertical', index: 1 });

        // Startup FSM (Slice 1): the corrective command is gated behind
        // JW's own settle event.
        player.getPlaylistIndex.mockReturnValue(0);
        fireAll('playlistItem', { index: 0, item: { mediaid: 'video-1' } });

        expect(player.playlistItem).toHaveBeenLastCalledWith(1);

        manager.close();
        manager.open({ playlist, variant: 'vertical', index: 0 });

        player.getPlaylistIndex.mockReturnValue(1);
        fireAll('playlistItem', { index: 1, item: { mediaid: 'video-2' } });

        expect(player.playlistItem).toHaveBeenLastCalledWith(0);
    });

    describe('vertical touch bridge', () => {
        // ul.jw-video-container is a mandatory scroll-snap container with
        // smooth behavior (confirmed in #1818): per-touchmove scrollTop
        // writes get re-snapped back to the current item, so the bridge must
        // accumulate the gesture and issue ONE paged scrollBy on touchend,
        // mirroring useHandleNext's scrollBy({ top: offsetHeight }) pattern.
        const createScroller = () => {
            const scroller = document.createElement('ul');
            scroller.className = 'jw-video-container';
            scroller.scrollTop = 500;
            scroller.scrollBy = jest.fn();
            Object.defineProperty(scroller, 'offsetHeight', {
                value: 844,
                configurable: true
            });
            document.body.appendChild(scroller);
            return { scroller, scrollerRef: { current: scroller } };
        };

        const dispatchTouch = (target, type, coords) => {
            const event = new Event(type, {
                bubbles: true,
                cancelable: true
            });
            event.touches = [coords];
            event.preventDefault = jest.fn();
            event.stopPropagation = jest.fn();
            target.dispatchEvent(event);
            return event;
        };

        const openVertical = scrollerRef => {
            const manager = loadManager();
            const playlist = [{ id: 'video-1' }];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({
                playlist,
                variant: 'vertical',
                index: 0,
                scrollerRef
            });

            return manager;
        };

        it('attaches capture-phase touchstart/touchmove/touchend/touchcancel listeners to the host element on vertical open', () => {
            const { scrollerRef } = createScroller();
            const manager = openVertical(scrollerRef);

            // Listeners live on the host, not the player div: JW Player's
            // setup() replaces #jw-player-manager-player with a brand new
            // node once its internal init resolves, so a bridge attached to
            // the player div would be listening on a node no longer in the
            // live DOM (confirmed via runtime instrumentation). The host div
            // created by createPlayerHost() is never touched by JW.
            const hostElement = document.getElementById(
                'jw-player-manager-host'
            );
            const addEventListenerSpy = jest.spyOn(
                hostElement,
                'addEventListener'
            );

            // Re-opening vertical should attach listeners.
            manager.close();
            manager.open({
                playlist: [{ id: 'video-1' }],
                variant: 'vertical',
                index: 0,
                scrollerRef
            });

            const callsFor = type =>
                addEventListenerSpy.mock.calls.filter(
                    ([eventType]) => eventType === type
                );

            expect(callsFor('touchstart').length).toBeGreaterThan(0);
            expect(callsFor('touchmove').length).toBeGreaterThan(0);
            expect(callsFor('touchend').length).toBeGreaterThan(0);
            expect(callsFor('touchcancel').length).toBeGreaterThan(0);
            expect(callsFor('touchstart')[0][2]).toEqual(
                expect.objectContaining({ capture: true, passive: false })
            );
            expect(callsFor('touchmove')[0][2]).toEqual(
                expect.objectContaining({ capture: true, passive: false })
            );
            expect(callsFor('touchend')[0][2]).toEqual(
                expect.objectContaining({ capture: true })
            );
            expect(callsFor('touchcancel')[0][2]).toEqual(
                expect.objectContaining({ capture: true })
            );
        });

        it('intercepts a confirmed vertical pan (preventDefault + stopPropagation) without writing scrollTop per move', () => {
            const { scroller, scrollerRef } = createScroller();
            openVertical(scrollerRef);

            const playerElement = document.getElementById(
                'jw-player-manager-player'
            );

            dispatchTouch(playerElement, 'touchstart', {
                clientX: 100,
                clientY: 400
            });
            const moveEvent = dispatchTouch(playerElement, 'touchmove', {
                clientX: 100,
                clientY: 280
            });

            expect(moveEvent.preventDefault).toHaveBeenCalled();
            expect(moveEvent.stopPropagation).toHaveBeenCalled();
            expect(scroller.scrollTop).toBe(500);
            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        it('performs one forward paged scroll on touchend when an upward swipe crosses the swipe-intent threshold', () => {
            const { scroller, scrollerRef } = createScroller();
            openVertical(scrollerRef);

            const playerElement = document.getElementById(
                'jw-player-manager-player'
            );

            dispatchTouch(playerElement, 'touchstart', {
                clientX: 100,
                clientY: 400
            });
            dispatchTouch(playerElement, 'touchmove', {
                clientX: 100,
                clientY: 280
            });
            dispatchTouch(playerElement, 'touchend', {
                clientX: 100,
                clientY: 280
            });

            expect(scroller.scrollBy).toHaveBeenCalledTimes(1);
            expect(scroller.scrollBy).toHaveBeenCalledWith({
                top: 844,
                behavior: 'smooth'
            });
        });

        it('performs one backward paged scroll on touchend when a downward swipe crosses the swipe-intent threshold', () => {
            const { scroller, scrollerRef } = createScroller();
            openVertical(scrollerRef);

            const playerElement = document.getElementById(
                'jw-player-manager-player'
            );

            dispatchTouch(playerElement, 'touchstart', {
                clientX: 100,
                clientY: 200
            });
            dispatchTouch(playerElement, 'touchmove', {
                clientX: 100,
                clientY: 320
            });
            dispatchTouch(playerElement, 'touchend', {
                clientX: 100,
                clientY: 320
            });

            expect(scroller.scrollBy).toHaveBeenCalledTimes(1);
            expect(scroller.scrollBy).toHaveBeenCalledWith({
                top: -844,
                behavior: 'smooth'
            });
        });

        it('does not scroll when a confirmed vertical swipe stays below the swipe-intent threshold', () => {
            const { scroller, scrollerRef } = createScroller();
            openVertical(scrollerRef);

            const playerElement = document.getElementById(
                'jw-player-manager-player'
            );

            dispatchTouch(playerElement, 'touchstart', {
                clientX: 100,
                clientY: 400
            });
            // 30px: confirms a vertical pan (>10px) but stays under the
            // ~50-60px swipe-intent threshold, so the item must not change.
            dispatchTouch(playerElement, 'touchmove', {
                clientX: 100,
                clientY: 370
            });
            dispatchTouch(playerElement, 'touchend', {
                clientX: 100,
                clientY: 370
            });

            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        it('does not intercept taps or trigger a scroll for small vertical movement so JW controls stay interactive', () => {
            const { scroller, scrollerRef } = createScroller();
            openVertical(scrollerRef);

            const playerElement = document.getElementById(
                'jw-player-manager-player'
            );

            dispatchTouch(playerElement, 'touchstart', {
                clientX: 100,
                clientY: 400
            });
            const moveEvent = dispatchTouch(playerElement, 'touchmove', {
                clientX: 100,
                clientY: 395
            });
            dispatchTouch(playerElement, 'touchend', {
                clientX: 100,
                clientY: 395
            });

            expect(moveEvent.preventDefault).not.toHaveBeenCalled();
            expect(moveEvent.stopPropagation).not.toHaveBeenCalled();
            expect(scroller.scrollTop).toBe(500);
            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        it('does not block or scroll for horizontal gestures', () => {
            const { scroller, scrollerRef } = createScroller();
            openVertical(scrollerRef);

            const playerElement = document.getElementById(
                'jw-player-manager-player'
            );

            dispatchTouch(playerElement, 'touchstart', {
                clientX: 100,
                clientY: 400
            });
            const moveEvent = dispatchTouch(playerElement, 'touchmove', {
                clientX: 180,
                clientY: 405
            });
            dispatchTouch(playerElement, 'touchend', {
                clientX: 180,
                clientY: 405
            });

            expect(moveEvent.preventDefault).not.toHaveBeenCalled();
            expect(moveEvent.stopPropagation).not.toHaveBeenCalled();
            expect(scroller.scrollTop).toBe(500);
            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        it('resets the gesture state on touchcancel so a later touchend does not trigger a stale scroll', () => {
            const { scroller, scrollerRef } = createScroller();
            openVertical(scrollerRef);

            const playerElement = document.getElementById(
                'jw-player-manager-player'
            );

            dispatchTouch(playerElement, 'touchstart', {
                clientX: 100,
                clientY: 400
            });
            dispatchTouch(playerElement, 'touchmove', {
                clientX: 100,
                clientY: 280
            });
            dispatchTouch(playerElement, 'touchcancel', {
                clientX: 100,
                clientY: 280
            });
            // A touchend arriving after the cancel must not replay the
            // pre-cancel accumulated delta.
            dispatchTouch(playerElement, 'touchend', {
                clientX: 100,
                clientY: 280
            });

            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        it('removes all four vertical touch listeners on close', () => {
            const { scrollerRef } = createScroller();
            const manager = openVertical(scrollerRef);

            const hostElement = document.getElementById(
                'jw-player-manager-host'
            );
            const removeEventListenerSpy = jest.spyOn(
                hostElement,
                'removeEventListener'
            );

            manager.close();

            const callsFor = type =>
                removeEventListenerSpy.mock.calls.filter(
                    ([eventType]) => eventType === type
                );

            expect(callsFor('touchstart').length).toBeGreaterThan(0);
            expect(callsFor('touchmove').length).toBeGreaterThan(0);
            expect(callsFor('touchend').length).toBeGreaterThan(0);
            expect(callsFor('touchcancel').length).toBeGreaterThan(0);
        });

        it('does not attach the vertical touch bridge for the horizontal variant', () => {
            const manager = loadManager();
            const playlist = [{ id: 'video-1' }];
            const { scroller, scrollerRef } = createScroller();

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({
                playlist,
                variant: 'horizontal',
                index: 0,
                scrollerRef
            });

            const hostElement = document.getElementById(
                'jw-player-manager-host'
            );
            const addEventListenerSpy = jest.spyOn(
                hostElement,
                'addEventListener'
            );

            // Opening horizontal again should not attach vertical bridge listeners.
            manager.close();
            manager.open({
                playlist,
                variant: 'horizontal',
                index: 0,
                scrollerRef
            });

            const touchCalls = addEventListenerSpy.mock.calls.filter(
                ([type]) =>
                    type === 'touchstart' ||
                    type === 'touchmove' ||
                    type === 'touchend' ||
                    type === 'touchcancel'
            );

            expect(touchCalls).toHaveLength(0);
            expect(scroller.scrollTop).toBe(500);
            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        it('detaches the vertical bridge before switching from vertical to horizontal', () => {
            const manager = loadManager();
            const playlist = [{ id: 'video-1' }];
            const { scroller, scrollerRef } = createScroller();

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({
                playlist,
                variant: 'vertical',
                index: 0,
                scrollerRef
            });

            const hostElement = document.getElementById(
                'jw-player-manager-host'
            );
            const removeEventListenerSpy = jest.spyOn(
                hostElement,
                'removeEventListener'
            );

            manager.open({
                playlist,
                variant: 'horizontal',
                index: 0,
                scrollerRef
            });

            const callsFor = type =>
                removeEventListenerSpy.mock.calls.filter(
                    ([eventType]) => eventType === type
                );

            expect(callsFor('touchstart').length).toBeGreaterThan(0);
            expect(callsFor('touchmove').length).toBeGreaterThan(0);
            expect(callsFor('touchend').length).toBeGreaterThan(0);
            expect(callsFor('touchcancel').length).toBeGreaterThan(0);
            expect(scroller.scrollTop).toBe(500);
            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        // The preroll ad host (jw-ad-player-host) is a SIBLING subtree of the
        // content host, never a descendant — capture-phase listeners on the
        // content host never see touches landing on it (device-confirmed F2:
        // swipe during ad load/playback was a dead gesture, wedging the ad).
        const openVerticalWithAdHost = (scrollerRef, adHostElement) => {
            adManager.getAdHostElement.mockReturnValue(adHostElement);

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
                urlAds: 'ads-url',
                scrollerRef
            });

            return manager;
        };

        it('mirrors the vertical touch bridge onto the preroll ad host once the ad starts, paging the content scroller on a confirmed swipe', () => {
            const { scroller, scrollerRef } = createScroller();
            const adHostElement = document.createElement('div');
            document.body.appendChild(adHostElement);

            openVerticalWithAdHost(scrollerRef, adHostElement);

            expect(adManager.playPreroll).toHaveBeenCalledTimes(1);

            dispatchTouch(adHostElement, 'touchstart', {
                clientX: 100,
                clientY: 400
            });
            dispatchTouch(adHostElement, 'touchmove', {
                clientX: 100,
                clientY: 280
            });
            dispatchTouch(adHostElement, 'touchend', {
                clientX: 100,
                clientY: 280
            });

            // Same paged scroll semantics as the content host bridge — the
            // gesture is forwarded to the CONTENT scroller, not consumed by
            // the ad itself.
            expect(scroller.scrollBy).toHaveBeenCalledTimes(1);
            expect(scroller.scrollBy).toHaveBeenCalledWith({
                top: 844,
                behavior: 'smooth'
            });
        });

        it('does not intercept a tap on the ad host, so ad click-through/skip keep working', () => {
            const { scroller, scrollerRef } = createScroller();
            const adHostElement = document.createElement('div');
            document.body.appendChild(adHostElement);

            openVerticalWithAdHost(scrollerRef, adHostElement);

            dispatchTouch(adHostElement, 'touchstart', {
                clientX: 100,
                clientY: 400
            });
            const moveEvent = dispatchTouch(adHostElement, 'touchmove', {
                clientX: 100,
                clientY: 395
            });
            dispatchTouch(adHostElement, 'touchend', {
                clientX: 100,
                clientY: 395
            });

            expect(moveEvent.preventDefault).not.toHaveBeenCalled();
            expect(moveEvent.stopPropagation).not.toHaveBeenCalled();
            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        it('detaches the ad-host touch bridge when the in-progress ad is cancelled by navigation', () => {
            const { scrollerRef } = createScroller();
            const adHostElement = document.createElement('div');
            document.body.appendChild(adHostElement);
            const removeEventListenerSpy = jest.spyOn(
                adHostElement,
                'removeEventListener'
            );

            const manager = openVerticalWithAdHost(scrollerRef, adHostElement);

            manager.goToIndex(0, [
                { id: 'v1', counterVideo: 1 },
                { id: 'v3', counterVideo: 3 }
            ]);

            const callsFor = type =>
                removeEventListenerSpy.mock.calls.filter(
                    ([eventType]) => eventType === type
                );

            // Exactly one removal per event type: a double-attach/single-detach
            // leak would silently pass a `> 0` assertion.
            expect(callsFor('touchstart')).toHaveLength(1);
            expect(callsFor('touchmove')).toHaveLength(1);
            expect(callsFor('touchend')).toHaveLength(1);
            expect(callsFor('touchcancel')).toHaveLength(1);
        });

        it('detaches the ad-host touch bridge on close', () => {
            const { scrollerRef } = createScroller();
            const adHostElement = document.createElement('div');
            document.body.appendChild(adHostElement);
            const removeEventListenerSpy = jest.spyOn(
                adHostElement,
                'removeEventListener'
            );

            const manager = openVerticalWithAdHost(scrollerRef, adHostElement);

            manager.close();

            const callsFor = type =>
                removeEventListenerSpy.mock.calls.filter(
                    ([eventType]) => eventType === type
                );

            // Exactly one removal per event type: a double-attach/single-detach
            // leak would silently pass a `> 0` assertion.
            expect(callsFor('touchstart')).toHaveLength(1);
            expect(callsFor('touchmove')).toHaveLength(1);
            expect(callsFor('touchend')).toHaveLength(1);
            expect(callsFor('touchcancel')).toHaveLength(1);
        });

        it('injects touch-action CSS coverage for the ad host alongside the content player, and removes it on close', () => {
            const { scrollerRef } = createScroller();
            const adHostElement = document.createElement('div');
            document.body.appendChild(adHostElement);

            const manager = openVerticalWithAdHost(scrollerRef, adHostElement);

            const style = document.getElementById(
                'jw-player-manager-player-touch-action-style'
            );

            // The JS bridge alone is not enough: the browser's native gesture
            // recognizer also needs touch-action containment on the ad host
            // subtree, not just the content player (sandbox QA measured the
            // ad host and its IMA iframe computing touch-action:auto without
            // this rule).
            expect(style).not.toBeNull();
            expect(style.textContent).toContain('#jw-ad-player-host');
            expect(style.textContent).toContain('touch-action: pan-y');

            manager.close();

            expect(
                document.getElementById(
                    'jw-player-manager-player-touch-action-style'
                )
            ).toBeNull();
        });
    });

    describe('startup FSM — gated play (Slice 1, migrated from "async load settle correction")', () => {
        it('commands playlistItem(target) once JW settles a fresh load on a different item than the open target, with NO play until then', () => {
            const manager = loadManager();
            const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 1 });

            // Startup FSM (Slice 1): no sync command/play is issued on
            // open() anymore — play() is gated behind JW's own settle event.
            // Simulate JW settling on item 0 (its own default for a freshly
            // loaded playlist) instead of the requested target (1).
            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', {
                index: 0,
                item: { mediaid: 'video-1' }
            });

            expect(player.playlistItem).toHaveBeenCalledWith(1);
            expect(player.play).not.toHaveBeenCalled();

            player.getPlaylistIndex.mockReturnValue(1);
            fireAll('playlistItem', {
                index: 1,
                item: { mediaid: 'video-2' }
            });

            expect(player.play).toHaveBeenCalledTimes(1);
        });

        it('plays immediately, with no ADDITIONAL corrective playlistItem, when JW settles directly on the requested target', () => {
            const manager = loadManager();
            const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 0 });

            // Gate-2 amendment: open() already issued the synchronous
            // OPEN-effect command (playlistItem(0)) — no ADDITIONAL command
            // is needed once the settle lands directly on the target.
            expect(player.playlistItem).toHaveBeenCalledTimes(1);
            expect(player.playlistItem).toHaveBeenCalledWith(0);

            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', {
                index: 0,
                item: { mediaid: 'video-1' }
            });

            expect(player.playlistItem).toHaveBeenCalledTimes(1);
            expect(player.play).toHaveBeenCalledTimes(1);
        });

        it('cancels an unstartable queued preroll before startup corrects its index', () => {
            const manager = loadManager();
            const playlist = [
                { id: 'video-1' },
                { id: 'video-2' },
                { id: 'video-3' },
                { id: 'ad-video', counterVideo: 3 }
            ];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 3 });

            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', {
                index: 0,
                item: { mediaid: 'video-1' }
            });

            // No slot was mounted, so the queued preroll is cancelled and
            // startup may select the requested content without playing it.
            expect(player.playlistItem).toHaveBeenCalledWith(3);
            expect(player.play).not.toHaveBeenCalled();
        });

        it('ignores a stale settle listener after close() then reopen (owner switch)', () => {
            const manager = loadManager();
            const playlist = [{ id: 'video-1' }, { id: 'video-2' }];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({
                playlist,
                variant: 'vertical',
                ownerKey: 'vertical',
                index: 1
            });

            // Capture the stale handler reference directly (bypassing the
            // mock's own off()-based removal) to prove the structural guard
            // — not only explicit deregistration — blocks a listener that
            // still manages to fire after its session is gone.
            const staleHandler = player.on.mock.calls.find(
                ([eventName]) => eventName === 'playlistItem'
            )[1];

            // Owner switch: open() closes the vertical session internally
            // (which must explicitly off() the stale handler) and arms a
            // fresh listener for the new (horizontal) session.
            manager.open({
                playlist,
                variant: 'horizontal',
                ownerKey: 'horizontal',
                index: 0
            });

            expect(player.off).toHaveBeenCalledWith(
                'playlistItem',
                staleHandler
            );

            // Clear the sync OPEN-effect calls from both sessions so this
            // assertion observes ONLY the stale (bypassed-off()) handler's
            // own effect, if any.
            player.playlistItem.mockClear();

            player.getPlaylistIndex.mockReturnValue(0);
            staleHandler({ index: 0, item: { mediaid: 'video-1' } });

            expect(player.playlistItem).not.toHaveBeenCalled();
        });

        it('corrects to the live navigated index, not the captured open target, when navigation happens during the settle window', () => {
            const manager = loadManager();
            const playlist = [
                { id: 'video-1' },
                { id: 'video-2' },
                { id: 'video-3' }
            ];

            manager.ensure({ playlist, urlAds: 'ads-url' });
            manager.open({ playlist, variant: 'vertical', index: 1 });

            // User navigates to index 2 while JW is still settling the fresh
            // load — this must win over the index captured at open() time.
            manager.goToIndex(2, playlist);

            player.getPlaylistIndex.mockReturnValue(0);
            fireAll('playlistItem', {
                index: 0,
                item: { mediaid: 'video-1' }
            });

            expect(player.playlistItem).toHaveBeenCalledWith(2);
        });
    });
});
