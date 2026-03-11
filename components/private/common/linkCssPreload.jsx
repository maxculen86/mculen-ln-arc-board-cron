import React from 'react';

function LinkCssPreload({ href, type = 'font/woff2' }) {
    return <link rel="preload" href={href} as="font" type={type} crossOrigin />;
}

export default LinkCssPreload;
