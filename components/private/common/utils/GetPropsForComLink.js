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
    EXTRA_CLASS
) => {
    return {
        ...(link && { href: link }),
        ...(dataEvent && { 'data-event': dataEvent }),
        ...(dataSection && { 'data-section': dataSection }),
        // ...(link && !rel && { rel: target === '_blank' ? 'nofollow' : undefined }),
        ...(link && {
            rel:
                rel ||
                (target === '_blank' && !link.split('.').includes('lanacion')
                    ? 'nofollow'
                    : undefined)
        }),
        ...(link && { target }),
        ...(link && { title }),
        ...(isString && { dangerouslySetInnerHTML: { __html: children } }),
        ...(!isString && { children: children || textname }),
        ...(style && { style }),
        className: `com-${link ? 'link' : 'text'}${SIZE_CLASS}${EXTRA_CLASS}`
    };
};

export default generateProps;
