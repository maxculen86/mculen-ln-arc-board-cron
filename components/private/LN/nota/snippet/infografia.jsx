/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';

const SnippetInfografia = props => {
    const {
        requestUri,
        siteProperties,
        globalContent: {
            headlines,
            taxonomy: {
                primary_section: primarySection,
                seo_keywords: seoKeywords
            },
            promo_items: promoItems,
            credits: { by },
            created_date: createdDate,
            first_publish_date: firstPublishDate,
            display_date: displayDate
        },
        contextPath,
        deployment
    } = props;
    const LOGO_AMP = getAssetsPath(contextPath)(deployment)('logo-ln-amp.png');
    const { path, name } = primarySection || {};

    const authors = by
        ? by
              .filter(v => v.type === 'author')
              .map(v => v.name)
              .join(', ')
        : [];

    const data = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: `${headlines.basic || 'LA NACION - Noticia'}`,
        url: `${siteProperties.host}${requestUri || ''}`,

        dateCreated: `${new Date(createdDate).toUTCString() || ''}`,
        datePublished: `${new Date(firstPublishDate).toUTCString() || ''}`,
        dateModified: `${new Date(displayDate).toUTCString() || ''}`,
        mainEntityOfPage: `${siteProperties.host}${path || ''}`,
        articleSection: `${name || ''}`,
        isAccessibleForFree: '',
        hasPart: {
            '@type': '',
            isAccessibleForFree: '',
            cssSelector: '.nota'
        },
        isPartOf: {
            '@type': ['CreativeWork', 'Product'],
            name: '',
            productID: ''
        },
        author: `${authors || ''}`,
        creator: `${authors || ''}`,
        keywords: `${seoKeywords || ''}`,
        publisher: {
            '@type': 'Organization',
            name: `${siteProperties.title || ''}`,
            url: `${siteProperties.host || ''}`,
            logo: {
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                url: `${LOGO_AMP}`,
                height: 41,
                width: 391
            }
        }
    };

    if (promoItems) {
        if (promoItems.basic && promoItems.basic.type === 'image') {
            data.thumbnailUrl = `${promoItems.basic.url || ''}`;
            data.image = {
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                url: `${promoItems.basic.url || ''}`,
                height: `${promoItems.basic.height || ''}`,
                width: `${promoItems.basic.width || ''}`
            };
        }
    }

    SnippetInfografia.propTypes = {
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
                seo_keywords: PropTypes.arrayOf(PropTypes.string)
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
            display_date: PropTypes.string
        }).isRequired,
        deployment: PropTypes.func.isRequired,
        contextPath: PropTypes.string.isRequired
    };

    return (
        <>
            <SnippetRender data={data} />
        </>
    );
};

export default SnippetInfografia;
