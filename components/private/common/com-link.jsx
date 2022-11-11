import React from 'react';
import PropTypes from 'prop-types';
import generateProps from './utils/GetPropsForComLink';
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
        rel,
        style,
        withSponsoredLink = false
    } = props;

    const classBuilder = builder => (builder ? ` ${builder}` : '');

    const isString = typeof children === 'string';
    const SIZE_CLASS = classBuilder(size);
    const EXTRA_CLASS = classBuilder(classCondition);
    // TODO: Evaluar si debe retornar un span cuando el componente no recibe link
    // TODO: Definir si el link debe ser una propiedad obligatoria
    const _props = generateProps(
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
        withSponsoredLink
    );

    const tag = link ? 'a' : 'span';

    return React.createElement(tag, { ..._props });
};

ComLink.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    link: PropTypes.string,
    textname: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    classCondition: PropTypes.string,
    size: PropTypes.string,
    style: PropTypes.string,
    dataSection: PropTypes.string,
    dataEvent: PropTypes.string,
    rel: PropTypes.string,
    withSponsoredLink: PropTypes.bool
};

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
    withSponsoredLink: false
};

export default ComLink;
