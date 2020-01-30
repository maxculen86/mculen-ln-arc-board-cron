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

export default { getParameterByName };
