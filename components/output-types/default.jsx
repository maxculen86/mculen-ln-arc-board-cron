import React from 'react';
import PropTypes from 'fusion:prop-types';
import ScriptManager from '../private/common/scriptManager';
import ScriptLogoBBC from '../private/common/scriptManager/scriptLogoBBC';
import ScriptVideoPowa from '../private/common/scriptManager/scriptVideoPowa';
import GTM from '../private/common/scriptManager/googleTagManager';
import Comscore from '../private/common/scriptManager/comscore';
import Microdata from '../private/common/scriptManager/microdata';
import PostBid from '../private/common/scriptManager/postbid';
import ArcAds from '../private/common/scriptManager/arcAds';
import FacebookSDK from '../private/common/scriptManager/facebookSDK';
import MetasOG from '../private/common/metaTags/metasOG';
import Livefyre from '../private/common/scriptManager/Livefyre';
import LiftIgniter from '../private/common/scriptManager/Liftigniter';
import GooglePublisherTag from '../private/common/scriptManager/googlePublisherTag';
import GooglePublisherTagAcumulado from '../private/common/scriptManager/googlePublisherTagAcumulado';
import SocialEmbeds from '../private/common/scriptManager/socialEmbeds';
import OptaEmbed from '../private/common/scriptManager/optaEmbed';
import ScriptHtmlLibre from '../private/common/scriptManager/scriptHtmlLibre';
import DataLayerIndex from '../private/common/dataLayerIndex';
import paths from '../../config/paths';
import SnippetIndex from '../private/common/snippet';
import Robot from '../private/common/robot';
import MetaTitle from '../private/common/metaTitle';
import MetaDescription from '../private/common/metaDescription';
import getParagraph from '../private/common/utils/getParagraph';
import Syndication from '../private/common/syndication';
import LinkAmpHTML from '../private/common/linkAmpHTML';
import { pipe } from '../private/common/utils/functional';

const scriptList = [
    {
        component: { name: 'ScriptVideoPowa', function: ScriptVideoPowa },
        feature: 'none'
    },
    { component: { name: 'GTM', function: GTM }, feature: 'none' },
    { component: { name: 'Comscore', function: Comscore }, feature: 'none' },
    { component: { name: 'Microdata', function: Microdata }, feature: 'none' },
    {
        component: { name: 'ArcAds', function: ArcAds },
        feature: [
            'LN-common/banner',
            'LN-common/bannerRefactor',
            'LN-nota/bannerStickyNota',
            'LN-common/bannerTercera',
            'LN-acumulado/bannerSticky'
        ]
    },
    {
        component: { name: 'FacebookSDK', function: FacebookSDK },
        feature: ['LN-nota/share']
    },
    { component: { name: 'PostBid', function: PostBid }, feature: 'none' },
    {
        component: { name: 'Livefyre', function: Livefyre },
        feature: ['LN-nota/comments']
    },
    {
        component: { name: 'LiftIgniter', function: LiftIgniter },
        feature: ['LN-nota/tePuedeInteresar']
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
        MetaTags,
        metaValue,
        siteProperties,
        renderables,
        globalContent
    } = props;
    const {
        canonical_url: canonicalUrl,
        content_elements: contentElements,
        promo_items: promoItems,
        headlines,
        description,
        subtype,
        syndication,
        distributor
    } = globalContent || {};
    const { meta_title: metaTitle, basic: basicTitle } = headlines || {};
    const { basic: descriptionBasic } = description || {};
    const { name: distributorName } = distributor || {};

    const metaTitleBasic =
        metaTitle && metaTitle !== '' ? metaTitle : basicTitle;

    const getPageBuilderFeatures = renderables =>
        renderables.filter(renderable => renderable.collection === 'features');

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

    return (
        <html lang="es">
            <head>
                <meta charset="utf-8" />
                <title>
                    {metaValue('title') || siteProperties.title || 'LA NACION'}
                </title>

                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    html, body {
                        height: 100%;
                    }
                `
                    }}
                />
                {/* <link href="https://especialess3.lanacion.com.ar/20/06/coronavirus-evolucion-especial/css/app.6fd78c9e.css" rel="stylesheet" />
                <link href="https://especialess3.lanacion.com.ar/20/06/coronavirus-evolucion-especial/js/chunk-vendors.ec7ce19c.js" rel="preload" as="script" />
                <link href="https://especialess3.lanacion.com.ar/20/06/coronavirus-evolucion-especial/js/app.d0588205.js" rel="preload" as="script" />
                <link href="https://especialess3.lanacion.com.ar/20/06/coronavirus-evolucion-especial/css/app.6fd78c9e.css" rel="preload" as="style" />

                <script src="https://especialess3.lanacion.com.ar/20/06/coronavirus-evolucion-especial/js/app.d0588205.js" /> */}

                <DataLayerIndex {...props} />
                <SnippetIndex {...props} />
                <Scripts location="head" {...props} />
                {/* TODO: Revisar la forma de traer metatags desde PB, y omitir o customizar los metas de 'title' y 'description' */}
                {/* {subtype === '7' && <MetaTags />} */}
                <MetasOG {...props} />
                <Robot
                    subtype={subtype}
                    canonicalUrl={canonicalUrl}
                    arcSite={arcSite}
                />
                <LinkAmpHTML
                    subtype={subtype}
                    canonicalUrl={canonicalUrl}
                    arcSite={arcSite}
                />
                <MetaTitle
                    subtype={subtype}
                    metaTitleBasic={metaTitleBasic}
                    arcSite={arcSite}
                />
                <MetaDescription
                    subtype={subtype}
                    description={descriptionBasic}
                    metaTitleBasic={metaTitleBasic}
                    firstParagraphContentElements={
                        getParagraph(contentElements) || ''
                    }
                    arcSite={arcSite}
                />
                <Syndication
                    arcSite={arcSite}
                    subtype={subtype}
                    syndication={syndication}
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
                <div id="fusion-app">{children}</div>
                <Fusion />
                <Scripts location="body-bottom" />
                <ScriptLogoBBC distributorName={distributorName} />
            </body>
        </html>
    );
};

Default.propTypes = {
    siteProperties: PropTypes.isRequired
};

export default Default;
