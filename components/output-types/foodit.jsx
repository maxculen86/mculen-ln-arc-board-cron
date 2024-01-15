import React from 'react';
import CriticalCSS from '../features/foodit-global/common/CriticalCss/foodit';
import CssLinksByArcSite from './Helper/cssLinksByArcSite';
import PreloadFooditImages from '../features/foodit-global/common/image/preloadImage/foodit';
import buildScriptComponent from '../private/LN/common/utils/scriptsHelper';
import TagsLoadingList from '../private/common/scriptManager/tagsLoadingList';
import getSectionName from '../private/LN/common/utils/getSectionName';

// TODO: OutputType base, queda pendiente agregar manejo de metadatos
const Foodit = ({
    children,
    Libs,
    Fusion,
    layout = '',
    renderables,
    globalContent = {},
    siteProperties,
    arcSite,
    isAdmin
} = {}) => {
    const { node_type: nodeType, type } = globalContent;

    const _nodeType = getSectionName({ nodeType, type, arcSite });

    // TODO: validar cuales scripts se deben cargar y verificar el correcto comportamiento de estos
    const Scripts = buildScriptComponent(
        renderables,
        siteProperties.scripts,
        globalContent
    );

    return (
        <html lang="es">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0,minimum-scale=0.5,maximum-scale=5.0,user-scalable=yes"
                />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="theme-color" content="#ffffff" />
                <title>Foodit</title>
                <link rel="manifest" href="/manifest.json" />
                <PreloadFooditImages
                    layout={layout}
                    renderables={renderables}
                    globalContent={globalContent}
                    isAdmin={isAdmin}
                />
                <CriticalCSS />
                <CssLinksByArcSite />
                <Scripts location="head" />
            </head>
            <body>
                <Scripts location="body-top" />
                <TagsLoadingList
                    section={_nodeType}
                    location="body-top"
                    arcSite={arcSite}
                    Tag="script"
                    globalContent={globalContent}
                />
                <div id="fusion-app">{children}</div>
                <Fusion hydrateOnly />
                <Libs />
                <Scripts location="body-bottom" />
                <TagsLoadingList
                    section={_nodeType}
                    location="body-bottom"
                    arcSite={arcSite}
                    Tag="script"
                    globalContent={globalContent}
                />
            </body>
        </html>
    );
};

export default Foodit;
