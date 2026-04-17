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
import { registerJwVideoControlsTracking } from '../../../../components/private/common/utils/videoPlayerHelper';
import { videoContainer } from '../../../../components/features/LN-10/videoPlayer/share/utils';
import { handleShare } from '../../../../components/features/LN-10/videoPlayer/share/shareHandler';
import {
    getVerticalPlayer,
    onJwPlayerReady
} from '../../../../components/private/common/videoPlayerJw/utils/helperJw';

const trackingCleanupByMediaId = new Map();

//TODO Unificar logica de eventos con script de home y nota.
window.addEventListener('load', function () {
    const hasJwVideos = document.querySelectorAll('[data-has-jwplayer="true"]');

    hasJwVideos.forEach(articleElement => {
        const config = JSON.parse(
            articleElement.getAttribute('data-config') || ''
        );
        const {
            title,
            mediaId,
            instanceConfig,
            playerId,
            withAutoplay,
            videoId,
            roof,
            duration
        } = config || {};

        const videoOrientation = getVerticalPlayer(playerId)
            ? 'vertical'
            : 'horizontal';

        const facade = document.getElementById(`facade-${mediaId}`);
        let initialMode = null;
        let currentTitle = title || '';
        let currentId = mediaId || '';
        let skipPlayForSeek = false;
        let wasPaused = false;

        const setInstancePlayer = () =>
            loadJWPlayerScript(playerId, () => {
                const instance = window.jwplayer && window.jwplayer(mediaId);
                if (instance) {
                    facade?.remove();

                    trackingCleanupByMediaId.get(mediaId)?.();
                    trackingCleanupByMediaId.delete(mediaId);

                    instance.setup({
                        ...instanceConfig,
                        width: '100%'
                    });

                    skipPlayForSeek = false;
                    setVideoStatus(mediaId);
                    const videoState = getVideoStatus(mediaId);
                    const cleanupTracking = registerJwVideoControlsTracking({
                        player: instance,
                        defaultTitle: currentTitle,
                        defaultId: currentId,
                        onSeek: () => {
                            skipPlayForSeek = true;
                        },
                        onPlaylistItem: ({ title: newTitle, id: newId }) => {
                            currentTitle = newTitle;
                            currentId = newId;
                            skipPlayForSeek = false;
                            initialMode = null;
                            wasPaused = false;
                        }
                    });
                    trackingCleanupByMediaId.set(mediaId, cleanupTracking);

                    instance.on('ready', () =>
                        onJwPlayerReady(instance, {
                            currentTitle: title,
                            duration
                        })
                    );

                    instance.on('play', (e = {}) => {
                        if (skipPlayForSeek) {
                            skipPlayForSeek = false;
                            return;
                        }

                        if (wasPaused) {
                            wasPaused = false;
                            addEventToDataLayerV2({
                                event: 'videoResume',
                                rest: {
                                    videoName: currentTitle,
                                    videoID: videoId
                                }
                            });
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
                                videoID: videoId,
                                mode,
                                videoOrientation,
                                category_video: roof
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

                    instance.on('pause', () => {
                        wasPaused = true;
                        handleVideoStop(articleElement, videoState);
                    });
                    instance.on('complete', () =>
                        handleVideoStop(articleElement, videoState)
                    );

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
                handleShare(videoId, title, mediaId);
            }
        );
    });
});
