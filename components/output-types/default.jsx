import React from 'react';
import ScriptManager from '../private/common/scriptManager';
import GTM from '../private/common/scriptManager/googleTagManager';
import Comscore from '../private/common/scriptManager/comscore';
import Microdata from '../private/common/scriptManager/microdata';
import PostBid from '../private/common/scriptManager/postbid';
import ArcAds from '../private/common/scriptManager/arcAds';

const scriptList = { GTM, Comscore, Microdata, ArcAds, PostBid };

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
}) => {
    const Scripts = ScriptManager(scriptList, siteProperties.scripts);

    return (
        <html lang="es">
            <head>
                <title>
                    {metaValue('title') || siteProperties.title || 'LA NACION'}
                </title>
                <Scripts location="head" />
                <MetaTags />
                <Libs />
                <CssLinks />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={deployment(`${contextPath}/resources/favicon.ico`)}
                />
                {/* <Scripts name="Microdata" /> */}
            </head>
            <body {...getBodyClass(siteProperties)}>
                <Scripts location="body-top" />
                <div id="fusion-app">{children}</div>
                <Fusion />
                <Scripts location="body-bottom" />
            </body>
        </html>
    );
};
