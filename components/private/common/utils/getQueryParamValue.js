import { SITE_LANACION } from 'fusion:environment';
// Importante: debe recibir una URL completa
const getQueryParamValue = (siteUrl = SITE_LANACION, nameQueryParam) => {
    const url = new URL(siteUrl);
    const urlParams = new URLSearchParams(url.search) || {};

    if (nameQueryParam === 'adstest') {
        return urlParams.get(nameQueryParam) === 'true' ? 'true' : 'false';
    }
    return urlParams.get(nameQueryParam) || '';
};

export default getQueryParamValue;
