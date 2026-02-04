import React from 'react';

function HeadingView({ tag: Tag, className, content }) {
    return <Tag className={className}>{content}</Tag>;
}

export default HeadingView;
