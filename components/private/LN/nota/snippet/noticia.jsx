/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import HTMLLIBRE from '../../../common/utils/subtypes/htmlLibre';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import getAuthorByline from '../../../common/utils/getAuthorByline';
import getFirstParagraph from '../../../common/utils/getFirstParagraph';
import get from '../../../common/utils/get';
import * as Trust from './constants';
import addRelatedImage from '../../common/utils/addRelatedImage';
import addForwardSlash from '../../common/utils/addForwardSlash';

const extractDataFromTags = tags => {
    let keywords = [];
    if (tags) {
        keywords = tags.map(tag => tag.description);
    }

    return { keywords };
};

const extracDataFromCredits = by => {
    let authors = [];

    if (by) {
        authors = by
            .filter(v => v.type === 'author')
            .map(author => getAuthorByline(author));
    }
    return { authors: authors.length ? authors : [] };
};

const getBiggestImage = basic => {
    const { resized_urls: resizedUrls = [] } = basic || {};
    const imagenFullSize = resizedUrls.reduce(
        (prev, curr) =>
            get(prev, 'option.width', 0) > get(curr, 'option.width', 0)
                ? prev
                : curr,
        {}
    );
    const { resizedUrl, option } = imagenFullSize;
    const { width: bigWidth, height: bigHeight } = option || {};
    return { resizedUrl, bigWidth, bigHeight };
};

const extractDataFromPromoItems = (promoItems, PLACEHOLDER) => {
    const { basic } = promoItems || {};
    const { url, type, height, width } = basic || {};
    const isImage = basic && type === 'image';
    let thumbnailUrl = PLACEHOLDER;
    let image = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        url: PLACEHOLDER,
        height: '800',
        width: '1200'
    };

    if (promoItems && isImage) {
        const { resizedUrl, bigWidth, bigHeight } = getBiggestImage(basic);
        const pathImagen = url;
        thumbnailUrl = `${pathImagen}`;
        image = {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            url: resizedUrl ? `${resizedUrl}` : `${pathImagen}`,
            height: bigHeight ? `${bigHeight}` : `${height}`,
            width: bigWidth ? `${bigWidth}` : `${width}`
        };
    }

    return {
        thumbnailUrl,
        image
    };
};

const publishingPrinciples =
    'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/';

const getTrustProject = trust => data => sponsored => {
    if (!trust && !sponsored) return { ...data };
    if (sponsored)
        return {
            ...data,
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples
        };

    switch (trust) {
        case Trust.TRUST_NOTICIA_ORIGINAL:
            return {
                ...data,
                publishingPrinciples
            };
        case Trust.TRUST_NOTICIA:
            return {
                ...data,
                '@type': 'ReportageNewsArticle',
                publishingPrinciples
            };
        case Trust.TRUST_ANALISIS:
            return {
                ...data,
                '@type': 'AnalysisNewsArticle',
                publishingPrinciples
            };
        case Trust.TRUST_OPINION:
            return {
                ...data,
                '@type': 'OpinionNewsArticle',
                publishingPrinciples
            };
        case Trust.TRUST_EXPLICATIVO:
            return {
                ...data,
                '@type': 'BackgroundNewsArticle',
                publishingPrinciples
            };
        case Trust.TRUST_CONTRIBUCION_DE_LA_AUDIENCIA:
            return {
                ...data,
                '@type': 'AskPublicNewsArticle',
                publishingPrinciples
            };
        case Trust.TRUST_REVIEW:
            return {
                ...data,
                '@type': 'ReviewNewsArticle',
                publishingPrinciples
            };
        default:
            return { ...data };
    }
};

