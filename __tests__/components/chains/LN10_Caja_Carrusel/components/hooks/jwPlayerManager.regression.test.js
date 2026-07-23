import { createPlayerMock } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/__helpers__/persistentPlayerHarness';

// jwPlayerManager imports attachComscorePlugin from comscoreAttachment (not
// jwVideoPlayerHelper); mock the leaf there so ready handlers stay inert and
// no real retry/backoff timers are scheduled during these tests.
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
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper',
    () => ({
        buildAdPlayerConfig: jest.fn(() => ({ playlist: [] })),
        setupPersistentPlayer: jest.fn(),
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

describe('jwPlayerManager - UI regression', () => {
    let helper;
    let player;
    let listeners;

    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = '';

        helper = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper'); // eslint-disable-line global-require

        ({ player, listeners } = createPlayerMock());
        helper.setupPersistentPlayer.mockReturnValue(player);
        helper.toPlaylistIndex.mockImplementation((playlist, index) => {
            const item = playlist[index];
            if (!item || item.isBanner) return -1;
            return index;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('createHost applies HOST_Z_INDEX to host element', () => {
        const manager = loadManager();

        manager.ensure({ playlist: [{ id: 'video-1' }], urlAds: 'ads-url' });

        const host = document.getElementById('jw-player-manager-host');

        expect(host.style.zIndex).toBe('40');
    });

    it('createHost sets pointerEvents auto on player element', () => {
        const manager = loadManager();

        manager.ensure({ playlist: [{ id: 'video-1' }], urlAds: 'ads-url' });

        const playerElement = document.getElementById(
            'jw-player-manager-player'
        );

        expect(playerElement.style.pointerEvents).toBe('auto');
    });

    it('createHost injects a pointer-events:auto !important CSS rule for the player element', () => {
        const manager = loadManager();

        manager.ensure({ playlist: [{ id: 'video-1' }], urlAds: 'ads-url' });

        const peStyle = document.getElementById(
            'jw-player-manager-player-pe-style'
        );

        expect(peStyle).not.toBeNull();
        expect(peStyle.textContent).toContain('#jw-player-manager-player');
        expect(peStyle.textContent).toContain(
            'pointer-events: auto !important'
        );
    });

    it('does not re-assert pointerEvents on the player element after setupPersistentPlayer (the CSS !important rule is the sole runtime enforcer)', () => {
        const manager = loadManager();

        helper.setupPersistentPlayer.mockImplementation(() => {
            const playerElement = document.getElementById(
                'jw-player-manager-player'
            );
            playerElement.style.pointerEvents = 'sentinel';

            return player;
        });

        manager.ensure({ playlist: [{ id: 'video-1' }], urlAds: 'ads-url' });

        const playerElement = document.getElementById(
            'jw-player-manager-player'
        );

        expect(playerElement.style.pointerEvents).toBe('sentinel');
    });

    it('does not re-assert pointerEvents on the player element on the ready callback (the CSS !important rule is the sole runtime enforcer)', () => {
        const manager = loadManager();

        manager.ensure({ playlist: [{ id: 'video-1' }], urlAds: 'ads-url' });

        const playerElement = document.getElementById(
            'jw-player-manager-player'
        );
        playerElement.style.pointerEvents = 'sentinel';

        listeners.ready();

        expect(playerElement.style.pointerEvents).toBe('sentinel');
    });

    it('setHostVisibility(true) sets host pointerEvents to none', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];
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

        const host = document.getElementById('jw-player-manager-host');

        expect(host.style.pointerEvents).toBe('none');
    });

    it('setHostVisibility(false) sets host pointerEvents to none', () => {
        const manager = loadManager();

        manager.ensure({ playlist: [{ id: 'video-1' }], urlAds: 'ads-url' });
        manager.close();

        const host = document.getElementById('jw-player-manager-host');

        expect(host.style.pointerEvents).toBe('none');
    });

    // video_view residual root-cause fix (engram #1929, topic
    // sdd/carrusel-session-reducer/videoview-residual-rootcause). The JW
    // tracking listeners (registerPersistentPlayerEvents +
    // registerJwVideoControlsTracking + registerVideoResumeTracking) carry the
    // persistent video_view dedup closure (trackedItem / lastLandedId). Their
    // lifecycle MUST follow the player/playlist SESSION, not the per-navigation
    // open(). Every same-session navigation (auto-advance / swipe / arrow)
    // re-invokes open({ index: currentIndex }) through the React effect; the
    // pre-fix code re-registered on EVERY open, rebuilding a FRESH closure
    // (trackedItem = listVideoData[0], lastLandedId = '') that fired a spurious
    // idx0 / duplicate video_view on the next play before a playlistItem could
    // correct trackedItem. Registration must happen exactly ONCE per fresh
    // session so the persistent closure (and its dedup) survives navigation.
    it('registers the JW tracking listeners exactly once per session — NOT on same-session navigation open()', () => {
        const manager = loadManager();
        const videoHelper = require('../../../../../../components/private/common/utils/videoPlayerHelper'); // eslint-disable-line global-require
        const eventsCleanup = jest.fn();
        helper.registerPersistentPlayerEvents.mockReturnValue(eventsCleanup);

        const playlist = [{ id: 'v1' }, { id: 'v2' }, { id: 'v3' }];

        // Fresh session open (index 0): registers the persistent tracking
        // closure exactly once.
        manager.open({ playlist, variant: 'vertical', index: 0 });

        expect(helper.registerPersistentPlayerEvents).toHaveBeenCalledTimes(1);
        expect(
            videoHelper.registerJwVideoControlsTracking
        ).toHaveBeenCalledTimes(1);
        expect(videoHelper.registerVideoResumeTracking).toHaveBeenCalledTimes(
            1
        );

        // Same-session navigation: no close() in between, so the session is
        // still loaded (isFreshSession === false). The React effect re-invokes
        // open() with the new index. The live tracking closure MUST survive
        // untouched — no teardown, no re-registration, no OFF+ON churn.
        manager.open({ playlist, variant: 'vertical', index: 1 });
        manager.open({ playlist, variant: 'vertical', index: 2 });

        expect(helper.registerPersistentPlayerEvents).toHaveBeenCalledTimes(1);
        expect(
            videoHelper.registerJwVideoControlsTracking
        ).toHaveBeenCalledTimes(1);
        expect(videoHelper.registerVideoResumeTracking).toHaveBeenCalledTimes(
            1
        );

        // The live tracking closure was never torn down mid-session (its dedup
        // state, trackedItem/lastLandedId, is preserved across navigations).
        expect(eventsCleanup).not.toHaveBeenCalled();
    });

    // Invariant: a genuine session boundary (close resets loadedThisSession)
    // MUST re-register the tracking listeners on the next open — covers a fresh
    // open and a cross-carousel switch, where the persistent closure has to be
    // rebound to the new playlist. The gate is isFreshSession, not "never
    // re-register".
    it('re-registers the JW tracking listeners on a genuinely fresh session after close()', () => {
        const manager = loadManager();
        const videoHelper = require('../../../../../../components/private/common/utils/videoPlayerHelper'); // eslint-disable-line global-require
        const playlist = [{ id: 'v1' }, { id: 'v2' }];

        manager.open({ playlist, variant: 'vertical', index: 0 });
        expect(helper.registerPersistentPlayerEvents).toHaveBeenCalledTimes(1);

        manager.close();
        manager.open({ playlist, variant: 'vertical', index: 0 });

        expect(helper.registerPersistentPlayerEvents).toHaveBeenCalledTimes(2);
        expect(
            videoHelper.registerJwVideoControlsTracking
        ).toHaveBeenCalledTimes(2);
        expect(videoHelper.registerVideoResumeTracking).toHaveBeenCalledTimes(
            2
        );
    });

    // Resume/milestone mis-attribution fix (engram #1935, topic
    // sdd/carrusel-session-reducer/resume-milestone-misattribution). The
    // sibling handlers to the video_view fix — registerVideoResumeTracking
    // and the milestone tracking inside registerPersistentPlayerEvents — must
    // be told when an ad break (preroll) is in progress so a programmatic
    // pause/resume around it is never reported as a user videoResume/
    // milestone. registerTrackingListeners wires a LIVE accessor (same
    // pattern as getPlayerInstance above) reflecting sessionState, not a
    // snapshot value.
    it('passes a live isAdBreakActive accessor (reflecting queued/in-progress preroll) to milestone and resume tracking', () => {
        const manager = loadManager();
        const videoHelper = require('../../../../../../components/private/common/utils/videoPlayerHelper'); // eslint-disable-line global-require
        const adManager = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwAdPlayerManager'); // eslint-disable-line global-require

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

        const eventsArg =
            helper.registerPersistentPlayerEvents.mock.calls[0][0];
        const resumeArg =
            videoHelper.registerVideoResumeTracking.mock.calls[0][0];

        expect(typeof eventsArg.isAdBreakActive).toBe('function');
        expect(typeof resumeArg.isAdBreakActive).toBe('function');

        // The preroll is queued/in-progress right now (opened straight onto
        // the ad video) — both accessors must report the ad break as active.
        expect(eventsArg.isAdBreakActive()).toBe(true);
        expect(resumeArg.isAdBreakActive()).toBe(true);

        adManager.playPreroll.mock.calls[0][0].onHandoff();

        // Ad break resolved — the SAME accessor reference now reports false
        // (it reads live sessionState; it is not a stale snapshot).
        expect(eventsArg.isAdBreakActive()).toBe(false);
        expect(resumeArg.isAdBreakActive()).toBe(false);
    });
});
