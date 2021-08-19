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
    id,
    onClick
}) => {
    const _className = `com-${href ? 'link' : 'text'}${size ? ` ${size}` : ''}${
        mod ? ` ${mod}` : ''
    }${className ? ` ${className}` : ''}`;
    const content = children || text;

    return (
        <a
            className={_className}
            id={id}
            href={href}
            target={target}
            rel={target === '_blank' ? 'nofollow' : undefined}
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
    id: PropTypes.string,
    onClick: PropTypes.func
};

Link.defaultProps = {
    href: '',
    text: undefined,
    target: undefined,
    title: undefined,
    mod: '',
    size: '',
    className: '',
    id: undefined,
    onClick: undefined
};

export default Link;
