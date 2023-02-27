import { RESIZER_URL_PUBLIC, API_ENV, SITE_LANACION } from 'fusion:environment';
import getProperties from 'fusion:properties';
import { isResizerV2 } from '../../../components/private/common/utils/image/resizer/v2/resizerHelper';

const replaceUrlResizerToWWW = (originalPromoItems = {}) => {
    const { host = 'https://www.lanacion.com.ar' } =
        getProperties('la-nacion-ar') || {};
    const { url = '', type, resized_urls: resizedUrls } = originalPromoItems;

    // TODO: limpiar logica de resizer v1 y v2 cuando se deje de usar v1

    const replaceUrlToWWW = _url => {
        if (!isResizerV2(_url) || API_ENV === 'prod') {
            return _url.replace(RESIZER_URL_PUBLIC, host);
        }
        return _url.replace(RESIZER_URL_PUBLIC, SITE_LANACION);
    };

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
