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

jest.mock('../../../../../../components/private/common/utils/logger', () => ({
    push: jest.fn()
}));

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
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

describe('jwPlayerManager preroll integration', () => {
    let helper;
    let adManager;
    let player;
    let listeners;
    let fireAll;

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
        jest.useRealTimers();
        consoleErrorSpy.mockRestore();
    });

    it('keeps content paused and hidden until one accepted error handoff resolves the queued preroll', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        expect(adManager.playPreroll).toHaveBeenCalledWith(
            expect.objectContaining({
                config: expect.any(Object),
                slotElement: expect.any(HTMLDivElement),
                mountElement: undefined,
                onImpression: expect.any(Function),
                onHandoff: expect.any(Function),
                onError: expect.any(Function)
            })
        );
        expect(player.pause).toHaveBeenCalled();
        expect(player.play).not.toHaveBeenCalled();

        const prerollCallbacks = adManager.playPreroll.mock.calls[0][0];
        prerollCallbacks.onImpression();
        expect(player.play).not.toHaveBeenCalled();

        prerollCallbacks.onError();
        prerollCallbacks.onError();
        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.playlistItem).toHaveBeenCalledTimes(1);
        expect(player.play).toHaveBeenCalledTimes(1);
        expect(
            document.getElementById('jw-player-manager-host').style.visibility
        ).toBe('visible');
    });

    it('logs the real ad failure error (onError) with the ad-error legacy label and threads the cause', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        // recover(error) in jwAdPlayerManager forwards the real thrown error
        // to onError; it must surface as an error and still hand off to content.
        const prerollCallbacks = adManager.playPreroll.mock.calls[0][0];
        const adFailure = new Error('jwplayer failed to init');
        prerollCallbacks.onError(adFailure);

        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.play).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.any(Error),
            expect.objectContaining({
                reason: 'error',
                legacyReason: 'ad-error',
                controllerId: 1,
                source: 'jwPlayerManager/preroll'
            })
        );
        // The exact thrown error is threaded through (identity + message), not
        // a generic synthesized one — this fails if the error stops being passed.
        const adErrorCall = consoleErrorSpy.mock.calls.find(
            ([, ctx]) => ctx && ctx.reason === 'error'
        );
        expect(adErrorCall[0]).toBe(adFailure);
        expect(adErrorCall[0].message).toBe('jwplayer failed to init');
    });

    it('handles onError with no attached error (guard-clause failures) via a generic error', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        // The jwAdPlayerManager guard clauses call onError() with no argument
        // (missing DOM/config/jwplayer). It still logs (generic message) and
        // hands off to content.
        const prerollCallbacks = adManager.playPreroll.mock.calls[0][0];
        prerollCallbacks.onError();

        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.play).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.any(Error),
            expect.objectContaining({
                reason: 'error',
                legacyReason: 'ad-error',
                controllerId: 1,
                source: 'jwPlayerManager/preroll'
            })
        );
    });

    it('waits for the adapter safe callback after the preroll watchdog terminalizes', () => {
        const manager = loadManager();
        const requestTerminal = jest.fn(() => true);
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];
        adManager.playPreroll.mockReturnValue({ requestTerminal });

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const callbacks = adManager.playPreroll.mock.calls[0][0];
        jest.advanceTimersByTime(adManager.HANDOFF_WATCHDOG_MS);

        expect(requestTerminal).toHaveBeenCalledWith('no-fill');
        expect(player.play).not.toHaveBeenCalled();

        callbacks.onHandoff({ reason: 'no-fill', disposal: 'removed' });

        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.play).toHaveBeenCalledTimes(1);
    });

    it('does not log a routine successful preroll terminal (success is analytics, not an error)', () => {
        const manager = loadManager();
        const dataLayer = require('../../../../../../components/private/LN/common/utils/addEventToDataLayer'); // eslint-disable-line global-require
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const callbacks = adManager.playPreroll.mock.calls[0][0];
        callbacks.onHandoff({ reason: 'success', disposal: 'removed' });

        expect(dataLayer.addEventToDataLayerV2).not.toHaveBeenCalledWith(
            expect.objectContaining({ event: 'prerollDiagnostic' })
        );
        // Success is a routine outcome (was a Datadog analytics action, never
        // an error), so it produces no console output.
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('does not log a 404 error for a successful or skipped preroll terminal', () => {
        const manager = loadManager();
        const logger = require('../../../../../../components/private/common/utils/logger'); // eslint-disable-line global-require
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const callbacks = adManager.playPreroll.mock.calls[0][0];
        callbacks.onHandoff({ reason: 'success', disposal: 'removed' });

        expect(logger.push).not.toHaveBeenCalled();
        expect(consoleErrorSpy).not.toHaveBeenCalled();

        // Navigate away then back to the ad video to re-arm a fresh preroll.
        manager.goToIndex(0, playlist);
        manager.goToIndex(1, playlist);
        const secondCallbacks =
            adManager.playPreroll.mock.calls[
                adManager.playPreroll.mock.calls.length - 1
            ][0];
        secondCallbacks.onHandoff({ reason: 'skip', disposal: 'removed' });

        expect(logger.push).not.toHaveBeenCalled();
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('does not log a 404 error when the ad requests content resume (non-error observational signal)', () => {
        const manager = loadManager();
        const logger = require('../../../../../../components/private/common/utils/logger'); // eslint-disable-line global-require
        const dataLayer = require('../../../../../../components/private/LN/common/utils/addEventToDataLayer'); // eslint-disable-line global-require
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const callbacks = adManager.playPreroll.mock.calls[0][0];
        callbacks.onResumeRequested();

        // The content-resume request is a routine, non-error observational
        // signal. It must NEVER reach the dataLayer/GTM (the carousel
        // dataLayer must stay identical to baseline) and is not logged.
        expect(dataLayer.addEventToDataLayerV2).not.toHaveBeenCalledWith(
            expect.objectContaining({ event: 'prerollDiagnostic' })
        );
        // A routine analytics signal (was a Datadog action), so it is not
        // logged and never routed through the 404/flow404 logger.
        expect(consoleErrorSpy).not.toHaveBeenCalled();
        expect(logger.push).not.toHaveBeenCalled();
    });

    it('never routes an errored preroll terminal through the error logger and raises an error-level console.error signal with the legacy reason string', () => {
        const manager = loadManager();
        const logger = require('../../../../../../components/private/common/utils/logger'); // eslint-disable-line global-require
        const dataLayer = require('../../../../../../components/private/LN/common/utils/addEventToDataLayer'); // eslint-disable-line global-require
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const callbacks = adManager.playPreroll.mock.calls[0][0];
        callbacks.onHandoff({ reason: 'error', disposal: 'removed' });

        expect(logger.push).not.toHaveBeenCalled();
        expect(dataLayer.addEventToDataLayerV2).not.toHaveBeenCalledWith(
            expect.objectContaining({ event: 'prerollDiagnostic' })
        );
        // A failure reason must fire an ERROR-level signal (an Error
        // instance, for alerting), not a plain action string
        // indistinguishable from a successful preroll.
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error), {
            reason: 'error',
            legacyReason: 'ad-error',
            controllerId: 1,
            disposal: 'removed',
            source: 'jwPlayerManager/preroll'
        });
        expect(consoleErrorSpy.mock.calls[0][0].message).toBe('preroll error');
    });

    it('maps the canonical watchdog and no-fill reasons back to their legacy strings', () => {
        const manager = loadManager();
        const dataLayer = require('../../../../../../components/private/LN/common/utils/addEventToDataLayer'); // eslint-disable-line global-require
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const callbacks = adManager.playPreroll.mock.calls[0][0];
        callbacks.onHandoff({ reason: 'watchdog', disposal: 'fallback-inert' });

        expect(dataLayer.addEventToDataLayerV2).not.toHaveBeenCalledWith(
            expect.objectContaining({ event: 'prerollDiagnostic' })
        );
        // watchdog and no-fill are failure reasons -> error-level signal.
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error), {
            reason: 'watchdog',
            legacyReason: 'post-impression-watchdog',
            controllerId: 1,
            disposal: 'fallback-inert',
            source: 'jwPlayerManager/preroll'
        });

        // Navigate away then back to the ad video to re-arm a fresh preroll.
        manager.goToIndex(0, playlist);
        manager.goToIndex(1, playlist);
        const secondCallbacks =
            adManager.playPreroll.mock.calls[
                adManager.playPreroll.mock.calls.length - 1
            ][0];
        secondCallbacks.onHandoff({ reason: 'no-fill', disposal: 'removed' });

        expect(dataLayer.addEventToDataLayerV2).not.toHaveBeenCalledWith(
            expect.objectContaining({ event: 'prerollDiagnostic' })
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error), {
            reason: 'no-fill',
            legacyReason: 'handoff-watchdog',
            controllerId: 2,
            disposal: 'removed',
            source: 'jwPlayerManager/preroll'
        });
    });

    it('logs a preroll setup exception (startup-exception) with the real cause and still hands off', () => {
        const manager = loadManager();
        const logger = require('../../../../../../components/private/common/utils/logger'); // eslint-disable-line global-require
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];
        helper.buildAdPlayerConfig.mockImplementationOnce(() => {
            throw new Error('config failed');
        });

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1
        });

        expect(player.playlistItem).toHaveBeenLastCalledWith(1);
        expect(player.play).toHaveBeenCalledTimes(1);
        expect(logger.push).not.toHaveBeenCalled();
        expect(
            require('../../../../../../components/private/LN/common/utils/addEventToDataLayer')
                .addEventToDataLayerV2 // eslint-disable-line global-require
        ).not.toHaveBeenCalledWith(
            expect.objectContaining({ event: 'prerollDiagnostic' })
        );
        // A synchronous exception during preroll setup is a real error: it is
        // logged with the actual thrown cause, not silenced.
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.any(Error),
            expect.objectContaining({
                reason: 'startup-exception',
                controllerId: 1,
                source: 'jwPlayerManager/preroll'
            })
        );
        const setupErrorCall = consoleErrorSpy.mock.calls.find(
            ([, ctx]) => ctx && ctx.reason === 'startup-exception'
        );
        expect(setupErrorCall[0].message).toBe('config failed');
    });

    it('hands off when the diagnostic console.error call itself throws on an errored terminal', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];
        consoleErrorSpy.mockImplementationOnce(() => {
            throw new Error('console.error boom');
        });

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        // An errored terminal IS logged. Make that console.error throw and
        // verify the content handoff still completes: diagnostics must never
        // prevent the handoff, even when the reporting call itself throws.
        const callbacks = adManager.playPreroll.mock.calls[0][0];
        callbacks.onHandoff({ reason: 'error', disposal: 'removed' });

        expect(player.playlistItem).toHaveBeenLastCalledWith(1);
        expect(player.play).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.any(Error),
            expect.objectContaining({
                reason: 'error',
                controllerId: 1
            })
        );
    });

    it('recovers when persistent pause throws before preroll startup', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];
        player.pause.mockImplementationOnce(() => {
            throw new Error('pause failed');
        });

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1
        });

        expect(player.playlistItem).toHaveBeenCalledWith(1);
        expect(player.play).toHaveBeenCalledTimes(1);
        expect(
            document.getElementById('jw-player-manager-host').style.visibility
        ).toBe('visible');
    });

    it('reveals content once when post-handoff player commands throw', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];
        player.playlistItem.mockImplementationOnce(() => {
            throw new Error('playlist command failed');
        });
        player.play.mockImplementationOnce(() => {
            throw new Error('play failed');
        });

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1
        });
        const callbacks = adManager.playPreroll.mock.calls[0][0];

        callbacks.onHandoff();
        callbacks.onHandoff();

        expect(player.playlistItem).toHaveBeenCalledTimes(1);
        expect(player.play).toHaveBeenCalledTimes(1);
        expect(
            document.getElementById('jw-player-manager-host').style.visibility
        ).toBe('visible');
    });

    it('does not consume a disconnected slot without a mount element', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];
        const anchor = createAnchor();

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor);
        anchor.remove();
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1
        });

        expect(adManager.playPreroll).not.toHaveBeenCalled();
    });

    it('owns watchdog timers in jwPlayerManager and rejects stale callbacks from a cancelled controller', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 },
            { id: 'video-4', counterVideo: 4 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const staleCallbacks = adManager.playPreroll.mock.calls[0][0];
        expect(staleCallbacks.isCurrent()).toBe(true);

        manager.goToIndex(2, playlist);
        expect(adManager.destroy).toHaveBeenCalledTimes(1);
        expect(staleCallbacks.isCurrent()).toBe(false);

        staleCallbacks.onImpression();
        jest.advanceTimersByTime(adManager.POST_IMPRESSION_WATCHDOG_MS);
        staleCallbacks.onHandoff();
        expect(player.playlistItem).toHaveBeenCalledWith(2);
        expect(player.play).toHaveBeenCalledTimes(1);

        manager.goToIndex(1, playlist);
        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);

        const freshCallbacks = adManager.playPreroll.mock.calls[1][0];
        jest.advanceTimersByTime(adManager.HANDOFF_WATCHDOG_MS);
        expect(player.playlistItem).toHaveBeenLastCalledWith(1);
        expect(player.play).toHaveBeenCalledTimes(2);

        freshCallbacks.onHandoff();
        expect(player.play).toHaveBeenCalledTimes(2);
    });

    it('clears the preroll state before the handoff content play so isAdBreakActive is false during play', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const callbacks = adManager.playPreroll.mock.calls[0][0];
        callbacks.onImpression();

        const activeDuringPlay = [];
        player.play.mockImplementation(() => {
            activeDuringPlay.push(manager.isAdBreakActive());
        });

        expect(manager.isAdBreakActive()).toBe(true);
        callbacks.onHandoff();

        expect(player.play).toHaveBeenCalledTimes(1);
        expect(activeDuringPlay).toEqual([false]);
        expect(manager.isAdBreakActive()).toBe(false);
    });

    it('does not reveal content from a stale preroll callback after close and immediate reopen on the preroll video', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];
        const anchor = createAnchor();

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor);
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        const staleCallbacks = adManager.playPreroll.mock.calls[0][0];
        staleCallbacks.onImpression();

        manager.close();

        // Immediate reopen on the same preroll video must start a new session.
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        // Reset recorded commands so any subsequent call is from the stale callback.
        player.playlistItem.mockClear();
        player.play.mockClear();

        // Late stale callback from the closed session should not hand off content.
        staleCallbacks.onHandoff();

        expect(player.playlistItem).not.toHaveBeenCalled();
        expect(player.play).not.toHaveBeenCalled();

        const host = document.getElementById('jw-player-manager-host');
        expect(host.style.visibility).toBe('hidden');
    });

    it('pauses and hides content when re-entering the preroll video after navigating away', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-2', counterVideo: 2 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(createAnchor());
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 2,
            urlAds: 'ads-url'
        });

        const firstPreroll = adManager.playPreroll.mock.calls[0][0];
        firstPreroll.onImpression();

        // Navigate away from the preroll video (3 -> 2).
        manager.goToIndex(1, playlist);
        expect(adManager.destroy).toHaveBeenCalledTimes(1);
        expect(player.playlistItem).toHaveBeenLastCalledWith(1);

        // Content was revealed while playing video 2.
        const host = document.getElementById('jw-player-manager-host');
        expect(host.style.visibility).toBe('visible');

        // Reset content playback tracking to observe only the second preroll period.
        player.play.mockClear();
        player.playlistItem.mockClear();
        const pauseVisibility = [];
        player.pause.mockClear();
        player.pause.mockImplementation(() => {
            pauseVisibility.push(host.style.visibility);
        });

        // Navigate back to the preroll video (2 -> 3).
        manager.goToIndex(2, playlist);

        // Preroll must re-arm and the underlying content player must be paused
        // and hidden so it cannot advance behind the active ad.
        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);
        expect(player.pause).toHaveBeenCalled();
        expect(pauseVisibility.at(-1)).toBe('hidden');
        expect(player.play).not.toHaveBeenCalled();
        expect(player.playlistItem).not.toHaveBeenCalled();
        expect(host.style.visibility).toBe('hidden');

        const secondPreroll = adManager.playPreroll.mock.calls[1][0];
        secondPreroll.onImpression();
        expect(player.play).not.toHaveBeenCalled();

        // Only after handoff should the real content be selected and revealed.
        secondPreroll.onHandoff();
        expect(player.playlistItem).toHaveBeenCalledWith(2);
        expect(player.play).toHaveBeenCalledTimes(1);
        expect(host.style.visibility).toBe('visible');
    });

    it('waits for a fresh position before arming a preroll after close and reopen', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];
        const anchor = createAnchor();

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor);
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);

        manager.close();
        expect(adManager.destroy).toHaveBeenCalled();

        // Reopen without an explicit positionOver. The previous slot is no
        // longer valid for this session, so the manager must wait for a fresh
        // mount instead of consuming the stale ref.
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        expect(player.play).not.toHaveBeenCalled();

        const freshAnchor = createAnchor();
        manager.positionOver(freshAnchor);

        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);
        expect(adManager.playPreroll.mock.calls[1][0].slotElement).toBe(
            freshAnchor
        );
    });

    it('cancels an unstartable queued preroll and rearms it from a later fresh position', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).not.toHaveBeenCalled();
        expect(manager.isAdBreakActive()).toBe(false);

        const freshAnchor = createAnchor();
        manager.positionOver(freshAnchor);

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        expect(adManager.playPreroll.mock.calls[0][0].slotElement).toBe(
            freshAnchor
        );
    });

    it('plays content during the delayed-position gap after queued preroll cancellation', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).not.toHaveBeenCalled();

        player.getPlaylistIndex.mockReturnValue(1);
        fireAll('playlistItem', { index: 1, item: { mediaid: 'video-3' } });

        expect(player.play).toHaveBeenCalledTimes(1);
    });

    it('plays interim content when open runs before positionOver', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        player.getPlaylistIndex.mockReturnValue(1);
        fireAll('playlistItem', { index: 1, item: { mediaid: 'video-3' } });

        expect(player.play).toHaveBeenCalledTimes(1);
        expect(adManager.playPreroll).not.toHaveBeenCalled();
    });

    it('does not consume a disconnected mount after close; rearms preroll only after a fresh positionOver with a connected mount', () => {
        const manager = loadManager();
        const playlist = [
            { id: 'video-1', counterVideo: 1 },
            { id: 'video-3', counterVideo: 3 }
        ];

        // Real mount target simulating the dialog/slot node.
        const mount = document.createElement('div');
        document.body.appendChild(mount);
        const anchor = createAnchor();
        mount.appendChild(anchor);

        manager.ensure({ playlist, urlAds: 'ads-url' });
        listeners.ready();
        manager.positionOver(anchor, mount);
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        const firstCall = adManager.playPreroll.mock.calls[0][0];
        expect(firstCall.slotElement.isConnected).toBe(true);
        expect(firstCall.mountElement).toBe(mount);
        expect(firstCall.mountElement.isConnected).toBe(true);

        manager.close();
        expect(adManager.destroy).toHaveBeenCalled();

        // Simulate slot unmount while its mount remains connected.
        anchor.remove();

        // Reopen before a fresh positionOver arrives.
        manager.open({
            playlist,
            fullListVideoData: playlist,
            variant: 'vertical',
            index: 1,
            urlAds: 'ads-url'
        });

        // The stale disconnected refs must not be trusted; the preroll stays
        // queued and no host is reparented into a detached node.
        expect(adManager.playPreroll).toHaveBeenCalledTimes(1);
        expect(player.play).not.toHaveBeenCalled();

        const hostAfterStaleReopen = document.getElementById(
            'jw-player-manager-host'
        );
        expect(hostAfterStaleReopen.parentElement).not.toBe(mount);

        // Fresh connected mount arrives.
        const freshMount = document.createElement('div');
        document.body.appendChild(freshMount);
        const freshAnchor = createAnchor();
        freshMount.appendChild(freshAnchor);

        manager.positionOver(freshAnchor, freshMount);

        // Now the preroll rearms with connected refs and the content host is
        // attached to the live mount.
        expect(adManager.playPreroll).toHaveBeenCalledTimes(2);
        const secondCall = adManager.playPreroll.mock.calls[1][0];
        expect(secondCall.slotElement.isConnected).toBe(true);
        expect(secondCall.mountElement).toBe(freshMount);
        expect(secondCall.mountElement.isConnected).toBe(true);

        const host = document.getElementById('jw-player-manager-host');
        expect(host.parentElement).toBe(freshMount);
        expect(host.isConnected).toBe(true);
    });
});
