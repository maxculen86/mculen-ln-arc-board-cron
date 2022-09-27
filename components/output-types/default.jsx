/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ScriptLogoBBC from '../private/common/scriptManager/scriptLogoBBC';
import ScriptVideoPowaHome from '../private/common/scriptManager/scriptVideoPowaHome';
import MetasOG from '../private/common/metaTags/metasOG';
import TagsLoadingList from '../private/common/scriptManager/tagsLoadingList';
import Schemas from '../private/common/scriptManager/schemas';
import DataLayerIndex from '../private/common/dataLayerIndex';
import paths from '../../config/paths';
import SnippetIndex from '../private/common/snippet';
import MetaTitle from '../private/common/metaTitle';
import MetaDescription from '../private/common/metaDescription';
import MetaSectionParsely from '../private/common/metaSectionParsely';
import MetasFBNews from '../private/common/metaTags/metasFBNews';
import getSectionName from '../private/LN/common/utils/getSectionName';
import Syndication from '../private/common/syndication';
import LinkAmpHTML from '../private/common/linkAmpHTML';
import GetDataToLinkImage from '../private/common/utils/image/getDataToLinkImage';
import ScriptLogoEvent from '../private/common/scriptManager/scriptLogoEvent';
import addForwardSlash from '../private/LN/common/utils/addForwardSlash';
import setMetasOtt from '../private/common/metaTags/setMetasHelper';
import CriticalCss from '../private/common/criticalcss';
import MetaViafoura from '../private/common/metaViafoura';
import Favicon from '../private/common/favicon';
import {
    getTitle,
    getMetaDescriptionDefault,
    metasFromSiteServices
} from '../private/common/utils/outputTypeHelper';
import FontPreloads from '../private/common/fontsPreloads';
import buildScriptComponent from '../private/LN/common/utils/scriptsHelper';
import get from '../private/common/utils/get';

const getBodyClass = props => {
    const { className = {} } = props;
    if (className.body) return { className: className.body };

    return undefined;
};
const pathCss = `${paths.outputPath.base}/${paths.outputPath.css}`;

