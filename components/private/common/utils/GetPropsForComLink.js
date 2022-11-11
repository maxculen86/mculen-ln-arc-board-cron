const setNofollow = (link, rel, withSponsoredLink, target) => {
    if (link) {
        return {
            rel:
                rel ||
                (target === '_blank' &&
                !link.split('.').includes('lanacion') &&
                !withSponsoredLink
                    ? 'nofollow'
                    : undefined)
        };
    }
};

const generateProps = (
    link,
    dataEvent,
    dataSection,
    rel,
    target,
    title,
    textname,
    isString,
    children,
    style,
    SIZE_CLASS,
    EXTRA_CLASS,
    withSponsoredLink = false
) => {
    return {
        ...(link && { href: link }),
        ...(dataEvent && { 'data-event': dataEvent }),
        ...(dataSection && { 'data-section': dataSection }),
        // ...(link && !rel && { rel: target === '_blank' ? 'nofollow' : undefined }),
        ...setNofollow(link, rel, withSponsoredLink, target),
        ...(link && { target }),
        ...(link && { title }),
        ...(isString && { dangerouslySetInnerHTML: { __html: children } }),
        ...(!isString && { children: children || textname }),
        ...(style && { style }),
        className: `com-${link ? 'link' : 'text'}${SIZE_CLASS}${EXTRA_CLASS}`
    };
};

export default generateProps;
