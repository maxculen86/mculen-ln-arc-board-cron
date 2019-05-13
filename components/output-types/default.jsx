'use strict';

import React from 'react';

const getBodyClass = props => {
    const { className = {} } = props;
    if (className.body) return { className: className.body };

    return undefined;
};

const tagManagerInfo = {
    insertTagManagerHeadScript: siteProps => {
        const { tagManagerId } = siteProps;
        if (tagManagerId)
            return (
                tagManagerId && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${tagManagerId}')`
                        }}
                    />
                )
            );
    },
    insertTagManagerBodyScript: siteProps => {
        const { tagManagerId } = siteProps;
        if (tagManagerId)
            return (
                tagManagerId && (
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${tagManagerId}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
                        }}
                    />
                )
            );
    }
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
            {tagManagerInfo.insertTagManagerHeadScript(siteProperties)}
        </head>
        <body {...getBodyClass(siteProperties)}>
            {tagManagerInfo.insertTagManagerBodyScript(siteProperties)}
            <div id="fusion-app">{children}</div>
            <Fusion />
        </body>
    </html>
);
