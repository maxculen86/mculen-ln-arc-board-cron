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
// import ArcAds from '../private/common/scriptManager/arcAds';
// import FacebookSDK from '../private/common/scriptManager/facebookSDK';
import MetasOG from '../private/common/metaTags/metasOG';
// import Livefyre from '../private/common/scriptManager/Livefyre';
import LivefyreCommentCount from '../private/common/scriptManager/LivefyreCommentCount';
import LiftIgniter from '../private/common/scriptManager/Liftigniter';
import Datadog from '../private/common/scriptManager/dataDog';
import ScriptLoadingList from '../private/common/scriptManager/scriptLoadingList';
import GooglePublisherTag from '../private/common/scriptManager/googlePublisherTag';
import GooglePublisherTagAcumulado from '../private/common/scriptManager/googlePublisherTagAcumulado';
import SocialEmbeds from '../private/common/scriptManager/socialEmbeds';
import OptaEmbed from '../private/common/scriptManager/optaEmbed';
import ScriptHtmlLibre from '../private/common/scriptManager/scriptHtmlLibre';
import Petametrics from '../private/common/scriptManager/petametrics';
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
// import Queryly from '../private/common/scriptManager/queryly';

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
        // MetaTags,
        metaValue,
        siteProperties,
        renderables,
        globalContent,
        outputType,
        layout
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

    const metaTitleBasic =
        metaTitle && metaTitle !== '' ? metaTitle : basicTitle;

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

    const title = metaValue('title') || siteProperties.title || 'LA NACION';

    const _nodeType = getSectionName({ nodeType, type });

    return (
        <html lang="es">
            <head>
                <meta charset="utf-8" />
                <title>{title}</title>
                <link
                    href="https://www.google-analytics.com"
                    rel="preconnect"
                />
                <DataLayerIndex {...props} />
                <SnippetIndex {...props} />
                <MetaSectionParsely taxonomy={taxonomy} arcSite={arcSite} />
                <Scripts location="head" {...props} />
                <ScriptLoadingList
                    section={_nodeType}
                    location="head"
                    arcSite={arcSite}
                />
                {/* TODO: Revisar la forma de traer metatags desde PB, y omitir o customizar los metas de 'title' y 'description' */}
                {/* {subtype === '7' && <MetaTags />} */}
                <MetasOG {...props} />
                {canonicalUrl && (
                    <link
                        rel="canonical"
                        href={`https://www.lanacion.com.ar${canonicalUrl}`}
                    />
                )}
                {layout === 'FRONT-home' && ( //Borrarlo una vez subida al home a producción
                    <meta name="robots" content="noindex, nofollow" />
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
                />
                <Syndication
                    type={type}
                    arcSite={arcSite}
                    subtype={subtype}
                    syndication={syndication}
                    outputType={outputType}
                />
                <Libs />
                {/* Para OTT carga los styles por front */}
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
                <ScriptLoadingList
                    section={_nodeType}
                    location="body-top"
                    arcSite={arcSite}
                />

                <div id="fusion-app">{children}</div>
                <Fusion />

                <Scripts location="body-bottom" />
                <ScriptLoadingList
                    section={_nodeType}
                    location="body-bottom"
                    arcSite={arcSite}
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
    siteProperties: PropTypes.isRequired
};
Default.contentType = 'text/html';

Default.transform = {
    arcio({ context, data }) {
        return {
            contentType: 'application/json',
            data: {
                tree: context.tree,
                globalContent: context.globalContent,
                featureContent: context.contentCache
            }
        };
    }
};
export default Default;
