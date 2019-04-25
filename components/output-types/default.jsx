'use strict';

import React from 'react';

export default ({
    children,
    contextPath,
    deployment,
    CssLinks,
    Fusion,
    Libs,
    MetaTags
}) => (
    <html>
        <head>
            <title>Fusion Article</title>
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
        <body>
            <div id="fusion-app">{children}</div>
            <Fusion />
        </body>
    </html>
);
