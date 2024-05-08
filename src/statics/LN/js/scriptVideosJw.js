import { getJWScript } from '../../../../components/private/common/videoPlayerJw/utils/helperJw';

const scriptVideosJw = document.querySelectorAll('.video-jw');

scriptVideosJw.forEach(scriptElement => {
    const title = scriptElement.getAttribute('data-title');
    const player = scriptElement.getAttribute('data-player');
    const playlist = JSON.parse(scriptElement.getAttribute('data-playlist'));
    const hasAutoplay = scriptElement.getAttribute('data-has-autoplay');
    const idVideo = scriptElement.getAttribute('data-media-id');
    const tagsUrl = scriptElement.getAttribute('data-tags-url');
    const autostart = scriptElement.getAttribute('data-autostart');
    const arcSite = scriptElement.getAttribute('data-arc-site');

    getJWScript(
        title,
        player,
        playlist,
        hasAutoplay,
        idVideo,
        tagsUrl,
        autostart,
        arcSite
    );
});
