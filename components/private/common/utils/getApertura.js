import get from './get';
import EpigrafeAndCreditsData from './epigrafeAndCreditsData';
import { getShortestImage } from '../../LN/common/utils/mediaHelper';

export const getImageData = (imageData, proportion) =>
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

const extractVideoData = (videoBackground, videoJW) => {
    const videoJwTransformed =
        videoBackground?.subtype === 'video_jw' ? videoBackground : null;

    const objectVideo = videoJW || videoJwTransformed || {};
    const playlist = get(objectVideo, 'embed.config.videoJw.playlist', []);
    const firstPlaylist = playlist[0] || null;

    const {
        description = '',
        image = '',
        title = '',
        sources: sourcesObtain = []
    } = firstPlaylist || {};

    const sources = sourcesObtain.filter(src => src.type === 'video/mp4');
    const streams = sources.length
        ? sources
        : get(videoBackground, 'streams', []);

    const bestStream = streams.reduce(
        (current, prev) => (current.width > prev.width ? current : prev),
        {}
    );

    const video = bestStream.file || bestStream.url || '';

    const dataJw = {
        alt_text: description,
        url: image,
        caption: title,
        resized_urls: sources.map(source => ({
            option: { height: source.height, width: source.width },
            resizedUrl: source.file
        }))
    };

    return { video, dataJw, firstPlaylist };
};

const getImageDataForDevice = (
    isMobile,
    basicImageMobile,
    basicImageDsk,
    dataJw,
    videoPromo,
    firstPlaylist
) =>
    isMobile
        ? basicImageMobile || {}
        : (firstPlaylist && dataJw) || basicImageDsk || videoPromo || {};

const formatAperturaData = ({
    isMobile,
    basicImageDsk,
    videoBackground,
    basicImageMobile,
    device,
    videoJW
}) => {
    const { video, dataJw, firstPlaylist } = extractVideoData(
        videoBackground,
        videoJW
    );

    const data = getImageDataForDevice(
        isMobile,
        basicImageMobile,
        basicImageDsk,
        dataJw,
        get(videoBackground, 'promo_items.basic', {}),
        firstPlaylist
    );

    const { alt_text: altText = '', url = '', caption } = data;

    const imageList = getListOfOpeningImages(
        video,
        basicImageMobile,
        basicImageDsk
    );

    return {
        video: isMobile ? '' : video,
        altText,
        src: url,
        srcset: url,
        caption: get(videoBackground, 'headlines.basic', '') || caption || '',
        credit: EpigrafeAndCreditsData(data),
        resizedUrls: imageList,
        imgDefault: get(getShortestImage(imageList), 'resizedUrl', url),
        device,
        isMobile
    };
};

const getApertura = (
    isMobile,
    basicImageDsk,
    videoBackground,
    basicImageMobile,
    device,
    videoJW
) =>
    formatAperturaData({
        isMobile,
        basicImageDsk,
        videoBackground,
        basicImageMobile,
        device,
        videoJW
    });

export default getApertura;
