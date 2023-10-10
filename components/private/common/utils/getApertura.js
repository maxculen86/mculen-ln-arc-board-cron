import get from './get';
import EpigrafeAndCreditsData from './epigrafeAndCreditsData';
import { getShortestImage } from '../../LN/common/utils/mediaHelper';
import isSSR from '../../LN/common/utils/isSSR';

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

const getApertura = (
    isMobile,
    basicImageDsk,
    videoBackground,
    basicImageMobile,
    isLoadWithPicture,
    device,
    videoJW
) => {
    const promoItemsVideo = get(videoBackground, 'promo_items', null);
    const epigrafe = get(videoBackground, 'headlines.basic', null);
    const videoJwTransformed =
        videoBackground && videoBackground.subtype === 'video_jw'
            ? videoBackground
            : false;
    const objectVideo = videoJW || videoJwTransformed || {};
    const playlistJw = get(objectVideo, 'embed.config.videoJw.playlist', []);
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

    const streams = sources || get(videoBackground, 'streams', null);

    const objectStream =
        streams &&
        streams.length > 1 &&
        streams.reduce((currentItem, previustem) =>
            currentItem.width > previustem.width ? currentItem : previustem
        );

    const video =
        get(objectStream, 'file', undefined) ||
        get(objectStream, 'url', undefined) ||
        '';

    const { basic: basicVideoDsk } = promoItemsVideo || {};

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
        ? basicImageMobile || {}
        : (firstPlaylist && dataJw) || basicImageDsk || basicVideoDsk || {};

    const {
        alt_text: altText = '',
        url = '',
        caption,
        resized_urls: resizedUrls = []
    } = data;

    const imageListForPicture = getListOfOpeningImages(
        video,
        basicImageMobile,
        basicImageDsk
    );

    return {
        video: isMobile ? '' : video,
        altText,
        src: url,
        srcset: url,
        caption: epigrafe || caption || '',
        credit: data && EpigrafeAndCreditsData(data),
        resizedUrls: isLoadWithPicture ? imageListForPicture : resizedUrls,
        imgDefault: get(
            getShortestImage(imageListForPicture),
            'resizedUrl',
            url
        ),
        device,
        isMobile
    };
};

export default getApertura;
