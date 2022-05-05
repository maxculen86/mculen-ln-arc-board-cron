import get from './get';
import EpigrafeAndCreditsData from './epigrafeAndCreditsData';

const getApertura = (
    isMobile,
    basicImageDsk,
    videoBackground,
    basicImageMobile
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

    return {
        video: isMobile ? '' : video,
        altText,
        src: url,
        srcset: url,
        caption: epigrafe || caption || '',
        credit: data && EpigrafeAndCreditsData(data),
        resizedUrls
    };
};

export default getApertura;
