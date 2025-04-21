import { getJWScript } from '../../../../components/private/common/videoPlayerJw/utils/helperJw';

export const buildTagsUrl = baseUrl => {
    try {
        const pdfLocalStorage = localStorage.getItem('_pdfps') || '[]';
        const permutiveSegment = encodeURIComponent(
            `&permutive=${encodeURIComponent(
                JSON.parse(pdfLocalStorage).slice(0, 250).join(',')
            )}`
        );

        const urlWithPermutiveSegment = baseUrl.replace(
            /(cust_params[^&]+)/,
            '$1' + permutiveSegment
        );

        return urlWithPermutiveSegment;
    } catch (e) {
        console.warn('Error building permutive segment', e);
        return baseUrl;
    }
};

const scriptVideosJw = document.querySelectorAll('.video-jw');

scriptVideosJw.forEach(scriptElement => {
    const title = scriptElement.getAttribute('data-title');
    const player = scriptElement.getAttribute('data-player');
    const playlist = JSON.parse(scriptElement.getAttribute('data-playlist'));
    const hasAutoplay = scriptElement.getAttribute('data-has-autoplay');
    const idVideo = scriptElement.getAttribute('data-media-id');
    const baseTagsUrl = scriptElement.getAttribute('data-tags-url');
    const autostart = scriptElement.getAttribute('data-autostart');
    const arcSite = scriptElement.getAttribute('data-arc-site');

    const tagsUrl = buildTagsUrl(baseTagsUrl);
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
