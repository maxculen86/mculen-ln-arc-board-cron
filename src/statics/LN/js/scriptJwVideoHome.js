import {
    isMostlyInViewport,
    createJWVisibilityAndMetarefreshCallback,
    productClickFromClientVideoJW,
    setupVideoObserver,
    setVideoStatus,
    getPlayingVideosCount,
    getVideoStatus,
    handleVideoStop
} from '../../../../components/features/LN-10/videoPlayer/_helper';
import loadJWPlayerScript from '../../../../components/chains/utils/loadJWPlayerScript';
import { addEventToDataLayerV2 } from '../../../../components/private/LN/common/utils/addEventToDataLayer';
import {
    updatedMediaData,
    pushVideoControlEvent,
    isBackwardTenSeconds,
    shouldTrackRelatedOpen,
    getFullscreenAction,
    getMuteAction,
    registerVolumeRelease
} from '../../../../components/private/common/utils/videoPlayerHelper';
import { videoContainer } from '../../../../components/features/LN-10/videoPlayer/share/utils';
import { handleShare } from '../../../../components/features/LN-10/videoPlayer/share/shareHandler';
import { getVerticalPlayer } from '../../../../components/private/common/videoPlayerJw/utils/helperJw';

//TODO Unificar logica de eventos con script de home y nota.
window.addEventListener('load', function () {
    const hasJwVideos = document.querySelectorAll('[data-has-jwplayer="true"]');

    hasJwVideos.forEach(articleElement => {
        const config = JSON.parse(
            articleElement.getAttribute('data-config') || ''
        );
        const { title, mediaId, instanceConfig, playerId, withAutoplay } =
            config || {};

        const videoOrientation = getVerticalPlayer(playerId)
            ? 'vertical'
            : 'horizontal';

        const facade = document.getElementById(`facade-${mediaId}`);
        let initialMode = null;
        let currentTitle = title || '';
        let currentId = mediaId || '';
        let skipPlayForSeek = false;

        const setInstancePlayer = () =>
            loadJWPlayerScript(playerId, () => {
                const instance = window.jwplayer && window.jwplayer(mediaId);
                if (instance) {
                    facade?.remove();

                    instance.setup({
                        ...instanceConfig,
                        width: '100%'
                    });

                    skipPlayForSeek = false;
                    setVideoStatus(mediaId);
                    const videoState = getVideoStatus(mediaId);
                    let volumeDragActive = false;

                    instance.on('seek', event => {
                        skipPlayForSeek = true;

                        if (isBackwardTenSeconds(event)) {
                            pushVideoControlEvent({
                                id: currentId,
                                title: currentTitle,
                                action: 'delay'
                            });
                        }
                    });

                    instance.on('playlistItem', item => {
                        ({ title: currentTitle, id: currentId } =
                            updatedMediaData(item, {
                                title: currentTitle,
                                id: currentId
                            }));
                        skipPlayForSeek = false;
                        initialMode = null;
                        volumeDragActive = false;
                    });

                    instance.on('play', (e = {}) => {
                        if (skipPlayForSeek) {
                            skipPlayForSeek = false;
                            return;
                        }

                        const reason = e?.playReason;
                        const isAutoplay =
                            reason === 'autostart' || reason === 'viewable';

                        const mode =
                            initialMode ?? (isAutoplay ? 'autoplay' : 'manual');
                        initialMode = null;

                        addEventToDataLayerV2({
                            event: 'videoPlay',
                            rest: {
                                videoName: currentTitle,
                                videoID: currentId,
                                mode,
                                videoOrientation
                            }
                        });

                        if (
                            !articleElement.hasAttribute(
                                'data-skip-product-click'
                            )
                        ) {
                            productClickFromClientVideoJW(
                                articleElement,
                                title || '',
                                mode
                            );
                        }

                        if (
                            isMostlyInViewport(articleElement) &&
                            !videoState.isPlayingInViewport
                        ) {
                            videoState.isPlayingInViewport = true;
                            window.LN?.observable?.publish?.('pauseTimeout');
                        }
                    });

                    instance.on('pause', () =>
                        handleVideoStop(articleElement, videoState)
                    );
                    instance.on('complete', () =>
                        handleVideoStop(articleElement, videoState)
                    );

                    instance.on('mute', event => {
                        pushVideoControlEvent({
                            id: currentId,
                            title: currentTitle,
                            action: getMuteAction(event)
                        });
                    });

                    instance.on('volume', () => {
                        if (volumeDragActive) {
                            return;
                        }

                        volumeDragActive = true;

                        pushVideoControlEvent({
                            id: currentId,
                            title: currentTitle,
                            action: 'volumen'
                        });

                        volumeDragActive = true;

                        registerVolumeRelease(() => {
                            volumeDragActive = false;
                        });
                    });

                    instance.on('levelsChanged', () => {
                        pushVideoControlEvent({
                            id: currentId,
                            title: currentTitle,
                            action: 'config'
                        });
                    });

                    instance.on('relatedReady', () => {
                        const related = instance.getPlugin?.('related');

                        related.on('open', event => {
                            if (!shouldTrackRelatedOpen(event)) return;

                            pushVideoControlEvent({
                                id: currentId,
                                title: currentTitle,
                                action: 'mas_videos'
                            });
                        });
                    });

                    instance.on('fullscreen', event => {
                        pushVideoControlEvent({
                            id: currentId,
                            title: currentTitle,
                            action: getFullscreenAction(event)
                        });
                    });

                    const jwVisibilityAndMetarefreshHandler =
                        createJWVisibilityAndMetarefreshCallback(
                            instance,
                            getPlayingVideosCount,
                            videoState
                        );
                    setupVideoObserver(
                        articleElement,
                        jwVisibilityAndMetarefreshHandler
                    );
                }
            });

        setupVideoObserver(articleElement, (entry, observer) => {
            const isVisible = entry.isIntersecting;
            if (isVisible) {
                if (facade && withAutoplay) {
                    initialMode = 'autoplay';
                    setInstancePlayer();
                } else {
                    facade.addEventListener('click', () => {
                        initialMode = 'manual';
                        setInstancePlayer();
                    });
                }
                observer.unobserve(articleElement);
            }
        });

        videoContainer(articleElement, mediaId)?.addEventListener(
            'click',
            () => {
                handleShare(mediaId, title, mediaId);
            }
        );
    });
});
