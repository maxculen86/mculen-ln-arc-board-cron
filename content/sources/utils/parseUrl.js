const validationUrlRepeat = url => {
    const urlArray = url.split('/').filter(item => item !== '');
    return urlArray.some(
        (item, index, array) => !(array.indexOf(item) === index)
    );
};

const formatUrl = url => {
    const urlArray = url.split('/').filter(item => item !== '');
    if (url.includes('http')) {
        const [protocol, domain, section, noteUrl] = urlArray;
        return `${protocol}//${domain}/${section}/${noteUrl}/`;
    }
    const [section, path] = urlArray;
    return `/${section}/${path}/`;
};

const parseUrl = (url = 'https://www.lanacion.com.ar/') => {
    if (validationUrlRepeat(url)) {
        return formatUrl(url);
    }
    return url;
};

export default parseUrl;