const Default = props => {
    const {
        arcSite,
        children,
        contextPath,
        deployment,
        CssLinks,
        Fusion,
        Libs,
        metaValue,
        layout = '',
        siteProperties,
        renderables,
        globalContent,
        outputType,
        isAdmin,
        requestUri
    } = props;

    const {
        canonical_url: canonicalUrl,
        headlines,
        description,
        type,
        subtype,
        subheadlines = {},
        syndication,
        distributor = { name: 'LA NACION' },
        node_type: nodeType,
        name,
        Payload,
        _id,
        taxonomy,
        first_publish_date: firstPublishDate,
        acumuladoGeneral: { metas } = {},
        website_url: websiteUrl
    } = globalContent || {};

    const { meta_title: metaTitle, basic: basicTitle } = headlines || {};
    const { basic: descriptionBasic } = description || {};
    const { name: distributorName } = distributor || {};
    const { description: defaultDescription } = siteProperties;

    const metaTitleBasic = metaTitle || basicTitle;

    const _nodeType = getSectionName({ nodeType, type, arcSite });
    const title = getTitle(
        metaValue('title'),
        siteProperties,
        requestUri,
        _nodeType,
        renderables
    );

    const {
        title: ottMetaTitle,
        description: ottMetaDescription
    } = setMetasOtt({
        date: firstPublishDate,
        acumulado: name,
        title: metaTitleBasic,
        section: _nodeType,
        siteProperties
    });

    const Scripts = buildScriptComponent(
        renderables,
        siteProperties.scripts,
        globalContent
    );

    const metaDescription = getMetaDescriptionDefault(
        metaValue('description'),
        layout,
        defaultDescription,
        _nodeType,
        _id,
        Payload,
        nodeType,
        name,
        arcSite,
        requestUri
    );

    const configHydrate = {};
    if (layout === get(siteProperties, 'layoutsName.Home'))
        configHydrate.hydrateOnly = true;

    return (
        <html lang="es">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0,minimum-scale=0.5,maximum-scale=5.0,user-scalable=yes"
                />
                <meta name="theme-color" content="#ffffff" />
                {layout !== 'LN-buscador' && (
                    <title>{arcSite === 'ott' ? ottMetaTitle : title}</title>
                )}
                {metasFromSiteServices(metas)}
                <GetDataToLinkImage
                    data={globalContent}
                    section={_nodeType}
                    renderables={renderables}
                    arcSite={arcSite}
                    isAdmin={isAdmin}
                />
                <CriticalCss />
                <FontPreloads />
                {arcSite === 'ott' ? (
                    <link
                        rel="stylesheet"
                        href={deployment(
                            `${contextPath}${pathCss}/${arcSite}/style.css`
                        )}
                    />
                ) : (
                    <CssLinks />
                )}
                <link
                    rel="preload"
                    as="script"
                    href={`${deployment(
                        `${contextPath}/dist/engine/react.js`
                    )}`}
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    as="script"
                    href={`${deployment(
                        `${contextPath}/dist/components/combinations/default.js`
                    )}`}
                    crossOrigin=""
                />
                <Libs />
                <TagsLoadingList
                    section="all"
                    location="head"
                    arcSite={arcSite}
                    Tag="link"
                />
                {/*
                    TODO: Evitar desacomplamiento de componentes:
                    DataLayerIndex
                    SnippetIndex
                    MetaectionParsely
                    en relación
                    ScriptsManager
                 */}
                <DataLayerIndex {...props} />
                <SnippetIndex {...props} />
                <MetaSectionParsely
                    taxonomy={taxonomy}
                    arcSite={arcSite}
                    subtype={subtype}
                />
                <Scripts location="head" {...props} />
                <TagsLoadingList
                    section={_nodeType}
                    location="head"
                    arcSite={arcSite}
                    Tag="script"
                    globalContent={globalContent}
                />
                {layout !== 'LN-buscador' && (
                    <MetasOG
                        {...props}
                        section={_nodeType}
                        title={title}
                        metaDescription={metaDescription}
                        ottMetaTitle={ottMetaTitle}
                        ottMetaDescription={ottMetaDescription}
                    />
                )}
                {canonicalUrl && siteProperties.host && (
                    <link
                        rel="canonical"
                        href={addForwardSlash(
                            `${siteProperties.host}${canonicalUrl}`
                        )}
                    />
                )}
                <LinkAmpHTML
                    canonicalUrl={canonicalUrl || websiteUrl}
                    subtype={subtype}
                />
                {layout !== 'LN-buscador' && (
                    <MetaTitle
                        arcSite={arcSite}
                        title={title}
                        defaultTitle={siteProperties.longTitle}
                        nodeType={nodeType}
                        section={_nodeType}
                        metaValue={title}
                        ottMetaTitle={ottMetaTitle}
                        requestUri={requestUri}
                    />
                )}
                {layout !== 'LN-buscador' && (
                    <MetaDescription
                        subtype={subtype}
                        nodeType={nodeType}
                        _id={_id}
                        description={descriptionBasic}
                        metaTitleBasic={metaTitleBasic}
                        subheadlines={subheadlines && subheadlines.basic}
                        acumulado={name}
                        arcSite={arcSite}
                        section={_nodeType}
                        metaDescription={metaDescription}
                        ottMetaDescription={ottMetaDescription}
                    />
                )}
                <MetaViafoura {...props} />
                <Syndication
                    type={type}
                    arcSite={arcSite}
                    subtype={subtype}
                    syndication={syndication}
                    outputType={outputType}
                />
                <Schemas section={_nodeType} />
                <Favicon />
                <link rel="manifest" href="/manifest.json" />
                <MetasFBNews
                    nodeType={_nodeType}
                    sections={taxonomy && taxonomy.sections}
                />
                <ScriptVideoPowaHome
                    renderables={renderables}
                    section={_nodeType}
                />
            </head>
            <body {...getBodyClass(siteProperties)}>
                <Scripts location="body-top" />
                <TagsLoadingList
                    section={_nodeType}
                    location="body-top"
                    arcSite={arcSite}
                    Tag="script"
                    globalContent={globalContent}
                />
                <div id="fusion-app">{children}</div>
                <Fusion {...configHydrate} />
                <Scripts
                    location="body-bottom"
                    section={_nodeType}
                    {...props}
                />
                <TagsLoadingList
                    section={_nodeType}
                    location="body-bottom"
                    arcSite={arcSite}
                    Tag="script"
                    globalContent={globalContent}
                />
                <ScriptLogoBBC distributorName={distributorName} />
                <ScriptLogoEvent />
            </body>
        </html>
    );
};

Default.propTypes = {
    arcSite: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired,
    CssLinks: PropTypes.func.isRequired,
    Fusion: PropTypes.node.isRequired,
    Libs: PropTypes.node.isRequired,
    metaValue: PropTypes.func.isRequired,
    renderables: PropTypes.arrayOf(PropTypes.any).isRequired,
    globalContent: PropTypes.objectOf(PropTypes.any).isRequired,
    outputType: PropTypes.string.isRequired,
    siteProperties: PropTypes.isRequired,
    layout: PropTypes.string.isRequired,
    requestUri: PropTypes.string.isRequired,
    isAdmin: PropTypes.boolean.isRequired
};

export default Default;
