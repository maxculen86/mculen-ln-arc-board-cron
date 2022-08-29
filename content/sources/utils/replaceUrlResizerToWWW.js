import { RESIZER_URL_PUBLIC } from 'fusion:environment';
import getProperties from 'fusion:properties';

const replaceUrlResizerToWWW = (originalPromoItems = {}) => {
    const { host = 'https://www.lanacion.com.ar' } =
        getProperties('la-nacion-ar') || {};
    const { url = '', type, resized_urls: resizedUrls } = originalPromoItems;

    const replaceUrlToWWW = _url => _url.replace(RESIZER_URL_PUBLIC, host);

    const transformUrls = (_resizedUrls = []) =>
        _resizedUrls.map(item => {
            return { ...item, resizedUrl: replaceUrlToWWW(item.resizedUrl) };
        });

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
