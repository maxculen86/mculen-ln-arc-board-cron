/* eslint-disable react/jsx-props-no-spreading */
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
import getSectionName from '../private/LN/common/utils/getSectionName';
import MeteringAMP from '../private/common/scriptManager/meteringAMP';
import Favicon from '../private/common/favicon';
import get from '../private/common/utils/get';
import { LinkImagePreload } from '../private/LN/common/utils/mediaHelper';
import replaceUrlResizerToWWW from '../../content/sources/utils/replaceUrlResizerToWWW';
import { getTitle } from '../private/common/utils/outputTypeHelper';
import hasNotAMP from './Helper/hasNotAMP';

/**
 * @param {nodes} props
 */
const Amp = props => {
    const {
        arcSite,
        children,
        metaValue,
        Resource,
        layout,
        siteProperties = {},
        renderables,
        deployment,
        contextPath,
        globalContent = {},
        requestUri
    } = props;

    const {
        title,
        scripts: {
            GTM: {
                props: { idAMP }
            }
        }
    } = siteProperties;

    const {
        canonical_url: canonicalUrl,
        content_elements: contentElements,
        headlines = {},
        description = {},
        type,
        subtype,
        syndication,
        distributor = {},
        node_type: nodeType,
        name,
        Payload,
        subheadlines,
        _id,
        taxonomy,
        website_url: websiteUrl,
        content_restrictions: { content_code: contentCode } = {}
    } = globalContent;

    const {
        meta_title: metaTitle,
        basic: basicTitle,
        mobile: mobileTitle
    } = headlines;
    const { basic: descriptionBasic } = description;
    const { name: distributorName } = distributor;

    const metaTitleBasic =
        metaTitle && metaTitle !== '' ? metaTitle : basicTitle;

    const contentFeatures = getCollectionsFromRenderables(
        renderables,
        'features'
    );

    const _nodeType = getSectionName({ nodeType, type });
    const customTitle = getTitle({
        title: metaValue('title'),
        basicTitle,
        mobileTitle,
        properties: siteProperties,
        uri: requestUri,
        nodeType: _nodeType,
        subtype
    });

    const metaTitleValue = metaValue('title') || title || 'LA NACION';
    const dataLayerAmp = dataLayerIndexAmp(arcSite, layout, globalContent);
    const basicPromoItems = replaceUrlResizerToWWW(
        get(globalContent, 'promo_items.basic', {})
    );

    const { resized_urls: resizedUrls } = basicPromoItems;

    hasNotAMP(layout, requestUri);

    return (
        <html amp={String.fromCodePoint(9889)} lang="es">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <LinkImagePreload resizedUrls={resizedUrls} isAmp />
                <meta name="theme-color" content="#ffffff" />
                <MetaTitle
                    subtype={subtype}
                    metaTitleBasic={metaTitleBasic}
                    arcSite={arcSite}
                    nodeType={nodeType}
                    _id={_id}
                    metaValue={metaTitleValue}
                    title={customTitle}
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
                <MetasOG
                    {...props}
                    title={customTitle}
                    section={_nodeType}
                    subtype={subtype}
                />
                <Syndication
                    type={type}
                    arcSite={arcSite}
                    subtype={subtype}
                    syndication={syndication}
                />
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
                    canonicalUrl={canonicalUrl || websiteUrl}
                    subtype={subtype}
                />
                <AMPSnippet {...props} />
                <MetaSectionParsely arcSite={arcSite} taxonomy={taxonomy} />
                <title>{customTitle}</title>
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
    deployment: PropTypes.func.isRequired,
    globalContent: PropTypes.shape({
        canonical_url: PropTypes.string,
        content_elements: PropTypes.arrayOf(PropTypes.shape()),
        headlines: PropTypes.shape({
            basic: PropTypes.string,
            mobile: PropTypes.string
        }),
        description: PropTypes.shape({
            basic: PropTypes.string
        }),
        type: PropTypes.string,
        subtype: PropTypes.string,
        syndication: PropTypes.shape({
            external_distribution: PropTypes.bool,
            search: PropTypes.bool
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        }),
        node_type: PropTypes.string,
        name: PropTypes.string,
        subheadlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        _id: PropTypes.string,
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                _id: PropTypes.string
            }),
            sections: PropTypes.arrayOf(PropTypes.shape())
        }),
        website_url: PropTypes.string,
        content_restrictions: PropTypes.shape({
            content_code: PropTypes.string.isRequired
        })
    }).isRequired,
    requestUri: PropTypes.string.isRequired
};

export default Amp;
