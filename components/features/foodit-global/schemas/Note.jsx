import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

import get from '../../../private/common/utils/get';
import { fooditSchemaLogo } from './_helpers';
import { getFooditAuthor } from '../common/utils/notaFooditHelper';
import replaceBaseUrl from '../common/utils/replaceBaseUrl';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';

export const StorytellingSchema = ({ article = {} }) => {
    const { contextPath, deployment } = useAppContext();
    const {
        promo_items = {},
        headlines = {},
        additional_properties = {},
        subheadlines = {},
        canonical_url = ''
    } = article;
    const author = getFooditAuthor(article);

    const title = get(headlines, 'basic', '');
    const subheadline = get(subheadlines, 'basic');

    const { resized_urls = [] } = replaceBaseUrl(get(promo_items, 'basic', {}));
    const { resizedUrl = '' } = getShortestImage(resized_urls);

    const recipeSchema = {
        '@context': 'http://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_FOODIT}${canonical_url}`
        },
        headline: `${title} - Foodit`,
        Image: {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            url: resizedUrl
        },
        datePublished: get(additional_properties, 'publish_date', ''),
        author: {
            '@type': 'Person',
            name: (author && author) || 'Redacción de Foodit'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Foodit',
            logo: fooditSchemaLogo(deployment, contextPath)
        },
        description: `${subheadline || title} - Foodit`
    };

    return (
        <>
            <script type="application/ld+json" key={`schema-NewsArticle`}>
                {JSON.stringify(recipeSchema)}
            </script>
        </>
    );
};
