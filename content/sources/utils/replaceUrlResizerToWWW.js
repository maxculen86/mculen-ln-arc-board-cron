import {
    RESIZER_URL_PUBLIC,
    API_ENV,
    SITE_LANACION,
    IS_STAGING
} from 'fusion:environment';
import getProperties from 'fusion:properties';

const replaceUrlResizerToWWW = (originalPromoItems = {}) => {
    const { host = 'https://www.lanacion.com.ar' } =
        getProperties('la-nacion-ar') || {};
    const { url = '', type, resized_urls: resizedUrls } = originalPromoItems;

    const replaceUrlToWWW = _url => {
        if (API_ENV === 'prod' && IS_STAGING !== 'true') {
            return _url.replace(RESIZER_URL_PUBLIC, host);
        }
        return _url.replace(RESIZER_URL_PUBLIC, SITE_LANACION);
    };

    const transformUrls = (_resizedUrls = []) =>
        _resizedUrls.map(item => ({
            ...item,
            resizedUrl: replaceUrlToWWW(item.resizedUrl)
        }));

    if (type !== 'image') return originalPromoItems;

    return type === 'image'
        ? {
              ...originalPromoItems,
              url: replaceUrlToWWW(url),
              resized_urls: transformUrls(resizedUrls)
          }
        : originalPromoItems;
};

export default replaceUrlResizerToWWW;
