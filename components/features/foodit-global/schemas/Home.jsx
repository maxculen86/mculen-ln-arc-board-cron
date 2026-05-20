import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import SnippetRender from '../../../private/common/snippet/snippetRender';

export function HomeSchema(props) {
    const { metaValue, contextPath, deployment } = props;
    const image = deployment(
        `${contextPath}/resources/foodit/assets/images/placeholderFoodit.jpg`
    );

    return (
        <SnippetRender
            id="website-schema"
            data={{
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${SITE_FOODIT}/#website`,
                name: 'Foodit',
                description: metaValue('description') || 'Foodit',
                image: `${SITE_FOODIT}${image}`,
                url: `${SITE_FOODIT}/`,
                publisher: {
                    '@id': `${SITE_FOODIT}/#organization`
                },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${SITE_FOODIT}/chat/?query={search_term_string}`
                    },
                    'query-input': 'required name=search_term_string'
                }
            }}
        />
    );
}
