import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import getAuthorByline from '../../../common/utils/getAuthorByline';
import getFirstParagraph from '../../../common/utils/getFirstParagraph';
import get from '../../../common/utils/get';
import * as Trust from './constants';
import addRelatedImage from '../../common/utils/addRelatedImage';
import { addForwardSlash } from '../../common/utils/addForwardSlash';
import {
    extractDataFromPromoItems,
    urlSchema
} from '../../common/utils/extractDataFromPromoItems';
import {
    createISODate,
    getModifiedDate,
    getPublishDate
} from '../../../common/utils/schema/liveBlog/generatePostObject';
import {
    LIVEBLOG_EDITORIAL,
    OPINION
} from '../../../common/utils/subtypes/subtypeHelper';

const extractDataFromTags = tags => {
    let keywords = [];
    if (tags) {
        keywords = tags.map(tag => tag.description);
    }

    return { keywords };
};

const setAuthorSnippetStructure = author => {
    const bioPage = get(author, 'additional_properties.original.bio_page', '');

    return {
        '@type': 'Person',
        name: getAuthorByline(author),
        url: `${SITE_LANACION}${bioPage}`
    };
};

const extracDataFromCredits = (by, config = {}) => {
    let authors = [];

    if (by) {
        authors = by
            .filter(v => v.type === 'author')
            .map(author =>
                config.snippet
                    ? setAuthorSnippetStructure(author)
                    : getAuthorByline(author)
            );
    }
    return { authors: authors.length ? authors : [] };
};

const publishingPrinciples = `${SITE_LANACION}/tema/the-trust-project-tid68036/`;

export const getTrustProject = trust => data => sponsored => {
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
                '@type': 'NewsArticle',
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

const SUBTYPE_CONFIG = {
    [OPINION]: {
        schemaType: 'OpinionNewsArticle',
        articleSection: 'Opinión',
        distributorAuthorType: 'Person',
        distributorAuthorName: 'Redacción LA NACION',
        includeSchemaId: false,
        cssSelector: ''
    },
    [LIVEBLOG_EDITORIAL]: {
        cssSelector: '.liveblog-editorial'
    }
};

function SnippetNoticia({
    siteProperties,
    globalContent,
    contextPath,
    deployment
}) {
    const {
        canonical_url: canonicalUrl = '',
        type,
        headlines,
        content_elements: contentElements = [],
        taxonomy: { primary_section: primarySection = {}, tags },
        credits: { by },
        distributor = { name: 'LA NACION' },
        created_date: createdDate = '',
        first_publish_date: firstPublishDate = '',
        last_updated_date: lastUpdatedDate = '',
        display_date: displayDate = '',
        content_restrictions: { content_code: contentCode } = {},
        label,
        owner: { sponsored },
        subtype
    } = globalContent;

    const { name: distributorName } = distributor;
    const { promo_items: promoItems } = addRelatedImage(globalContent);
    const LOGO_LN = getAssetsPath(contextPath)(deployment)(
        'placeholderLN-600x60.jpg'
    );
    const PLACEHOLDER = getAssetsPath(contextPath)(deployment)(
        'placeholderLN-1200x800.jpg'
    );
    const { name } = primarySection;
    const subtypeConfig = SUBTYPE_CONFIG[subtype] || {};
    const distributorAuthor = {
        '@type': subtypeConfig.distributorAuthorType || 'Organization',
        name: subtypeConfig.distributorAuthorName || distributorName
    };

    const { authors } = extracDataFromCredits(by, { snippet: true });
    const { keywords } = extractDataFromTags(tags);
    const { thumbnailUrl, image } = extractDataFromPromoItems(
        promoItems,
        PLACEHOLDER
    );

    const trust = get(label, 'trust.text', 'Noticia Original');
    const creators = authors.map(a => a.name);
    const articleBody = getFirstParagraph(contentElements);
    const datePublishedISO = createISODate(
        getPublishDate(firstPublishDate, displayDate)
    );
    const dateModifiedISO = createISODate(
        getModifiedDate(lastUpdatedDate, displayDate)
    );
    const isAccessibleForFree =
        contentCode === 'abierta' || contentCode === 'comun';
    const cssSelector = subtypeConfig.cssSelector ?? '.nota';
    const includeSchemaId = subtypeConfig.includeSchemaId ?? true;

    let data = {
        '@context': urlSchema,
        '@type': subtypeConfig.schemaType || 'NewsArticle',
        headline: headlines && `${headlines.basic || 'LA NACION - Noticia'}`,
        ...(articleBody && { articleBody }),
        url: `${SITE_LANACION}${canonicalUrl}`,
        dateCreated: createISODate(createdDate),
        datePublished: datePublishedISO,
        dateModified: dateModifiedISO,
        mainEntityOfPage: addForwardSlash(`${SITE_LANACION}${canonicalUrl}`),
        articleSection: subtypeConfig.articleSection || name,
        isAccessibleForFree,
        hasPart: {
            '@type': 'WebPageElement',
            isAccessibleForFree,
            ...(cssSelector && { cssSelector })
        },
        isPartOf: {
            '@type': ['CreativeWork', 'Product'],
            name: 'Acceso Digital Monthly Test',
            productID: 'lanacion.com.ar:acceso_digital'
        },
        author: !authors.length ? distributorAuthor : authors,
        creator: creators,
        keywords,
        publisher: {
            '@type': 'Organization',
            name: `${siteProperties.title || ''}`,
            url: `${SITE_LANACION || ''}`,
            logo: {
                '@context': urlSchema,
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
        siteProperties: PropTypes.shape({
            title: PropTypes.string,
            host: PropTypes.string
        }).isRequired,
        globalContent: PropTypes.shape({
            canonical_url: PropTypes.string,
            type: PropTypes.string,
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
            content_elements: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.string
                })
            ),
            created_date: PropTypes.string,
            first_publish_date: PropTypes.string,
            last_updated_date: PropTypes.string,
            display_date: PropTypes.string,
            content_restrictions: PropTypes.shape({
                content_code: PropTypes.string
            }),
            subtype: PropTypes.string,
            distributor: PropTypes.shape({
                name: PropTypes.string
            }),
            owner: PropTypes.shape({
                sponsored: PropTypes.bool
            }),
            label: PropTypes.shape({
                trust: PropTypes.shape({
                    text: PropTypes.string
                })
            })
        }).isRequired,
        deployment: PropTypes.func.isRequired,
        contextPath: PropTypes.string.isRequired
    };

    return (
        (type === 'story' && (
            <SnippetRender
                {...(includeSchemaId && { id: 'Schema_NewsArticle' })}
                data={data}
            />
        )) ||
        null
    );
}

export default SnippetNoticia;
