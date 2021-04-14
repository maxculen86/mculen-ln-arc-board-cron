/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-link.css';

const Link = ({
    children,
    href,
    text,
    target,
    title,
    mod,
    size,
    className,
    onClick
}) => {
    const _className = `com-${href ? 'link' : 'text'}${size ? ` ${size}` : ''}${
        mod ? ` ${mod}` : ''
    }${className ? ` ${className}` : ''}`;
    const content = children || text;

    return (
        <a
            className={_className}
            href={href}
            target={target}
            rel={target === '_blank' ? target : 'nonoopener noreferrer'}
            title={title || text}
            onClick={onClick}
        >
            {content}
        </a>
    );
};

Link.propTypes = {
    children: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    mod: PropTypes.string,
    size: PropTypes.string,
    item: PropTypes.element
};

export default Link;
