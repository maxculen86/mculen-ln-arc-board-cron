/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';

const SnippetNoticia = props => {
    const {
        requestUri,
        siteProperties,
        globalContent: {
            headlines,
            taxonomy: { primary_section, seo_keywords },
            promo_items,
            credits: { by },
            created_date,
            first_publish_date,
            display_date
        }
    } = props;

    const authors = by
        ? by
              .filter(v => v.type === 'author')
              .map(v => v.name)
              .join(', ')
        : [];

    //console.log('################### PROPS SNIPPET ################# ', props);

    const data = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: `${headlines.basic}`,
        url: `${siteProperties.host}${requestUri}`,
        thumbnailUrl: `${promo_items.basic.url}`,
        image: {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            url: `${promo_items.basic.url}`,
            height: `${promo_items.basic.height}`,
            width: `${promo_items.basic.width}`
        },
        dateCreated: `${new Date(created_date).toUTCString()}`,
        datePublished: `${new Date(first_publish_date).toUTCString()}`,
        dateModified: `${new Date(display_date).toUTCString()}`,
        mainEntityOfPage: `${siteProperties.host}${primary_section.path}`,
        articleSection: `${primary_section.name}`,
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
        author: authors,
        creator: authors,
        keywords: seo_keywords,
        publisher: {
            '@type': 'Organization',
            name: `${siteProperties.title}`,
            url: `${siteProperties.host}`,
            logo: {
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                url:
                    'https://static.lanacion.com.ar/v1/ln/imgs/layout/logos/logo-ln-amp.png',
                height: 41,
                width: 391
            }
        }
    };

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
                seo_keywords: PropTypes.arrayOf(PropTypes.string)
            }),
            promo_items: PropTypes.shape({
                basic: PropTypes.shape({
                    url: PropTypes.string,
                    height: PropTypes.number,
                    width: PropTypes.number
                })
            }),
            credits: PropTypes.shape({
                by: PropTypes.shape({
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
            }),
            created_date: PropTypes.string,
            first_publish_date: PropTypes.string,
            display_date: PropTypes.string
        }).isRequired
    };

    return (
        <>
            <SnippetRender data={data} />
        </>
    );
};

export default SnippetNoticia;
