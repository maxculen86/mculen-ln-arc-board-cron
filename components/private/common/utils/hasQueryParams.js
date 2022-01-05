// Importante: debe recibir una URL completa
const hasQueryParams = (siteUrl, nameQueryParam) => {
    const url = new URL(siteUrl) || {};
    const urlParams = new URLSearchParams(url.search) || {};
    return urlParams.get(nameQueryParam) || '';
};

export default hasQueryParams;
