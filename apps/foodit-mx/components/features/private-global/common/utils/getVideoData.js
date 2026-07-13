import get from '../../../../private/common/utils/get';

export const getVideoData = videoJW => {
    const playlistJw = get(videoJW, 'embed.config.videoJw.playlist', []);
    const firstPlaylist =
        Array.isArray(playlistJw) && playlistJw[0] ? playlistJw[0] : null;

    const {
        description = '',
        image = '',
        title = '',
        sources: sourcesObtain = []
    } = firstPlaylist || {};

    const sources =
        sourcesObtain.length > 0 &&
        sourcesObtain.filter(src => src.type === 'video/mp4');

    const objectStream =
        sources &&
        sources.length > 1 &&
        sources.reduce((currentItem, previuosItem) =>
            currentItem.width > previuosItem.width ? currentItem : previuosItem
        );

    const video = get(objectStream, 'file', '');

    const dataJw = {
        alt_text: description,
        url: image,
        caption: title,
        resized_urls:
            sources &&
            sources.map(source => ({
                option: {
                    height: source.height,
                    width: source.width
                },
                resizedUrl: source.file
            }))
    };

    return {
        dataJw,
        videoUrl: video,
        posterUrl: image
    };
};
