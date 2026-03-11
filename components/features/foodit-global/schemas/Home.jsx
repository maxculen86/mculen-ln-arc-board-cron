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
                '@context': 'http://schema.org',
                '@type': 'WebSite',
                name: 'Foodit',
                description: metaValue('description') || 'Foodit',
                image: `${SITE_FOODIT}${image}`,
                url: `${SITE_FOODIT}/`
            }}
        />
    );
}
