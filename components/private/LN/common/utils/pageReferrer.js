import isSSR from './isSSR';

const PAGE_REFERRER_PARAM = 'page_referrer';
const REFERRER_HOSTS = ['canchallena.lanacion.com.ar'];
const PAGE_REFERRER_SUFFIX = ':::ln-body';

const getWindowLocation = () => (!isSSR() ? window.location : undefined);
const sanitizePath = pathname =>
    pathname?.replace(/\/+$/, '').replace(/^\/+/, '') || '';

export const getArticlePath = (locationObj = getWindowLocation()) => {
    if (!locationObj?.pathname) return '';
    return sanitizePath(locationObj.pathname);
};

export const getUrlInstance = (baseOrigin, value = '') => {
    if (!value) return null;

    try {
        return new URL(value);
    } catch (error) {
        const origin = baseOrigin || getWindowLocation()?.origin;

        if (!origin) return null;

        try {
            return new URL(value, origin);
        } catch (err) {
            return null;
        }
    }
};

export const shouldDecorateHost = hostname => {
    if (!hostname) return false;

    const normalizedHost = hostname.toLowerCase();

    return REFERRER_HOSTS.some(host =>
        normalizedHost.endsWith(host.toLowerCase())
    );
};

export const appendPageReferrerParam = (
    link,
    { articlePath, baseOrigin } = {}
) => {
    if (!link) return link;

    const parsedUrl = getUrlInstance(baseOrigin, link);
    const currentArticlePath = articlePath || getArticlePath();

    if (!parsedUrl || !currentArticlePath) return link;

    if (!shouldDecorateHost(parsedUrl.hostname)) {
        return link;
    }

    const refValue = `${currentArticlePath}${PAGE_REFERRER_SUFFIX}`;

    parsedUrl.searchParams.set(PAGE_REFERRER_PARAM, refValue);

    return parsedUrl.toString();
};

export { PAGE_REFERRER_PARAM, PAGE_REFERRER_SUFFIX };
