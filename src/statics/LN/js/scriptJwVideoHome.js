import {
    productClickFromClientVideoJW,
    setupVideoObserver
} from '../../../../components/features/LN-10/videoPlayer/_helper';
import loadJWPlayerScript from '../../../../components/chains/utils/loadJWPlayerScript';
import { addEventToDataLayerV2 } from '../../../../components/private/LN/common/utils/addEventToDataLayer';

window.addEventListener('load', function () {
    const hasJwVideos = document.querySelectorAll('[data-has-jwplayer="true"]');

    hasJwVideos.forEach(articleElement => {
        const config = JSON.parse(
            articleElement.getAttribute('data-config') || ''
        );
        const { title, mediaId, instanceConfig, playerId, withAutoplay } =
            config || {};

        const facade = document.getElementById(`facade-${mediaId}`);
        const setInstancePlayer = () =>
            loadJWPlayerScript(playerId, () => {
                const instance = window.jwplayer && window.jwplayer(mediaId);
                if (instance) {
                    facade?.remove();

                    instance.setup({
                        ...instanceConfig,
                        width: '100%'
                    });

                    instance.on('play', () => {
                        addEventToDataLayerV2({
                            event: 'videoPlay',
                            rest: {
                                videoName: title || '',
                                videoID: mediaId || ''
                            }
                        });

                        if (
                            !articleElement.hasAttribute(
                                'data-skip-product-click'
                            )
                        ) {
                            productClickFromClientVideoJW(
                                articleElement,
                                title || ''
                            );
                        }
                    });
                }
            });
        setupVideoObserver(articleElement, (entry, observer) => {
            const isVisible = entry.isIntersecting;
            if (isVisible) {
                if (facade && withAutoplay) {
                    setInstancePlayer();
                } else {
                    facade.addEventListener('click', setInstancePlayer);
                }
                observer.unobserve(articleElement);
            }
        });
    });
});
