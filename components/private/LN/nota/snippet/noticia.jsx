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
            subheadlines,
            taxonomy: { primary_section, seo_keywords, tags },
            promo_items,
            credits: { by },
            created_date,
            first_publish_date,
            display_date,
            content_elements
        }
    } = props;

    const authors = by
        ? by
              .filter(v => v.type === 'author')
              .map(v => v.name)
              .join(', ')
        : [];

    //const tags = tags.map(tag => tag.text). join(', ');

    console.log('################### PROPS SNIPPET ################# ', props);

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

    return (
        <>
            <SnippetRender data={data} />
        </>
    );
};

export default SnippetNoticia;
