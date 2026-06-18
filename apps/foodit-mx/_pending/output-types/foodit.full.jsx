import React from 'react';
import PreloadFooditImages from '../features/foodit-global/common/image/preloadImage/foodit';
import buildScriptComponent from '../private/LN/common/utils/scriptsHelper';
import TagsLoadingList from '../private/common/scriptManager/tagsLoadingList';
import DataLayerIndex from '../private/common/dataLayerIndex';
import getSectionName from '../private/LN/common/utils/getSectionName';
import { MetaFoodit } from '../features/foodit-global/common/MetaFoodit/foodit';
import { BuildComments } from '../features/foodit-global/common/MetaCommentsViafoura/foodit';
import { Favicon } from '../features/foodit-global/common/favicon/foodit';
import { GetFonts } from './criticalCss/getFonts';
import LinkCanonicalAndAlternate from '../private/common/linkCanonical';
import get from '../private/common/utils/get';
import FooditSchemas from '../features/foodit-global/schemas/foodit';
import { FontPreload } from './fontPreload/foodit';
import { GetCriticalCss } from './criticalCss/foodit';
import Syndication from '../private/common/syndication';

function Foodit({
    children,
    Libs,
    Fusion,
    layout = '',
    renderables,
    globalContent = {},
    siteProperties,
    arcSite,
    contextPath,
    pagebuilderURL,
    metaValue,
    isAdmin,
    template,
    requestUri = '',
    Resource,
    outputType
} = {}) {
    const {
        node_type: nodeType,
        type,
        _id,
        canonical_url: canonicalUrl = '',
        headlines: { mobile, basic } = {},
        site = {},
        syndication,
        subtype
    } = globalContent;
    const { layoutsName = {}, scripts: sitePropertiesScripts = [] } =
        siteProperties || {};

    const allowCommentsValidate = get(
        globalContent,
        'comments.display_comments',
        true
    );

    const _nodeType = getSectionName({ nodeType, type });

    const isArcPreview = isAdmin || requestUri.includes('preview-arc');

    const Scripts = buildScriptComponent({
        renderables,
        sitePropertiesScripts,
        globalContent,
        isArcPreview
    });

    return (
        <html lang="es">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0,minimum-scale=0.5,maximum-scale=5.0,user-scalable=yes"
                />
                <link
                    rel="manifest"
                    href={pagebuilderURL(
                        `${contextPath}/resources/json/foodit/manifest.json`
                    )}
                />

                {isArcPreview && (
                    <meta name="robots" content="noindex, nofollow" />
                )}
                <meta name="theme-color" content="#ffffff" />
                <PreloadFooditImages
                    layout={layout}
                    renderables={renderables}
                    globalContent={globalContent}
                    isAdmin={isAdmin}
                    contextPath={contextPath}
                    pagebuilderURL={pagebuilderURL}
                />
                <FontPreload
                    pagebuilderURL={pagebuilderURL}
                    contextPath={contextPath}
                />
                <MetaFoodit
                    metaValue={metaValue}
                    globalContent={globalContent}
                    contextPath={contextPath}
                    siteProperties={siteProperties}
                    pagebuilderURL={pagebuilderURL}
                />
                <FooditSchemas
                    metaValue={metaValue}
                    globalContent={globalContent}
                    layout={layout}
                    contextPath={contextPath}
                    pagebuilderURL={pagebuilderURL}
                />
                <LinkCanonicalAndAlternate
                    _id={_id}
                    canonicalUrl={canonicalUrl}
                    arcSite={arcSite}
                    nodeType={_nodeType}
                    site={site}
                    template={template}
                    requestUri={requestUri}
                />
                <GetFonts
                    contextPath={contextPath}
                    pagebuilderURL={pagebuilderURL}
                    arcSite={arcSite}
                />
                <GetCriticalCss
                    Resource={Resource}
                    layout={layout}
                    globalContent={globalContent}
                />
                <Syndication
                    type={type}
                    arcSite={arcSite}
                    subtype={subtype}
                    syndication={syndication}
                    outputType={outputType}
                />
                <Scripts location="head" />
                <BuildComments
                    _id={_id}
                    layout={layout}
                    canonicalUrl={canonicalUrl}
                    mobile={mobile}
                    basic={basic}
                    allowComments={allowCommentsValidate}
                    layoutsName={layoutsName}
                />
                <Favicon
                    contextPath={contextPath}
                    pagebuilderURL={pagebuilderURL}
                />
            </head>
            <body>
                <DataLayerIndex
                    arcSite={arcSite}
                    layout={layout}
                    globalContent={globalContent}
                />
                <Scripts location="body-top" />
                <TagsLoadingList
                    section={_nodeType}
                    location="body-top"
                    arcSite={arcSite}
                    Tag="script"
                    globalContent={globalContent}
                />
                <div id="fusion-app">{children}</div>
                <Fusion />
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
}

export default Foodit;
