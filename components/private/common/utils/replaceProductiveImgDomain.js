import { API_ENV } from 'fusion:environment';
import { isEmptyString } from './dataValidation';
import get from './get';

const RESIZER_URL_PUBLIC_PROD = 'https://resizer.glanacion.com';

const replaceProductiveImgDomain = (url = '') =>
    !isEmptyString(url)
        ? url.replace(/^.*\/\/[^\\/]+/, RESIZER_URL_PUBLIC_PROD)
        : '';

export const replaceUrlsByEnvironment = (articles = []) => {
    if (['sandbox', 'dev'].includes(API_ENV)) {
        return (
            articles &&
            articles.map(art => {
                const urlImage = get(art, 'promo_items.basic.url', '');
                const resizedUrls = get(
                    art,
                    'promo_items.basic.resized_urls',
                    []
                );

                return {
                    ...art,
                    promo_items: {
                        basic: {
                            ...art.promo_items.basic,
                            url: replaceProductiveImgDomain(urlImage),
                            resized_urls: resizedUrls.map(item => ({
                                ...item,
                                resizedUrl: replaceProductiveImgDomain(
                                    get(item, 'resizedUrl', '')
                                )
                            }))
                        }
                    }
                };
            })
        );
    }

    return articles;
};

export default replaceProductiveImgDomain;
