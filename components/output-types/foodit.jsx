import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_FOODIT } from 'fusion:environment';
import CssLinksByArcSite from './Helper/cssLinksByArcSite';
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
    deployment,
    metaValue,
    isAdmin,
    template,
    requestUri = ''
} = {}) {
    const {
        node_type: nodeType,
        type,
        _id,
        canonical_url: canonicalUrl = '',
        headlines: { mobile, basic } = {},
        site = {}
    } = globalContent;
    const { layoutsName = {}, scripts: sitePropertiesScripts = [] } =
        siteProperties || {};

    const allowCommentsValidate = get(
        globalContent,
        'comments.display_comments',
        true
    );

    const _nodeType = getSectionName({ nodeType, type, arcSite });

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
                {isArcPreview && (
                    <meta name="robots" content="noindex, nofollow" />
                )}
                <meta name="theme-color" content="#ffffff" />
                <PreloadFooditImages
                    layout={layout}
                    renderables={renderables}
                    globalContent={globalContent}
                    isAdmin={isAdmin}
                />
                <MetaFoodit
                    metaValue={metaValue}
                    globalContent={globalContent}
                    contextPath={contextPath}
                    siteProperties={siteProperties}
                    deployment={deployment}
                />
                <FooditSchemas
                    metaValue={metaValue}
                    globalContent={globalContent}
                    layout={layout}
                    contextPath={contextPath}
                    deployment={deployment}
                />
                <LinkCanonicalAndAlternate
                    _id={_id}
                    canonicalUrl={canonicalUrl}
                    host={SITE_FOODIT}
                    nodeType={_nodeType}
                    site={site}
                    template={template}
                />
                <GetFonts
                    contextPath={contextPath}
                    deployment={deployment}
                    arcSite={arcSite}
                />
                <CssLinksByArcSite />
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
                <Favicon contextPath={contextPath} deployment={deployment} />
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

Foodit.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    Libs: PropTypes.node.isRequired,
    Fusion: PropTypes.node.isRequired,
    layout: PropTypes.string.isRequired,
    renderables: PropTypes.arrayOf(PropTypes.any).isRequired,
    globalContent: PropTypes.objectOf(PropTypes.any).isRequired,
    siteProperties: PropTypes.isRequired,
    arcSite: PropTypes.string.isRequired,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired,
    metaValue: PropTypes.func.isRequired,
    isAdmin: PropTypes.boolean.isRequired,
    template: PropTypes.string.isRequired,
    requestUri: PropTypes.string.isRequired
};
export default Foodit;
