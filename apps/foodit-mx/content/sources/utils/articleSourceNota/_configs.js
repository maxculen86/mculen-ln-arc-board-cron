// Trim deliberado (fase 6, content-source-migration): en el monolito este archivo también exporta
// configPromoItems/configCallbackContentElements/configCallbacksRelatedContent/getMalformedAnchorTags
// (usados solo por el `transform` no-Foodit de `_helper.js`, ya eliminado) y arrastraba
// gallerySource/pageReferrer/textTransformHelpers-LN. Foodit solo necesita estas 2 funciones puras
// (sin dependencias) — las consume `fooditSources/fooditArticleSource/_configs.js`.
export const removeErrosInterstitialLink = (url = '') => {
    const errors =
        (!new RegExp(
            // Este regex es un formato de URL valido. Si no entra aca, significa que la url no tiene errores.
            '^(http|https|:\\/\\/|\\.|@){2,}(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\S*:\\w*@)*([a-zA-Z]|(\\d{1,3}|\\.){7}){1,}' +
                '(\\w|\\.{2,}|\\.[a-zA-Z]{2,3}|\\/|\\?|&|:\\d|@|=|\\/|\\(.*\\)|#|-|%)*$',
            'gim'
        ).test(url) && [url]) ||
        [];

    if (!errors.length) {
        return url;
    }

    return '';
};

export const addHttpsInterstitialLink = url => {
    if (typeof url === 'string') {
        return url.replace(/^(http):\/\/|^\/\//, 'https://');
    }
    return url;
};
