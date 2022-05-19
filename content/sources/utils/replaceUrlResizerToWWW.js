import { RESIZER_URL_PUBLIC, SITE_LANACION } from 'fusion:environment';
// import get from '../utils/get';

const replaceUrlResizerToWWW = (originalPromoItems = {}) => {
    const { url, type, resized_urls: resizedUrls } = originalPromoItems;

    const replaceUrlToWWW = _url =>
        _url.replace(RESIZER_URL_PUBLIC, SITE_LANACION);

    const transformUrls = _resizedUrls =>
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
