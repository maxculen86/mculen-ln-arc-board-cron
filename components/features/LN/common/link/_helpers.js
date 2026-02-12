const setNofollow = (url, rel, withSponsoredLink, target) => {
    if (url) {
        return {
            rel:
                rel ||
                (target === '_blank' &&
                !url.split('.').includes('lanacion') &&
                !withSponsoredLink
                    ? 'nofollow'
                    : undefined)
        };
    }
    return {};
};

const generateProps = (config = {}) => {
    const {
        url,
        href,
        dataEvent,
        dataSection,
        rel,
        target,
        title,
        textname,
        isString,
        children,
        style,
        sizeClass = '',
        extraClass = '',
        withSponsoredLink,
        marfeelTrack,
        bodyLinkType
    } = config;

    const finalUrl = url || href;

    return {
        ...(finalUrl && { href: finalUrl }),
        ...(dataEvent && { 'data-event': dataEvent }),
        ...(dataSection && { 'data-section': dataSection }),
        ...setNofollow(finalUrl, rel, withSponsoredLink, target),
        ...(finalUrl && { target }),
        ...(finalUrl && { title }),
        ...(isString && { dangerouslySetInnerHTML: { __html: children } }),
        ...(!isString && { children: children || textname }),
        ...(style && { style }),
        className: `com-${finalUrl ? 'link' : 'text'}${sizeClass}${extraClass}`,
        ...(marfeelTrack && {
            'data-mrf-recirculation':
                bodyLinkType === 'intersitial'
                    ? 'n_interstitial'
                    : 'n_link_parrafo'
        })
    };
};

export default generateProps;
