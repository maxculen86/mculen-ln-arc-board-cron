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
    formatDateTreeHoursMore
} from '../../../common/utils/dateAndTimeUtil';

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
            datePublished: formatDateTreeHoursMore(dateModified),
            dateModified: formatDateTreeHoursMore(dateModified),
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
        last_updated_date: lastUpdatedDate
    } = globalContent || {};

    const PLACEHOLDER = getAssetsPath(contextPath)(deployment)(
        'placeholderLN.jpg'
    );

    const url = `${siteProperties.host}${canonicalUrl || ''}`;

    const blogObjects = buildBlogObjects(globalContent, url, PLACEHOLDER);

    const data = {
        '@context': 'https://schema.org',
        '@type': 'LiveBlogPosting',
        publisher: {
            '@type': 'Organization',
            name: `${siteProperties.title || ''}`,
            url: `${siteProperties.host || ''}`,
            logo: {
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                url: `${PLACEHOLDER}`,
                height: 41,
                width: 391
            }
        },
        url,
        '@id': '#liveBlogPosting',
        description: subheadlines && subheadlines.basic,
        coverageStartTime: formatDateTreeHoursMore(new Date(firstPublishDate)),
        coverageEndTime: formatDateTreeHoursMore(new Date(lastUpdatedDate)),
        name:
            headlines &&
            `${headlines.meta_title ||
                headlines.basic ||
                'LA NACION - Noticia'}`,
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
