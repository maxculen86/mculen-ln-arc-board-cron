import get from './get';
import EpigrafeAndCreditsData from './epigrafeAndCreditsData';
import { getShortestImage } from '../../LN/common/utils/mediaHelper';

const getImageData = (imageData, proportion) =>
    get(imageData, 'resized_urls', []).filter(
        img => get(img, 'option.proportion') === proportion
    );

const getApertura = (
    isMobile,
    basicImageDsk,
    videoBackground,
    basicImageMobile,
    isLoadWithPicture
) => {
    const promoItemsVideo = get(videoBackground, 'promo_items', null);
    const epigrafe = get(videoBackground, 'headlines.basic', null);
    const streams = get(videoBackground, 'streams', null);
    const video =
        streams && streams.length > 1
            ? streams.reduce((currentItem, previustem) =>
                  currentItem.width > previustem.width
                      ? currentItem
                      : previustem
              ).url
            : '';

    const { basic: basicVideoDsk } = promoItemsVideo || {};

    const data = isMobile
        ? basicImageMobile || {}
        : basicVideoDsk || basicImageDsk || {};

    const {
        alt_text: altText = '',
        url = '',
        caption,
        resized_urls: resizedUrls = []
    } = data;

    const imageListForPicture = [
        ...getImageData(basicImageDsk, '3:2'),
        ...getImageData(basicImageMobile, '2:3')
    ];

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
        )
    };
};

export default getApertura;
