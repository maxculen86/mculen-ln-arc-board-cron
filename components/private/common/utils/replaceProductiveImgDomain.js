import { RESIZER_URL_PUBLIC, API_ENV } from 'fusion:environment';
import { isEmptyString } from './dataValidation';
import get from './get';

const replaceProductiveImgDomain = (url = '') =>
    !isEmptyString(url) ? url.replace(/^.*\/\/[^\/]+/, RESIZER_URL_PUBLIC) : '';

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
