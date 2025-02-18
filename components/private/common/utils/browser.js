import get from './get';

const infoErrorUrl = 'El parametro de Url es obligatorio en SSR';

const getParameterByName = (parameter, urlP) => {
    let url = urlP;
    if (!url) {
        if (typeof window === 'undefined') throw new Error(infoErrorUrl);
        url = window.location.href;
    }
    // eslint-disable-next-line no-useless-escape
    const name = parameter && parameter.replace(/[\[\]]/g, '\\$&');

    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

// Utilizado en las apis para extraer parametros de la url
const getParamFrom = (urlSectionName, paramName, requestUri) => {
    const regex = new RegExp(
        `/${urlSectionName}(.*;|=)${paramName}:([0-9a-zA-Z]+)[;|/]`
    );
    const result = regex.exec(requestUri);
    if (!result) return null;
    if (!result[2]) return null;

    return result[2];
};

const getSizesFrom = (
    isAdmin,
    value,
    urlSectionName,
    paramName,
    requestUri
) => {
    if (isAdmin) return value;
    return Number.parseInt(
        getParamFrom(urlSectionName, paramName, requestUri),
        10
    );
};

const isApiMobileRequest = url => {
    if (!url) {
        return false;
    }

    const apiRegex = /\/(api\/mobile)\//;
    return apiRegex.test(url);
};

const isApiRequest = url => {
    if (!url) {
        return false;
    }

    const apiRegex = /\/api\//;
    return apiRegex.test(url);
};

const getApiVersion = urlP => {
    let url = urlP;
    if (!url) {
        if (typeof window === 'undefined') throw new Error(infoErrorUrl);
        url = window.location.href;
    }

    const versionRegex = /\/api\/(?:mobile\/)?v([0-9]+)\//;
    const regexResult = versionRegex.exec(url);

    return regexResult ? regexResult[1] : null;
};

const getApiType = urlP => {
    let url = urlP;

    if (!url) {
        if (typeof window === 'undefined') throw new Error(infoErrorUrl);
        url = window.location.href;
    }

    const versionRegex = /\/api\/(?:(mobile)\/)?v([0-9]+)\//;
    const regexResult = versionRegex.exec(url);

    return get(regexResult, '[1]', 'global');
};

export default {
    getParameterByName,
    getApiVersion,
    getApiType,
    getParamFrom,
    getSizesFrom,
    isApiRequest,
    isApiMobileRequest
};
