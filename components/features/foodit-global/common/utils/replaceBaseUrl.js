import { RESIZER_URL_PUBLIC, SITE_FOODIT } from 'fusion:environment';

const replaceBaseUrl = promoItem => {
    const { url = '', type, resized_urls: resizedUrls } = promoItem || {};

    if (type !== 'image') return promoItem;

    const replaceUrl = (_url = '') =>
        _url.replace(RESIZER_URL_PUBLIC, SITE_FOODIT);

    const transformResizedUrls = (resizedUrlsArray = []) =>
        resizedUrlsArray.map(item => ({
            ...item,
            resizedUrl: replaceUrl(item.resizedUrl)
        }));

    return {
        ...promoItem,
        url: replaceUrl(url),
        resized_urls: transformResizedUrls(resizedUrls)
    };
};

export default replaceBaseUrl;
