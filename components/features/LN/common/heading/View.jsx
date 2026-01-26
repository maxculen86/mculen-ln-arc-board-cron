import React from 'react';
import Link from '../../../ui/ln/link/default';

function HeadingView({ tag: Tag, className, content, linkProps }) {
    return (
        <Tag className={className}>
            {linkProps ? <Link {...linkProps}>{content}</Link> : content}
        </Tag>
    );
}

export default HeadingView;
