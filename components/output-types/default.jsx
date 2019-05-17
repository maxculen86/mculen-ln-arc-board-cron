import React from 'react';
import ScriptManager from '../private/common/scriptManager';

const getBodyClass = props => {
    const { className = {} } = props;
    if (className.body) return { className: className.body };

    return undefined;
};
const comscoreInfo = {
    insertComscoreHeadScript: siteProps => {
        const { comscoreId } = siteProps;
        if (comscoreId) {
            return (
                <>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `var _comscore = _comscore || [];
                            _comscore.push({ c1: "2", c2: "${comscoreId}" });
                            (function() {
                              var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                              s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
                              el.parentNode.insertBefore(s, el);
                            })();`
                        }}
                    />
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<img src="https://sb.scorecardresearch.com/p?c1=2&c2=${comscoreId}&cv=2.0&cj=1" />`
                        }}
                    />
                </>
            );
        }
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
}) => {
    const Scripts = ScriptManager(siteProperties.scripts);

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
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={deployment(`${contextPath}/resources/favicon.ico`)}
                />
                {comscoreInfo.insertComscoreHeadScript(siteProperties)}
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
