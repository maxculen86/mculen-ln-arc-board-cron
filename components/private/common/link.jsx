import React from 'react';
import PropTypes from 'prop-types';
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
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    mod: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};

Link.defaultProps = {
    href: '',
    text: '',
    target: undefined,
    title: '',
    mod: '',
    size: '',
    className: '',
    onClick: undefined
};

export default Link;
