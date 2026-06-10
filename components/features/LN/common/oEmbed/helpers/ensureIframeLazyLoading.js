import { EMBED_SUBTYPES_WITH_IFRAME, IFRAME_REGEX } from './constants';

const LOADING_ATTR_REGEX = /loading\s*=\s*["'][^"']*["']/i;

const ensureIframeLazyLoading = ({ subtype, tagHtml = '' }) => {
    const isSupportedEmbed = EMBED_SUBTYPES_WITH_IFRAME.includes(subtype);
    const hasIframe = IFRAME_REGEX.test(tagHtml);

    if (!isSupportedEmbed || !hasIframe) {
        return { __html: tagHtml };
    }

    if (LOADING_ATTR_REGEX.test(tagHtml)) {
        return {
            __html: tagHtml.replace(LOADING_ATTR_REGEX, 'loading="lazy"')
        };
    }

    return {
        __html: tagHtml.replace(/<iframe(\s+)/i, '<iframe loading="lazy"$1')
    };
};

export default ensureIframeLazyLoading;
