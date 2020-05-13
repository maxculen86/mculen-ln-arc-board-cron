/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import AMPScripts, {
    _AMPBoilerplate,
    AMPCustomStyle
} from '../private/common/ampIndex';
import Robot from '../private/common/robot';
import MetaTitle from '../private/common/metaTitle';
import MetaDescription from '../private/common/metaDescription';
import getParagraph from '../private/common/utils/getParagraph';
import Syndication from '../private/common/syndication';
import getCollectionsFromRenderables from '../private/common/utils/getCollectionsFromRenderables';

/**
 * TODO: Resolver el tema de las canonicas
 * TODO: Resolver los datos estructurados por cada layout
 * TODO: Evaluar cuando incluir Content Security Policy (CSP)
 * @param {nodes} props
 */
const Amp = props => {
    const {
        arcSite,
        children,
        metaValue,
        Resource,
        layout,
        siteProperties: {
            title,
            scripts: {
                GTM: {
                    props: { id }
                }
            }
        },
        renderables,
        deployment,
        contextPath,
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
    const { external_distribution: externalDistribution, search } =
        syndication || {};

    const contentFeatures = getCollectionsFromRenderables(
        renderables,
        'features'
    );

    return (
        <html amp={String.fromCodePoint(9889)} lang="es">
            <head>
                <meta charset="utf-8" />
                <script async src="https://cdn.ampproject.org/v0.js" />
                <title>{metaValue('title') || title || 'LA NACION'}</title>
                <meta
                    name="viewport"
                    content="width=device-width,minimum-scale=1,initial-scale=1"
                />
                <AMPScripts
                    layout={layout}
                    arcSite={arcSite}
                    contentFeatures={contentFeatures}
                />
                <AMPCustomStyle
                    layout={layout}
                    arcSite={arcSite}
                    Resource={Resource}
                />
                <style amp-boilerplate="">{_AMPBoilerplate}</style>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html:
                            '<style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>'
                    }}
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Oswald:200,300,400"
                    rel="stylesheet"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={deployment(`${contextPath}/resources/favicon.ico`)}
                />
                <Robot
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
                />
                <Syndication
                    arcSite={arcSite}
                    subtype={subtype}
                    syndication={syndication}
                />
            </head>
            <body>
                <amp-analytics
                    config={`https://www.googletagmanager.com/amp.json?id=${id}&gtm.url=SOURCE_URL`}
                    data-credentials="include"
                />
                {children}
            </body>
        </html>
    );
};

Amp.propTypes = {
    arcSite: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.nodes).isRequired,
    metaValue: PropTypes.func.isRequired,
    Resource: PropTypes.node.isRequired,
    layout: PropTypes.string.isRequired,
    siteProperties: PropTypes.shape({
        title: PropTypes.string,
        scripts: PropTypes.shape({
            GTM: PropTypes.shape({
                props: PropTypes.shape({
                    id: PropTypes.string
                })
            })
        })
    }).isRequired,
    renderables: PropTypes.arrayOf(PropTypes.object).isRequired,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired
};

export default Amp;
