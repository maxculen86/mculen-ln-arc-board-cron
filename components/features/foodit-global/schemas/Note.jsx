import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

import get from '../../../private/common/utils/get';
import { fooditSchemaLogo } from './_helpers';
import { getFooditAuthor } from '../common/utils/notaFooditHelper';
import replaceBaseUrl from '../common/utils/replaceBaseUrl';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import { getBreadcrumbSections } from '../common/breadcrumb/_helpers';

import SnippetRender from '../../../private/common/snippet/snippetRender';
import { BreadcrumbSchema } from './Breadcrumb';

export const StorytellingSchema = ({ globalContent = {} }) => {
    const { contextPath, deployment } = useAppContext();
    const {
        promo_items = {},
        headlines = {},
        additional_properties = {},
        subheadlines = {},
        canonical_url = ''
    } = globalContent;
    const author = getFooditAuthor(globalContent);

    const title = get(headlines, 'basic', '');
    const subheadline = get(subheadlines, 'basic');

    const { resized_urls = [] } = replaceBaseUrl(get(promo_items, 'basic', {}));
    const { resizedUrl = '' } = getShortestImage(resized_urls);

    const storyTellingSchema = {
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
            name: author || 'Redacción de Foodit'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Foodit',
            url: `${SITE_FOODIT}/`,
            logo: fooditSchemaLogo(deployment, contextPath)
        },
        description: `${subheadline || title} - Foodit`
    };

    return (
        <>
            <SnippetRender
                key="ficha-schema"
                id="ficha-schema"
                data={storyTellingSchema}
            />
            <BreadcrumbSchema sections={getBreadcrumbSections(globalContent)} />
        </>
    );
};
