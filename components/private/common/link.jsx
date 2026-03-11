import React from 'react';
import setClassName from './utils/setClassName';
import '../../../resources/dist/css/ln/components/com-link.css';

function Link({
    children,
    href = '',
    text,
    target,
    title,
    mod = '',
    size = '',
    className = '',
    id,
    rel,
    onClick
}) {
    const _className = setClassName({
        baseClass: `com-${href ? 'link' : 'text'}`,
        size,
        mod,
        className
    });
    const content = children || text;

    return (
        <a
            className={_className}
            id={id}
            href={href}
            target={target}
            rel={rel || (target === '_blank' ? 'nofollow' : undefined)}
            title={title || text}
            onClick={onClick}
        >
            {content}
        </a>
    );
}

export default Link;
