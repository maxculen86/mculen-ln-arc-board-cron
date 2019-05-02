'use strict';

import React from 'react';

const getBodyClass = props => {
    const { className = {} } = props;
    if (className.body) return { className: className.body };

    return undefined;
};

export default ({
    children,
    contextPath,
    deployment,
    CssLinks,
    Fusion,
    Libs,
    MetaTags,
    metaValue,
    siteProperties
}) => (
    <html>
        <head>
            <title>
                {metaValue('title') || siteProperties.title || 'LA NACION'}
            </title>
            <MetaTags />
            <Libs />
            <CssLinks />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link
                rel="icon"
                type="image/x-icon"
                href={deployment(`${contextPath}/resources/favicon.ico`)}
            />
        </head>
        <body {...getBodyClass(siteProperties)}>
            <div id="fusion-app">{children}</div>
            <Fusion />
        </body>
    </html>
);
