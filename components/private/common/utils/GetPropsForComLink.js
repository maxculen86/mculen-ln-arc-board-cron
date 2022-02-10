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
    console.log(
        '🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ EXTRA_CLASS',
        EXTRA_CLASS
    );
    console.log(
        '🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ SIZE_CLASS',
        SIZE_CLASS
    );
    console.log('🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ style', style);
    console.log(
        '🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ children',
        children
    );
    console.log(
        '🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ isString',
        isString
    );
    console.log(
        '🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ textname',
        textname
    );
    console.log('🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ title', title);
    console.log('🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ target', target);
    console.log('🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ rel', rel);
    console.log(
        '🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ dataSection',
        dataSection
    );
    console.log(
        '🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ dataEvent',
        dataEvent
    );
    console.log('🚀 ~ file: GetPropsForComLink.js ~ line 15 ~ link', link);
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
