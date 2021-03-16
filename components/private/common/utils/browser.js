const getParameterByName = (parameter, urlP) => {
    let url = urlP;
    if (!url) {
        if (typeof window === 'undefined')
            throw new Error('El parametro de Url es obligatorio en SSR');
        url = window.location.href;
    }
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

const getApiVersion = urlP => {
    let url = urlP;
    if (!url) {
        if (typeof window === 'undefined')
            throw new Error('El parametro de Url es obligatorio en SSR');
        url = window.location.href;
    }

    const versionRegex = new RegExp('/api/v([0-9]+)/');
    const regexResult = versionRegex.exec(url);
    return regexResult[1];
};

export default {
    getParameterByName,
    getApiVersion,
    getParamFrom,
    getSizesFrom
};
