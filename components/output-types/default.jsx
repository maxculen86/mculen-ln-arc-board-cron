import React from 'react';
import PropTypes from 'fusion:prop-types';
import ScriptManager from '../private/common/scriptManager';
import GTM from '../private/common/scriptManager/googleTagManager';
import Comscore from '../private/common/scriptManager/comscore';
import Microdata from '../private/common/scriptManager/microdata';
import PostBid from '../private/common/scriptManager/postbid';
import ArcAds from '../private/common/scriptManager/arcAds';
import FacebookSDK from '../private/common/scriptManager/facebookSDK';
import MetasOG from '../private/common/metaTags/metasOG';
import Livefyre from '../private/common/scriptManager/Livefyre';
import LiftIgniter from '../private/common/scriptManager/Liftigniter';
import DataLayerIndex from '../private/common/dataLayerIndex';
import paths from '../../config/paths';
import SnippetIndex from '../private/common/snippet';
import Robot from '../private/common/robot';
import MetaTitle from '../private/common/metaTitle';
import MetaDescription from '../private/common/metaDescription';
import getParagraph from '../private/common/utils/getParagraph';
import Syndication from '../private/common/syndication';
import { pipe } from '../private/common/utils/functional';

const scriptList = [
    { component: { name: 'GTM', function: GTM }, feature: 'none' },
    { component: { name: 'Comscore', function: Comscore }, feature: 'none' },
    { component: { name: 'Microdata', function: Microdata }, feature: 'none' },
    {
        component: { name: 'ArcAds', function: ArcAds },
        feature: [
            'LN-common/banner',
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
        headlines,
        description,
        subtype,
        syndication
    } = globalContent || {};
    const { meta_title: metaTitle, basic: basicTitle } = headlines || {};
    const { basic: descriptionBasic } = description || {};

    const metaTitleBasic =
        metaTitle && metaTitle !== '' ? metaTitle : basicTitle;
    const { external_distribution, search } = syndication || {};

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
                <title>
                    {metaValue('title') || siteProperties.title || 'LA NACION'}
                </title>
                <DataLayerIndex {...props} />
                <SnippetIndex {...props} />
                <Scripts location="head" {...props} />
                {subtype !== '1' && <MetaTags />}
                <MetasOG {...props} />
                <Robot
                    subtype={subtype}
                    canonicalUrl={canonicalUrl}
                    arcSite={arcSite}
                />
                {subtype === '1' && canonicalUrl && (
                    <link
                        rel="amphtml"
                        href={`https://www.lanacion.com.ar${canonicalUrl}amp`}
                    />
                )}
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
                />
                <Syndication
                    arcSite={arcSite}
                    subtype={subtype}
                    externalDistribution={external_distribution}
                    search={search}
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
            </body>
        </html>
    );
};

Default.propTypes = {
    siteProperties: PropTypes.isRequired
};

export default Default;
