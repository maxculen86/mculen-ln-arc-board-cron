import logger from '../../../components/private/common/utils/logger';
import NotFoundError from './notFoundError';

const validationUrlRepeat = url => {
    const urlArray = url.split('/').filter(item => item !== '');
    return urlArray.some(
        (item, index, array) => !(array.indexOf(item) === index)
    );
};

const setLogger = (urlDuplicate, infoError, arcSite) => {
    const error = new NotFoundError(`URL duplicada: ${infoError}`);
    logger.push(
        error,
        {
            source: 'content/sources/liftigniterSource',
            url: urlDuplicate
        },
        arcSite,
        true
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

const parseUrl = (
    url = 'https://www.lanacion.com.ar/',
    infoError = '',
    arcSite = ''
) => {
    if (validationUrlRepeat(url)) {
        setLogger(url, infoError, arcSite);
        return formatUrl(url);
    }
    return url;
};

export default parseUrl;
