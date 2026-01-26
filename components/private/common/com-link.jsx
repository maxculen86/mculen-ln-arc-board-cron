import React from 'react';
import generateProps from '../../features/LN/common/link/_helpers';

function ComLink(props) {
    const {
        children,
        dataEvent,
        dataSection,
        link,
        textname,
        target,
        title,
        classCondition,
        size,
        rel,
        style,
        marfeelTrack,
        bodyLinkType,
        withSponsoredLink = false
    } = props;

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

ComLink.defaultProps = {
    textname: '',
    title: '',
    target: undefined,
    classCondition: '',
    size: '',
    style: '',
    dataSection: '',
    dataEvent: '',
    link: null,
    rel: undefined,
    withSponsoredLink: false,
    marfeelTrack: false,
    bodyLinkType: ''
};

export default ComLink;
