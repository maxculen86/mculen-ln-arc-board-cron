import React from 'react';

function ComSource(props) {
    const { media, srcset, src, type } = props;
    return <source media={media} srcSet={srcset} src={src} type={type} />;
}

export default ComSource;
