/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import getAuthorByline from '../../../common/utils/getAuthorByline';
import get from '../../../common/utils/get';
import {
    restMinutes,
    differenceInMinutes,
    addHours
} from '../../../common/utils/dateAndTimeUtil';
import {
    extractDataFromPromoItems,
    urlShema
} from '../../common/utils/extractDataFromPromoItems';
import addRelatedImage from '../../common/utils/addRelatedImage';

const extracDataFromCredits = by => {
    let authors = [];

    if (by) {
        authors = by
            .filter(v => v.type === 'author')
            .map(author => getAuthorByline(author));
    }
    return { authors: authors.length ? authors : ['Redacción LA NACION'] };
};

const calculateDateModified = (
    lastUpdatedDate,
    minutes,
    totalElements,
    index
) => {
    if (index === 1) return new Date(lastUpdatedDate);

    const minutesToAdd = (minutes / totalElements) * index;

    return restMinutes(new Date(lastUpdatedDate), minutesToAdd);
};

const buildBlogObjects = (globalContent, url, PLACEHOLDER) => {
    const {
        content_elements: contentElements,
        credits: { by },
        first_publish_date: firstPublishDate,
        last_updated_date: lastUpdatedDate
    } = globalContent || {};

    const { authors } = extracDataFromCredits(by);

    const headline = get(
        globalContent,
        'headlines.basic',
        'LA NACION - Noticia'
    );

    const minutes = differenceInMinutes(firstPublishDate, lastUpdatedDate);

    const textElements = contentElements.filter(elem => elem.type === 'text');

    return textElements.map((elem, i) => {
        const dateModified = calculateDateModified(
            lastUpdatedDate,
            minutes,
            textElements.length,
            i + 1
        );

        return {
            '@type': 'BlogPosting',
            headline,
            url: `${url.slice(0, -1)}#parrafo_${i + 1}`,
            '@id': `#parrafo_${i + 1}`,
            mainEntityOfPage: { '@type': 'WebPage' },
            datePublished: dateModified,
            dateModified,
            articleBody: elem.content,
            image: {
                '@type': 'ImageObject',
                url: PLACEHOLDER
            },
            author: {
                '@type': 'PERSON',
                name: authors.join(',')
            },
            publisher: {
                name: 'LA NACION',
                '@type': 'Organization'
            }
        };
    });
};

const SnippetLiveblog = props => {
    const { siteProperties, globalContent, contextPath, deployment } = props;

    const {
        canonical_url: canonicalUrl,
        headlines,
        subheadlines,
        first_publish_date: firstPublishDate,
        display_date: displayDate
    } = globalContent || {};

    const { promo_items: promoItems } = addRelatedImage(globalContent);

    const PLACEHOLDER = getAssetsPath(contextPath)(deployment)(
        'placeholderLN-600_amp.jpg'
    );

    const { image } = extractDataFromPromoItems(promoItems, PLACEHOLDER);

    const url = `${siteProperties.host}${canonicalUrl || ''}`;
    const blogObjects = buildBlogObjects(globalContent, url, PLACEHOLDER);
    const converageStart = new Date(firstPublishDate);
    const coverageEnd = addHours(12, displayDate);
    const noteTitle =
        headlines &&
        `${headlines.meta_title || headlines.basic || 'LA NACION - Noticia'}`;
    const noteDescription = subheadlines && subheadlines.basic;

    const data = {
        '@context': urlShema,
        '@type': 'LiveBlogPosting',
        publisher: {
            '@type': 'Organization',
            name: `${siteProperties.title || ''}`,
            url: `${siteProperties.host || ''}`,
            logo: {
                '@context': urlShema,
                '@type': 'ImageObject',
                url: `${PLACEHOLDER}`,
                height: 60,
                width: 600
            }
        },
        about: {
            '@type': 'Event',
            name: noteTitle,
            startDate: converageStart,
            endDate: coverageEnd,
            location: {
                '@type': 'place',
                name: 'LA NACION',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Buenos Aires',
                    addressRegion: 'AR'
                }
            },
            description: noteDescription,
            image
        },
        url,
        '@id': '#liveBlogPosting',
        description: noteDescription,
        coverageStartTime: converageStart,
        coverageEndTime: coverageEnd,
        headline: noteTitle,
        liveBlogUpdate: blogObjects
    };

    return <SnippetRender id="Schema_LiveBlog" data={data} />;
};

SnippetLiveblog.propTypes = {
    siteProperties: PropTypes.shape.isRequired,
    globalContent: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
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
        first_publish_date: PropTypes.string,
        last_updated_date: PropTypes.string,
        canonical_url: PropTypes.string
    }).isRequired,
    deployment: PropTypes.func.isRequired,
    contextPath: PropTypes.string.isRequired
};

export default SnippetLiveblog;
