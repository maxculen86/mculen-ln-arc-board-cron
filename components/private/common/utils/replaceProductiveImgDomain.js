import { SITE_LANACION } from 'fusion:environment';
import { isEmptyString } from './dataValidation';
import get from './get';

const LANACION_BASE_URL = SITE_LANACION || 'https://www.lanacion.com.ar';

const replaceProductiveImgDomain = (url = '') =>
    !isEmptyString(url)
        ? url.replace(/^.*\/\/[^\\/]+(?=\/resizer\/)/, LANACION_BASE_URL)
        : '';

export const replaceUrlsByEnvironment = (articles = []) => {
    if (!Array.isArray(articles)) return [];

    return articles.map(art => {
        const basic = get(art, 'promo_items.basic', null);
        if (!basic) return art;

        const urlImage = get(basic, 'url', '');
        const resizedUrls = get(basic, 'resized_urls', []);

        return {
            ...art,
            promo_items: {
                ...art.promo_items,
                basic: {
                    ...basic,
                    url: replaceProductiveImgDomain(urlImage),
                    resized_urls: Array.isArray(resizedUrls)
                        ? resizedUrls.map(item => ({
                              ...item,
                              resizedUrl: replaceProductiveImgDomain(
                                  get(item, 'resizedUrl', '')
                              )
                          }))
                        : resizedUrls
                }
            }
        };
    });
};

export default replaceProductiveImgDomain;