const SnippetNoticia = props => {
    const {
        siteProperties,
        globalContent: {
            canonical_url,
            type,
            headlines,
            content_elements: contentElements,
            taxonomy: { primary_section: primarySection, tags },
            credits: { by },
            distributor: { name: distributorName },
            created_date: createdDate,
            first_publish_date: firstPublishDate,
            display_date: displayDate,
            content_restrictions: { content_code: contentCode } = {},
            label,
            owner: { sponsored },
            subtype,
            withFirmaDistributor
        },
        contextPath,
        deployment
    } = props;

    const { promo_items: promoItems } = addRelatedImage(props.globalContent);
    const LOGO_LN = getAssetsPath(contextPath)(deployment)(
        'placeholderLN-600_amp.jpg'
    );
    const PLACEHOLDER = getAssetsPath(contextPath)(deployment)(
        'placeholderLN-1080.jpg'
    );

    const { path, name } = primarySection || {};

    const distributorAuthor = {
        '@type': 'Organization',
        name: distributorName
    };

    const { authors } = extracDataFromCredits(by);
    const { keywords } = extractDataFromTags(tags);
    const { thumbnailUrl, image } = extractDataFromPromoItems(
        promoItems,
        PLACEHOLDER
    );

    const trust = get(label, 'trust.text', 'Noticia Original');

    let data = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: headlines && `${headlines.basic || 'LA NACION - Noticia'}`,
        articleBody: getFirstParagraph(contentElements) || '',
        url: `${siteProperties.host}${canonical_url || ''}`,
        dateCreated: `${new Date(createdDate).toUTCString() || ''}`,
        datePublished: `${new Date(firstPublishDate).toUTCString() || ''}`,
        dateModified: `${new Date(displayDate).toUTCString() || ''}`,
        mainEntityOfPage: `${addForwardSlash(
            `${siteProperties.host}${path || ''}`
        )}`,
        articleSection: `${name || ''}`,
        isAccessibleForFree: `${contentCode === 'abierta'}`,
        hasPart: {
            '@type': 'WebPageElement',
            isAccessibleForFree: `${contentCode === 'abierta'}`,
            cssSelector: '.nota'
        },
        isPartOf: {
            '@type': ['CreativeWork', 'Product'],
            name: 'Acceso Digital Monthly Test',
            productID: 'lanacion.com.ar:acceso_digital'
        },
        author: !authors.length ? distributorAuthor : authors,
        creator: authors,
        keywords,
        publisher: {
            '@type': 'Organization',
            name: `${siteProperties.title || ''}`,
            url: `${siteProperties.host || ''}`,
            logo: {
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                url: `${LOGO_LN}`,
                height: 60,
                width: 600
            }
        },
        thumbnailUrl,
        image
    };

    data = getTrustProject(trust)(data)(sponsored);

    SnippetNoticia.propTypes = {
        requestUri: PropTypes.string.isRequired,
        siteProperties: PropTypes.shape.isRequired,
        globalContent: PropTypes.shape({
            headlines: PropTypes.shape({
                basic: PropTypes.string
            }),
            taxonomy: PropTypes.shape({
                primary_section: PropTypes.shape({
                    path: PropTypes.string,
                    name: PropTypes.string
                }),
                seo_keywords: PropTypes.arrayOf(PropTypes.string),
                tags: PropTypes.arrayOf(
                    PropTypes.shape({
                        description: PropTypes.string,
                        slug: PropTypes.string,
                        text: PropTypes.string
                    })
                )
            }),
            promo_items: PropTypes.shape({
                basic: PropTypes.shape({
                    url: PropTypes.string,
                    height: PropTypes.number,
                    width: PropTypes.number,
                    type: PropTypes.string
                })
            }),
            credits: PropTypes.shape({
                by: PropTypes.arrayOf(
                    PropTypes.shape({
                        authors: PropTypes.arrayOf(
                            PropTypes.shape({
                                _id: PropTypes.string,
                                name: PropTypes.string,
                                type: PropTypes.string,
                                slug: PropTypes.string,
                                url: PropTypes.string
                            })
                        )
                    })
                )
            }),
            created_date: PropTypes.string,
            first_publish_date: PropTypes.string,
            display_date: PropTypes.string,
            content_restrictions: PropTypes.shape({
                content_code: PropTypes.string
            }),
            subtype: PropTypes.string
        }).isRequired,
        deployment: PropTypes.func.isRequired,
        contextPath: PropTypes.string.isRequired
    };

    return (
        (type === 'story' &&
            (getFirstParagraph(contentElements) ||
                subtype === HTMLLIBRE.id) && (
                <SnippetRender id="Schema_NewsArticle" data={data} />
            )) ||
        null
    );
};

export default SnippetNoticia;
