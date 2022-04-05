/* eslint-disable camelcase */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import AMPScripts, {
    _AMPBoilerplate,
    AMPCustomStyle
} from '../private/common/ampIndex';
import AMPSnippet from '../private/common/ampSnippet';
import Robot from '../private/common/robot';
import MetaTitle from '../private/common/metaTitle';
import MetaDescription from '../private/common/metaDescription';
import MetaSectionParsely from '../private/common/metaSectionParsely';
import getFirstParagraph from '../private/common/utils/getFirstParagraph';
import Syndication from '../private/common/syndication';
import getCollectionsFromRenderables from '../private/common/utils/getCollectionsFromRenderables';
import dataLayerIndexAmp from '../private/common/dataLayerIndexAmp';
import MetasOG from '../private/common/metaTags/metasOG';
import ScriptLogoBBCAMP from '../private/common/scriptManager/scriptLogoBBCAMP';
import getDataToLinkImage from '../private/common/utils/image/getDataToLinkImage';
import getSectionName from '../private/LN/common/utils/getSectionName';
import MeteringAMP from '../private/common/scriptManager/meteringAMP';
import Favicon from '../private/common/favicon';
import get from '../private/common/utils/get';
import FontPreloads from '../private/common/fontsPreloads';
import { LinkImagePreload } from '../private/LN/common/utils/mediaHelper';
// import { getBiggestImage } from 'components/private/LN/nota/snippet/noticia';

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
                    props: { idAMP }
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
        type,
        subtype,
        syndication,
        distributor,
        node_type: nodeType,
        name,
        Payload,
        subheadlines,
        _id,
        taxonomy,
        content_restrictions: { content_code: contentCode } = {}
    } = globalContent || {};

    const { meta_title: metaTitle, basic: basicTitle } = headlines || {};
    const { basic: descriptionBasic } = description || {};
    const { name: distributorName } = distributor || {};

    const metaTitleBasic =
        metaTitle && metaTitle !== '' ? metaTitle : basicTitle;

    const contentFeatures = getCollectionsFromRenderables(
        renderables,
        'features'
    );

    const metaTitleValue = metaValue('title') || title || 'LA NACION';
    const dataLayerAmp = dataLayerIndexAmp(arcSite, layout, globalContent);
    const _nodeType = getSectionName({ nodeType, type });
    const resizedUrls = get(
        globalContent,
        'promo_items.basic.resized_urls',
        []
    );

    return (
        <html amp={String.fromCodePoint(9889)} lang="es">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <LinkImagePreload resizedUrls={resizedUrls} isAmp />
                <meta name="theme-color" content="#ffffff" />
                <meta name="google" content="notranslate" />
                <MetaTitle
                    subtype={subtype}
                    metaTitleBasic={metaTitleBasic}
                    arcSite={arcSite}
                    nodeType={nodeType}
                    _id={_id}
                    metaValue={metaTitleValue}
                    title={metaTitleValue}
                />
                <MetaDescription
                    subtype={subtype}
                    nodeType={nodeType}
                    name={name}
                    _id={_id}
                    payload={Payload}
                    description={descriptionBasic}
                    metaTitleBasic={metaTitleBasic}
                    firstParagraphContentElements={
                        getFirstParagraph(contentElements) || ''
                    }
                    subheadlines={subheadlines && subheadlines.basic}
                    arcSite={arcSite}
                />
                <MetasOG {...props} section={_nodeType} />
                <Syndication
                    type={type}
                    arcSite={arcSite}
                    subtype={subtype}
                    syndication={syndication}
                />
                <FontPreloads />
                <AMPCustomStyle
                    layout={layout}
                    arcSite={arcSite}
                    Resource={Resource}
                    contextPath={contextPath}
                    deployment={deployment}
                />
                <link
                    rel="preload"
                    as="script"
                    href="https://cdn.ampproject.org/v0.js"
                />
                <script async src="https://cdn.ampproject.org/v0.js" />

                <AMPScripts
                    layout={layout}
                    arcSite={arcSite}
                    contentFeatures={contentFeatures}
                    globalContent={globalContent}
                />

                <style amp-boilerplate="">{_AMPBoilerplate}</style>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html:
                            '<style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>'
                    }}
                />
                <Favicon />

                <Robot
                    subtype={subtype}
                    canonicalUrl={canonicalUrl || _id}
                    arcSite={arcSite}
                    nodeType={nodeType}
                />
                <AMPSnippet {...props} />
                <MetaSectionParsely arcSite={arcSite} taxonomy={taxonomy} />
                <title>{metaTitleValue}</title>
            </head>
            <body data-amp-auto-lightbox-disable>
                <amp-analytics
                    config={`https://www.googletagmanager.com/amp.json?id=${idAMP}`}
                    data-credentials="include"
                >
                    {dataLayerAmp && (
                        <script
                            type="application/json"
                            dangerouslySetInnerHTML={{
                                __html: dataLayerAmp
                            }}
                        />
                    )}
                </amp-analytics>
                <ScriptLogoBBCAMP distributorName={distributorName} />
                {children}
                <MeteringAMP
                    canonicalUrl={canonicalUrl}
                    contentCode={contentCode}
                    _id={_id}
                />
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
                    idAMP: PropTypes.string
                })
            })
        })
    }).isRequired,
    renderables: PropTypes.arrayOf(PropTypes.object).isRequired,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired
};

export default Amp;
