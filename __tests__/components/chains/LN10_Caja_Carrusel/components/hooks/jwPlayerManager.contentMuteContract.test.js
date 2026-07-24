// Content-mute-contract suite (WI 175632). Product requirement (parity with the
// prod/master baseline): the carousel content player does NOT force a mute
// state. Master never called setMute on the content — it let JW negotiate
// autoplay audio with the browser (Chrome media-engagement index), so engaged
// users start with sound and everyone else falls back to a muted autoplay
// gracefully. The audio-bleed during the preroll is handled SEPARATELY by
// hard-muting the content media elements (muteContentMediaElements), which stays
// in force even for an explicitly-unmuted user.

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
        shouldMuteContent: jest.fn().mockReturnValue(true),
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

describe('jwPlayerManager content mute contract (WI 175632)', () => {
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

    beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
        document.body.innerHTML = '';

        helper = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper'); // eslint-disable-line global-require
        adManager = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwAdPlayerManager'); // eslint-disable-line global-require

        ({ player, listeners } = createPlayerMock());
        helper.setupPersistentPlayer.mockReturnValue(player);
        adManager.playPreroll.mockReturnValue({ requestTerminal: jest.fn() });
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it('does NOT force a mute state on the content player (parity with master: JW negotiates autoplay audio)', () => {
        const manager = loadManager();
        const playlist = [{ id: 'video-1' }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.open({ playlist, variant: 'vertical', index: 0 });
        manager.positionOver(createAnchor());

        // The manager never applies a forced mute state on content — neither
        // muted-by-default nor unmuted. Mute is left to JW/browser negotiation.
        expect(player.setMute).not.toHaveBeenCalled();
    });

    it('hard-mutes the content media elements during the ad break so audio never bleeds even for an explicitly-unmuted user', () => {
        helper.shouldMuteContent.mockReturnValue(false);

        const manager = loadManager();
        const playlist = [{ id: 'ad-video', counterVideo: 3 }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        const host = document.getElementById('jw-player-manager-host');
        const video = document.createElement('video');
        host.appendChild(video);

        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 0,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        expect(video.muted).toBe(true);
    });

    const openFreshSession = manager => {
        const playlist = [{ id: 'video-1' }];
        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.open({ playlist, variant: 'vertical', index: 0 });
        manager.positionOver(createAnchor());
    };

    it('restores the pre-ad content mute (unmuted) once the ad surface disappears — video 3 is not left stuck muted', () => {
        // The user watched videos 1/2 unmuted; after the ad the content player
        // is left muted by IMA and must be realigned to that pre-ad state.
        player.getMute = jest.fn();
        adManager.getAdHostElement.mockReturnValue(null);

        const manager = loadManager();
        openFreshSession(manager);

        // Normal playback tick captures the user's unmuted state.
        player.getMute.mockReturnValue(false);
        listeners.time({ position: 1 });

        // The preroll ad is on screen (ad host present).
        adManager.getAdHostElement.mockReturnValue(
            document.createElement('div')
        );
        listeners.time({ position: 0 });

        // The ad ends: host gone, content left muted by IMA.
        adManager.getAdHostElement.mockReturnValue(null);
        player.getMute.mockReturnValue(true);
        player.setMute.mockClear();
        listeners.time({ position: 1 });

        expect(player.setMute).toHaveBeenCalledWith(false);
    });

    it('restores a muted pre-ad state after the ad (respects the user having muted before the preroll)', () => {
        player.getMute = jest.fn();
        adManager.getAdHostElement.mockReturnValue(null);

        const manager = loadManager();
        openFreshSession(manager);

        player.getMute.mockReturnValue(true); // user had muted
        listeners.time({ position: 1 });

        adManager.getAdHostElement.mockReturnValue(
            document.createElement('div')
        );
        listeners.time({ position: 0 });

        adManager.getAdHostElement.mockReturnValue(null);
        player.getMute.mockReturnValue(false);
        player.setMute.mockClear();
        listeners.time({ position: 1 });

        expect(player.setMute).toHaveBeenCalledWith(true);
    });

    it('never forces the content mute during normal playback (does not fight the user toggling audio)', () => {
        player.getMute = jest.fn().mockReturnValue(false);
        adManager.getAdHostElement.mockReturnValue(null);

        const manager = loadManager();
        openFreshSession(manager);

        player.setMute.mockClear();
        listeners.time({ position: 1 });
        listeners.time({ position: 2 });
        listeners.time({ position: 3 });

        // No ad->content transition → the listener only observes, never sets.
        expect(player.setMute).not.toHaveBeenCalled();
    });

    it('does NOT touch the content mute while an ad host is present (bleed protection during the preroll)', () => {
        player.getMute = jest.fn().mockReturnValue(true);
        // Ad surface is active → the content must stay muted, untouched.
        adManager.getAdHostElement.mockReturnValue(
            document.createElement('div')
        );

        const manager = loadManager();
        openFreshSession(manager);

        player.setMute.mockClear();
        listeners.time({ position: 1 });

        expect(player.setMute).not.toHaveBeenCalled();
    });

    it('marks the pre-ad content mute as programmatic when the player is unmuted (no phantom user mute click)', () => {
        const videoHelper = require('../../../../../../components/private/common/utils/videoPlayerHelper'); // eslint-disable-line global-require
        helper.shouldMuteContent.mockReturnValue(false);
        player.getMute = jest.fn().mockReturnValue(false);

        const manager = loadManager();
        const playlist = [{ id: 'ad-video', counterVideo: 3 }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        const host = document.getElementById('jw-player-manager-host');
        host.appendChild(document.createElement('video'));
        manager.positionOver(createAnchor());

        videoHelper.markProgrammaticMute.mockClear();
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 0,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        // The ad-break mute is programmatic → mark it so handleMute suppresses
        // the resulting 'mute' event instead of tracking it as a user click.
        expect(videoHelper.markProgrammaticMute).toHaveBeenCalledWith(player);
    });

    it('does NOT mark the pre-ad mute when the player is already muted (avoids leaking the mark into the next real user mute)', () => {
        const videoHelper = require('../../../../../../components/private/common/utils/videoPlayerHelper'); // eslint-disable-line global-require
        helper.shouldMuteContent.mockReturnValue(true);
        player.getMute = jest.fn().mockReturnValue(true);

        const manager = loadManager();
        const playlist = [{ id: 'ad-video', counterVideo: 3 }];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        const host = document.getElementById('jw-player-manager-host');
        host.appendChild(document.createElement('video'));
        manager.positionOver(createAnchor());

        videoHelper.markProgrammaticMute.mockClear();
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 0,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        // Already muted → muting fires no 'mute' event, so a mark would never be
        // consumed and would swallow the user's next genuine mute toggle.
        expect(videoHelper.markProgrammaticMute).not.toHaveBeenCalled();
    });

    it('marks the post-ad restore as programmatic so it is not tracked as a user unmute click', () => {
        const videoHelper = require('../../../../../../components/private/common/utils/videoPlayerHelper'); // eslint-disable-line global-require
        player.getMute = jest.fn();
        adManager.getAdHostElement.mockReturnValue(null);

        const manager = loadManager();
        openFreshSession(manager);

        // Pre-ad playback: user is unmuted.
        player.getMute.mockReturnValue(false);
        listeners.time({ position: 1 });

        // Ad on screen.
        adManager.getAdHostElement.mockReturnValue(
            document.createElement('div')
        );
        listeners.time({ position: 0 });

        // Ad ends: content left muted by IMA → restore fires setMute(false).
        adManager.getAdHostElement.mockReturnValue(null);
        player.getMute.mockReturnValue(true);
        videoHelper.markProgrammaticMute.mockClear();
        player.setMute.mockClear();
        listeners.time({ position: 1 });

        expect(videoHelper.markProgrammaticMute).toHaveBeenCalledWith(player);
        expect(player.setMute).toHaveBeenCalledWith(false);
    });
});
