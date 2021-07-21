/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ScriptManager from '../private/common/scriptManager';
import ScriptLogoBBC from '../private/common/scriptManager/scriptLogoBBC';
import ScriptVideoPowa from '../private/common/scriptManager/scriptVideoPowa';
import GTM from '../private/common/scriptManager/googleTagManager';
import Comscore from '../private/common/scriptManager/comscore';
import Microdata from '../private/common/scriptManager/microdata';
import PostBid from '../private/common/scriptManager/postbid';
import MetasOG from '../private/common/metaTags/metasOG';
import LivefyreCommentCount from '../private/common/scriptManager/LivefyreCommentCount';
import LiftIgniter from '../private/common/scriptManager/Liftigniter';
import Datadog from '../private/common/scriptManager/dataDog';
import TagsLoadingList from '../private/common/scriptManager/tagsLoadingList';
import GooglePublisherTag from '../private/common/scriptManager/googlePublisherTag';
import GooglePublisherTagAcumulado from '../private/common/scriptManager/googlePublisherTagAcumulado';
import SocialEmbeds from '../private/common/scriptManager/socialEmbeds';
import OptaEmbed from '../private/common/scriptManager/optaEmbed';
import ScriptHtmlLibre from '../private/common/scriptManager/scriptHtmlLibre';
import Petametrics from '../private/common/scriptManager/petametrics';
import Schemas from '../private/common/scriptManager/schemas';
import DataLayerIndex from '../private/common/dataLayerIndex';
import paths from '../../config/paths';
import SnippetIndex from '../private/common/snippet';
import MetaTitle from '../private/common/metaTitle';
import MetaDescription from '../private/common/metaDescription';
import MetaSectionParsely from '../private/common/metaSectionParsely';
import getFirstParagraph from '../private/common/utils/getFirstParagraph';
import getSectionName from '../private/LN/common/utils/getSectionName';
import Syndication from '../private/common/syndication';
import LinkAmpHTML from '../private/common/linkAmpHTML';
import { pipe } from '../private/common/utils/functional';
import Pwa from '../private/common/scriptManager/pwa';
import PwaModals from '../private/LN/common/pwaModals';
import ScriptSWG from '../private/common/scriptManager/scriptSWG';
// import get from '../private/common/utils/get';

