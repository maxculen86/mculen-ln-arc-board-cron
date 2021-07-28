import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/components/com-link.css';
import '../../../resources/dist/css/ln/components/com-text.css';

const ComLink = props => {
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
        style
    } = props;

    const isString = typeof children === 'string';
    const SIZE_CLASS = size ? ` ${size}` : '';
    const EXTRA_CLASS = classCondition ? ` ${classCondition}` : '';
    // TODO: Evaluar si debe retornar un span cuando el componente no recibe link
    // TODO: Definir si el link debe ser una propiedad obligatoria
    const _props = {
        ...(link && { href: link }),
        ...(dataEvent && { 'data-event': dataEvent }),
        ...(dataSection && { 'data-section': dataSection }),
        ...(link && { rel: target === '_blank' ? 'nofollow' : undefined }),
        ...(link && { target }),
        ...(link && { title }),
        ...(isString && { dangerouslySetInnerHTML: { __html: children } }),
        ...(!isString && { children: children || textname }),
        ...(style && { style }),
        className: `com-${link ? 'link' : 'text'}${SIZE_CLASS}${EXTRA_CLASS}`
    };

    const tag = link ? 'a' : 'span';

    return React.createElement(tag, { ..._props });
};

ComLink.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    link: PropTypes.string.isRequired,
    textname: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    classCondition: PropTypes.string,
    size: PropTypes.string,
    style: PropTypes.string,
    dataSection: PropTypes.string,
    dataEvent: PropTypes.string
};

ComLink.defaultProps = {
    textname: '',
    title: '',
    classCondition: '',
    size: '',
    style: '',
    dataSection: '',
    dataEvent: ''
};

export default ComLink;
