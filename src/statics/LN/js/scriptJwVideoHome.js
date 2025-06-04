import { productClickFromClientVideoJW } from '../../../../components/features/LN-10/videoPlayer/_helper';

window.addEventListener('load', function () {
    const hasJwVideos = document.querySelectorAll('[data-has-jwplayer="true"]');

    hasJwVideos.forEach(scriptElement => {
        const config = JSON.parse(
            scriptElement.getAttribute('data-config') || ''
        );
        const { title, mediaId, instanceConfig } = config || {};
        const { playlist } = instanceConfig;

        const instance = window.jwplayer && window.jwplayer(mediaId);
        if (!instance || !playlist.length) return;

        instance.setup({
            ...instanceConfig,
            width: '100%'
        });

        instance.on('play', function () {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'videoPlay',
                videoName: title || '',
                videoID: mediaId || ''
            });

            const articleElement = document.querySelector(
                `article[data-video-id-jw="${mediaId}"]`
            );

            if (articleElement) {
                productClickFromClientVideoJW(articleElement, title || '');
            }
        });
    });
});
