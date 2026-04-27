import React from 'react';
import ScriptLogoBBC from '../private/common/scriptManager/scriptLogoBBC';
import MetasOG from '../private/common/metaTags/metasOG';
import TagsLoadingList from '../private/common/scriptManager/tagsLoadingList';
import Schemas from '../private/common/scriptManager/schemas';
import EconomicIndicesSchema, {
    isEconomicIndicesHome,
    isEconomicIndicesPage,
    EconomicIndicesDetailSchema
} from '../private/common/scriptManager/economicIndicesSchema';
import DataLayerIndex from '../private/common/dataLayerIndex';
import SnippetIndex from '../private/common/snippet';
import MetaTitle from '../private/common/metaTitle';
import MetaDescription from '../private/common/metaDescription';
import MetasFBNews from '../private/common/metaTags/metasFBNews';
import getSectionName from '../private/LN/common/utils/getSectionName';
import Syndication from '../private/common/syndication';
import LinkCanonicalAndAlternate from '../private/common/linkCanonical';
import GetDataToLinkImage from '../private/common/utils/image/getDataToLinkImage';
import ScriptLogoEvent from '../private/common/scriptManager/scriptLogoEvent';
import { GetCriticalCss } from './criticalCss/default';
import MetaViafoura from '../private/common/metaViafoura';
import Favicon from '../private/common/favicon';
import {
    getTitle,
    getMetaDescriptionDefault,
    metasFromSiteServices,
    getTagTitle,
    addMetaNoIndexNoFollow
} from '../private/common/utils/outputTypeHelper';
import buildScriptComponent from '../private/LN/common/utils/scriptsHelper';
import CssLinksLn10 from './Helper/cssLinksLn10';
import OpeningRawHTML from '../private/common/scriptManager/OpeningRawHtml';
import { GetFonts } from './criticalCss/getFonts';
import removeExtraSpaces from '../private/common/utils/removeExtraSpaces';
import SchemaPageview from '../features/LN-10-global/common/schemas/schemaPageView/default';
import ScriptRegisterPageview from '../private/common/scriptManager/scriptRegisterPageview';
import LinkRSS from './Helper/linkRSS';

const lnBuscador = 'LN-buscador';

const getBodyClass = props => {
    const { className = {} } = props;
    if (className.body) return { className: className.body };

    return undefined;
};

function Default(props) {
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
        globalContent = {},
        outputType,
        isAdmin,
        requestUri,
        template,
        Resource,
        globalContentConfig = {}
    } = props ?? {};

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
        display_date: displayDate,
        acumuladoGeneral: { metas } = {},
        content_elements: contentElements,
        site = {},
        serviceItem,
        dataService
    } = globalContent;

    const {
        meta_title: metaTitle,
        basic: basicTitle,
        mobile: mobileTitle
    } = headlines || {};
    const { basic: descriptionBasic } = description || {};
    const { name: distributorName } = distributor || {};
    const { description: defaultDescription, layoutsName = {} } =
        siteProperties;

    const metaTitleBasic = metaTitle || basicTitle;

    const _nodeType = getSectionName({ nodeType, type, canonicalUrl });
    const title = getTitle({
        title: metaValue('title'),
        basicTitle,
        mobileTitle,
        properties: siteProperties,
        uri: requestUri,
        nodeType: _nodeType,
        subtype
    });

    const tagTitle = getTagTitle({
        PBTitle: metaValue('title'),
        basicTitle,
        shortTitle: mobileTitle,
        nodeType: _nodeType,
        siteProps: siteProperties,
        subtype,
        metaTitle
    });

    const Scripts = buildScriptComponent({
        renderables,
        sitePropertiesScripts: siteProperties?.scripts,
        globalContent,
        globalContentConfig,
        layout
    });

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
        requestUri,
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
                <meta name="theme-color" content="#ffffff" />
                {layout !== lnBuscador && (
                    <title>{removeExtraSpaces(tagTitle)}</title>
                )}
                {metasFromSiteServices(metas)}
                <GetDataToLinkImage
                    data={globalContent}
                    section={_nodeType}
                    renderables={renderables}
                    arcSite={arcSite}
                    isAdmin={isAdmin}
                    layout={layout}
                />
                {/* TODO: Eliminar schemaPageview y scriptRegisterPageview cuando se implemente gtag para registro de pageviews */}
                <SchemaPageview globalContent={globalContent} layout={layout} />
                <ScriptRegisterPageview />
                <GetFonts
                    contextPath={contextPath}
                    deployment={deployment}
                    arcSite={arcSite}
                />
                <GetCriticalCss
                    layout={layout}
                    layoutsName={layoutsName}
                    arcSite={arcSite}
                    Resource={Resource}
                    globalContent={globalContent}
                />
                <CssLinksLn10
                    CssLinks={CssLinks}
                    globalContent={globalContent}
                    layout={layout}
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
                <Scripts location="head" {...props} />
                <TagsLoadingList
                    section={_nodeType}
                    location="head"
                    arcSite={arcSite}
                    Tag="script"
                    globalContent={globalContent}
                />
                {layout !== lnBuscador && (
                    <MetasOG
                        {...props}
                        section={_nodeType}
                        title={title}
                        metaDescription={metaDescription}
                        subtype={subtype}
                    />
                )}
                <LinkCanonicalAndAlternate
                    _id={_id}
                    canonicalUrl={canonicalUrl}
                    arcSite={arcSite}
                    nodeType={_nodeType}
                    site={site}
                    template={template}
                    layout={layout}
                    requestUri={requestUri}
                />
                {layout !== lnBuscador && (
                    <MetaTitle
                        arcSite={arcSite}
                        title={title}
                        defaultTitle={siteProperties.longTitle}
                        nodeType={nodeType}
                        section={_nodeType}
                        requestUri={requestUri}
                    />
                )}
                {layout !== lnBuscador && (
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
                        displayDate={displayDate}
                    />
                )}
                <MetaViafoura {...props} />
                <Syndication
                    type={type}
                    arcSite={arcSite}
                    subtype={subtype}
                    syndication={syndication}
                    outputType={outputType}
                    nodeType={_nodeType}
                />
                {isEconomicIndicesHome(requestUri) && <EconomicIndicesSchema />}
                {isEconomicIndicesPage(requestUri) &&
                    !isEconomicIndicesHome(requestUri) && (
                        <EconomicIndicesDetailSchema
                            serviceItem={serviceItem}
                            dataService={dataService}
                        />
                    )}
                {!isEconomicIndicesPage(requestUri) && (
                    <Schemas
                        section={_nodeType}
                        siteProperties={siteProperties}
                    />
                )}
                <Favicon />
                <link
                    rel="manifest"
                    href={deployment(
                        `${contextPath}/resources/json/LN/manifest.json`
                    )}
                />
                <LinkRSS globalContent={globalContent} _nodeType={_nodeType} />
                <MetasFBNews
                    nodeType={_nodeType}
                    sections={taxonomy && taxonomy.sections}
                />
                {addMetaNoIndexNoFollow({
                    requestUri,
                    distributorName
                })}
                <OpeningRawHTML
                    contentElements={contentElements}
                    layoutName={layout}
                    allowedLayout={
                        siteProperties.layoutsName &&
                        siteProperties.layoutsName.HtmlLibre
                    }
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
                <Fusion />
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
}

export default Default;
