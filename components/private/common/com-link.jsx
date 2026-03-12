import React from 'react';
import generateProps from '../../features/LN/common/link/_helpers';

function ComLink({
    children,
    dataEvent = '',
    dataSection = '',
    link = null,
    textname = '',
    target,
    title = '',
    classCondition = '',
    size = '',
    rel,
    style = '',
    marfeelTrack = false,
    bodyLinkType = '',
    withSponsoredLink = false
}) {
    const classBuilder = builder => (builder ? ` ${builder}` : '');

    const isString = typeof children === 'string';
    const SIZE_CLASS = classBuilder(size);
    const EXTRA_CLASS = classBuilder(classCondition);
    // TODO: Evaluar si debe retornar un span cuando el componente no recibe link
    // TODO: Definir si el link debe ser una propiedad obligatoria
    const _props = generateProps({
        url: link,
        dataEvent,
        dataSection,
        rel,
        target,
        title,
        textname,
        isString,
        children,
        style,
        sizeClass: SIZE_CLASS,
        extraClass: EXTRA_CLASS,
        withSponsoredLink,
        marfeelTrack,
        bodyLinkType
    });

    const tag = link ? 'a' : 'span';

    return React.createElement(tag, { ..._props });
}

export default ComLink;