const scriptList = [
    {
        component: { name: 'Datadog', function: Datadog },
        feature: 'none'
    },
    {
        component: { name: 'ScriptVideoPowa', function: ScriptVideoPowa },
        feature: 'none'
    },
    { component: { name: 'GTM', function: GTM }, feature: 'none' },
    { component: { name: 'Comscore', function: Comscore }, feature: 'none' },
    { component: { name: 'Microdata', function: Microdata }, feature: 'none' },
    { component: { name: 'Pwa', function: Pwa }, feature: 'none' },
    {
        component: { name: 'PostBid', function: PostBid },
        feature: 'none'
    },
    {
        component: { name: 'GooglePublisherTag', function: GooglePublisherTag },
        feature: 'none'
    },
    {
        component: {
            name: 'GooglePublisherTagAcumulado',
            function: GooglePublisherTagAcumulado
        },
        feature: 'none'
    },
    {
        component: { name: 'LiftIgniter', function: LiftIgniter },
        feature: ['LN-nota/tePuedeInteresar']
    },
    {
        component: { name: 'Petametrics', function: Petametrics },
        feature: ['LN-nota/tePuedeInteresar']
    },
    {
        component: { name: 'ScriptSWG', function: ScriptSWG },
        feature: 'none'
    },
    {
        component: { name: 'SocialEmbeds', function: SocialEmbeds },
        feature: 'none'
    },
    {
        component: { name: 'OptaEmbed', function: OptaEmbed },
        feature: 'none'
    },
    {
        component: { name: 'ScriptHtmlLibre', function: ScriptHtmlLibre },
        feature: 'none'
    },
    {
        component: {
            name: 'LivefyreCommentCount',
            function: LivefyreCommentCount
        },
        feature: ['LN-nota/share']
    }
];

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
        siteProperties,
        renderables,
        globalContent,
        outputType
    } = props;

    const {
        canonical_url: canonicalUrl,
        content_elements: contentElements,
        headlines,
        description,
        type,
        subtype,
        subheadlines = {},
        syndication,
        distributor,
        node_type: nodeType,
        name,
        Payload,
        _id,
        taxonomy
    } = globalContent || {};

    const { meta_title: metaTitle, basic: basicTitle } = headlines || {};
    const { basic: descriptionBasic } = description || {};
    const { name: distributorName } = distributor || {};

    const metaTitleBasic = metaTitle || basicTitle;

    const getPageBuilderFeatures = _renderables =>
        _renderables.filter(renderable => renderable.collection === 'features');

    const getScriptsFilterFunction = scripts => features =>
        scripts
            .filter(
                script =>
                    features.find(feature =>
                        script.feature.includes(feature.type)
                    ) !== undefined || script.feature === 'none'
            )
            .map(element => element.component)
            .reduce(
                (accumulator, value) => ({
                    ...accumulator,
                    [value.name]: value.function
                }),
                {}
            );

    const getScriptsToBeLoaded = getScriptsFilterFunction(scriptList);

    const scripts = pipe(
        getPageBuilderFeatures,
        getScriptsToBeLoaded
    )(renderables);

    const Scripts = ScriptManager(
        globalContent,
        scripts,
        siteProperties.scripts
    );

    const _nodeType = getSectionName({ nodeType, type });

    const title =
        _nodeType === 'home'
            ? siteProperties.longTitle
            : metaValue('title') || siteProperties.title;

    // const getDataToLinkImage = {
    //     nota: () => {
    //         return get(globalContent, 'promo_items.basic.resized_urls', []);
    //     },
    //     acumulado: () => {
    //         return [];
    //     },
    //     home: () => {
    //         return [];
    //     }
    // };

    return (
        <html lang="es">
            <head>
                <meta charset="utf-8" />
                <title>{title}</title>
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
                <Libs />
                {/*
                {getDataToLinkImage[_nodeType] &&
                    getDataToLinkImage[_nodeType]().map(elem => {
                        return (
                            <link
                                rel="preload"
                                href={elem.resizedUrl}
                                as="image"
                                media={elem.option.media}
                            />
                        );
                    })} */}

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
                <MetaSectionParsely taxonomy={taxonomy} arcSite={arcSite} />
                <Scripts location="head" {...props} />
                <TagsLoadingList
                    section={_nodeType}
                    location="head"
                    arcSite={arcSite}
                    Tag="script"
                />
                <MetasOG {...props} section={_nodeType} title={title} />
                {canonicalUrl && (
                    <link
                        rel="canonical"
                        href={`https://www.lanacion.com.ar${canonicalUrl}`}
                    />
                )}
                <LinkAmpHTML
                    subtype={subtype}
                    canonicalUrl={canonicalUrl || _id}
                    arcSite={arcSite}
                    nodeType={nodeType}
                />
                <MetaTitle
                    subtype={subtype}
                    metaTitleBasic={metaTitleBasic}
                    title={title}
                    arcSite={arcSite}
                    nodeType={nodeType}
                    _id={_id}
                    section={_nodeType}
                    defaultTitle={siteProperties.longTitle}
                />
                <MetaDescription
                    subtype={subtype}
                    nodeType={nodeType}
                    name={name || title}
                    _id={_id}
                    payload={Payload}
                    description={descriptionBasic}
                    metaTitleBasic={metaTitleBasic}
                    subheadlines={subheadlines && subheadlines.basic}
                    firstParagraphContentElements={
                        getFirstParagraph(contentElements) || ''
                    }
                    arcSite={arcSite}
                    section={_nodeType}
                    defaultDescription={siteProperties.description}
                />
                <Syndication
                    type={type}
                    arcSite={arcSite}
                    subtype={subtype}
                    syndication={syndication}
                    outputType={outputType}
                />
                <Schemas section={_nodeType} />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0,minimum-scale=0.5,maximum-scale=5.0,user-scalable=yes"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={deployment(`${contextPath}/resources/favicon.ico`)}
                />
                <meta name="theme-color" content="#ffffff" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body {...getBodyClass(siteProperties)}>
                <Scripts location="body-top" />
                <TagsLoadingList
                    section={_nodeType}
                    location="body-top"
                    arcSite={arcSite}
                    Tag="script"
                />

                <div id="fusion-app">
                    <Fusion>{children}</Fusion>
                </div>
                {arcSite !== 'ott' && <PwaModals />}
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
                />
                <ScriptLogoBBC distributorName={distributorName} />
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
    layout: PropTypes.string.isRequired
};

export default Default;
