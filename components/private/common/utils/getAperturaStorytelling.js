import get from './get';
import { getShortestImage } from '../../LN/common/utils/mediaHelper';

const getImageData = (imageData, proportion) =>
    get(imageData, 'resized_urls', []).filter(
        img => get(img, 'option.proportion') === proportion
    );

const getListOfOpeningImages = (video, basicImageMobile, basicImageDsk) => {
    if (video && basicImageMobile) {
        return getImageData(basicImageMobile, '2:3');
    }

    if (basicImageMobile) {
        return [
            ...getImageData(basicImageDsk, '3:2'),
            ...getImageData(basicImageMobile, '2:3')
        ];
    }

    return get(basicImageDsk, 'resized_urls', []);
};

const getAperturaStorytelling = (
    videoJW = {},
    basicImageDsk = {},
    basicImageMobile = {},
    device = 'desktop'
) => {
    const isMobile = device !== 'desktop';

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
            sources.map(source => {
                return {
                    option: {
                        height: source.height,
                        width: source.width
                    },
                    resizedUrl: source.file
                };
            })
    };

    const data = isMobile
        ? basicImageMobile
        : (firstPlaylist && dataJw) || basicImageDsk;

    const { alt_text: altText = '', url = '', caption } = data || {};

    const resizedUrls = getListOfOpeningImages(
        video,
        basicImageMobile,
        basicImageDsk
    );

    const defaultUrl = get(getShortestImage(resizedUrls), 'resizedUrl', url);

    return {
        videoUrl: isMobile ? '' : video,
        defaultUrl,
        posterUrl: url,
        resizedUrls,
        altText,
        caption: caption || ''
    };
};

export default getAperturaStorytelling;
