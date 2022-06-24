/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import { addHours } from '../../../common/utils/dateAndTimeUtil';
import {
    extractDataFromPromoItems,
    urlShema
} from '../../common/utils/extractDataFromPromoItems';
import addRelatedImage from '../../common/utils/addRelatedImage';
import {
    generatePostObject,
    generatePostObjectWithoutPowerUp
} from '../../../common/utils/schema/liveBlog/generatePostObject';

const SnippetLiveblog = props => {
    const { siteProperties, globalContent, contextPath, deployment } = props;

    const {
        canonical_url: canonicalUrl,
        headlines,
        content_elements: contentElements,
        subheadlines,
        first_publish_date: firstPublishDate,
        display_date: displayDate
    } = globalContent || {};

    const { promo_items: promoItems } = addRelatedImage(globalContent);

    const PLACEHOLDER = getAssetsPath(contextPath)(deployment)(
        'placeholderLN-600_amp.jpg'
    );

    const checkForLiveBlogElements = contentElements.findIndex(elem => {
        const { subtype = 'default', type = '' } = elem;
        return type === 'custom_embed' && subtype === 'custom-liveblog';
    });
    console.log(
        '🚀 ~ file: liveblog.jsx ~ line 39 ~ checkForLiveBlogElements',
        checkForLiveBlogElements
    );

    const { image } = extractDataFromPromoItems(promoItems, PLACEHOLDER);

    const url = `${siteProperties.host}${canonicalUrl || ''}`;
    const blogObjects =
        checkForLiveBlogElements === -1
            ? generatePostObjectWithoutPowerUp(globalContent, url, PLACEHOLDER)
            : generatePostObject(globalContent, url, PLACEHOLDER);
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
