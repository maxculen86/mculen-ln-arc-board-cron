import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import getAuthorByline from '../../../common/utils/getAuthorByline';
import getFirstParagraph from '../../../common/utils/getFirstParagraph';
import get from '../../../common/utils/get';
import { isNonEmptyArray } from '../../../common/utils/dataValidation';
import getNumericRatingValue from '../../../common/utils/getNumericRatingValue';
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
    NOTICIA,
    LIVEBLOG_EDITORIAL,
    OPINION
} from '../../../common/utils/subtypes/subtypeHelper';
import {
    getReviewAuthor,
    getReviewSchemaData
} from './helpers/reviewSchemaHelper';
import getElementsText from '../../../common/utils/getElementsText';
import { PUBLISHING_PRINCIPLES } from './helpers/reviewSchemaConstants';

const SECTIONS_WITH_DESCRIPTION_AND_FULL_ARTICLE_BODY = [
    '/deportes/automovilismo',
    '/horoscopo',
    '/opinion',
    '/sociedad'
];

const SECTIONS_WITHOUT_HAS_PART = [
    '/deportes/automovilismo',
    '/horoscopo',
    '/opinion',
    '/sociedad'
];

const matchesSection = (primarySectionId = '', sections = []) =>
    sections.some(
        section =>
            primarySectionId === section ||
            primarySectionId.startsWith(`${section}/`)
    );

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

export const getTrustProject = trust => data => sponsored => {
    if (!trust && !sponsored) return { ...data };
    if (sponsored)
        return {
            ...data,
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples: PUBLISHING_PRINCIPLES
        };

    switch (trust) {
        case Trust.TRUST_NOTICIA_ORIGINAL:
            return {
                ...data,
                publishingPrinciples: PUBLISHING_PRINCIPLES
            };
        case Trust.TRUST_NOTICIA:
            return {
                ...data,
                '@type': 'NewsArticle',
                publishingPrinciples: PUBLISHING_PRINCIPLES
            };
        case Trust.TRUST_ANALISIS:
            return {
                ...data,
                '@type': 'AnalysisNewsArticle',
                publishingPrinciples: PUBLISHING_PRINCIPLES
            };
        case Trust.TRUST_OPINION:
            return {
                ...data,
                '@type': 'OpinionNewsArticle',
                publishingPrinciples: PUBLISHING_PRINCIPLES
            };
        case Trust.TRUST_EXPLICATIVO:
            return {
                ...data,
                '@type': 'BackgroundNewsArticle',
                publishingPrinciples: PUBLISHING_PRINCIPLES
            };
        case Trust.TRUST_CONTRIBUCION_DE_LA_AUDIENCIA:
            return {
                ...data,
                '@type': 'AskPublicNewsArticle',
                publishingPrinciples: PUBLISHING_PRINCIPLES
            };
        case Trust.TRUST_REVIEW:
            return {
                ...data,
                '@type': 'ReviewNewsArticle',
                publishingPrinciples: PUBLISHING_PRINCIPLES
            };
        default:
            return { ...data };
    }
};

function SnippetNoticia({
    siteProperties,
    globalContent,
    contextPath,
    deployment
}) {
    const { type } = globalContent;
    const { promo_items: promoItems } = addRelatedImage(globalContent);
    if (type !== 'story') return null;

    const {
        canonical_url: canonicalUrl = '',
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

    const headlineResolved =
        get(headlines, 'basic', '') || 'LA NACION - Noticia';
    const noteUrl = `${SITE_LANACION}${canonicalUrl}`;
    const noteUrlWithSlash = addForwardSlash(noteUrl);
    const trust = get(label, 'trust.text', 'Noticia Original');
    const hasAuthors = isNonEmptyArray(authors);
    const creators = authors.map(a => a.name);
    const firtsParagraph = getFirstParagraph(contentElements);
    const primarySectionId = get(primarySection, '_id', '');
    const shouldIncludeDescriptionAndFullArticleBody = matchesSection(
        primarySectionId,
        SECTIONS_WITH_DESCRIPTION_AND_FULL_ARTICLE_BODY
    );
    const shouldIncludeHasPart = !matchesSection(
        primarySectionId,
        SECTIONS_WITHOUT_HAS_PART
    );
    const articleBody = shouldIncludeDescriptionAndFullArticleBody
        ? getElementsText(contentElements)
        : firtsParagraph;
    const datePublishedISO = createISODate(
        getPublishDate(firstPublishDate, displayDate)
    );
    const dateModifiedISO = createISODate(
        getModifiedDate(lastUpdatedDate, displayDate)
    );
    const isAccessibleForFree = contentCode !== 'cerrada';
    const cssSelector = subtypeConfig.cssSelector ?? '.nota';
    const includeSchemaId = subtypeConfig.includeSchemaId ?? true;

    let data = {
        '@context': urlSchema,
        '@type': subtypeConfig.schemaType || 'NewsArticle',
        headline: headlineResolved,
        ...(shouldIncludeDescriptionAndFullArticleBody && {
            description:
                get(globalContent, 'subheadlines.basic', firtsParagraph) ||
                firtsParagraph
        }),
        ...(articleBody && { articleBody }),
        url: noteUrl,
        dateCreated: createISODate(createdDate),
        datePublished: datePublishedISO,
        dateModified: dateModifiedISO,
        mainEntityOfPage: noteUrlWithSlash,
        articleSection: subtypeConfig.articleSection || name,
        isAccessibleForFree,
        ...(shouldIncludeHasPart && {
            hasPart: {
                '@type': 'WebPageElement',
                isAccessibleForFree,
                ...(cssSelector && { cssSelector })
            }
        }),
        isPartOf: {
            '@type': ['CreativeWork', 'Product'],
            name: 'Acceso Digital Monthly Test',
            productID: 'lanacion.com.ar:acceso_digital'
        },
        author: hasAuthors ? authors : distributorAuthor,
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

    const ratingValue = getNumericRatingValue(contentElements);
    const shouldRenderReviewSchema =
        subtype === NOTICIA && ratingValue && canonicalUrl;
    const reviewSchemaData = shouldRenderReviewSchema
        ? getReviewSchemaData({
              canonicalUrl,
              reviewUrl: noteUrlWithSlash,
              headline: headlineResolved,
              author: getReviewAuthor({ authors, hasAuthors }),
              datePublished: datePublishedISO,
              ratingValue
          })
        : null;
    return (
        <>
            <SnippetRender
                {...(includeSchemaId && { id: 'Schema_NewsArticle' })}
                data={data}
            />
            {reviewSchemaData && (
                <SnippetRender id="Schema_Review" data={reviewSchemaData} />
            )}
        </>
    );
}

export default SnippetNoticia;
