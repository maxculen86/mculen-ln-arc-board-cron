import get from '../../../../../private/common/utils/get';
import { replaceAllUrlsResizerObject } from '../../../../../private/LN/common/utils/mediaHelper';

const getOpeningMediaItems = (promoItems = {}) => {
    const storytelling = get(promoItems, 'Storytelling', null);
    const storytellingMobile = get(promoItems, 'storytelling_mobile', null);
    const basic = get(promoItems, 'basic', null);

    const desktopImageItem = storytelling || basic || storytellingMobile;
    const mobileImageItem = storytellingMobile || storytelling || basic;

    return { desktopImageItem, mobileImageItem };
};

const getNormalizedImageData = (imageData = {}) => {
    if (!imageData)
        return { resizedUrls: [], url: '', caption: '', altText: '' };

    const {
        resized_urls: resizedUrls = [],
        url = '',
        caption = '',
        alt_text: altText = ''
    } = replaceAllUrlsResizerObject(imageData);

    return { resizedUrls, url, caption, altText };
};

export { getOpeningMediaItems, getNormalizedImageData };
