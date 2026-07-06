import React from 'react';

import SnippetRender from '../../../private/common/snippet/snippetRender';

export function BreadcrumbSchema({ sections = [] }) {
    const validSections = sections.filter(
        ({ disabled = false, url = '' }) => !disabled && url?.trim() !== ''
    );

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: validSections.map(({ name, url }, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@id': url,
                name
            }
        }))
    };

    return <SnippetRender id="breadcrumb-schema" data={breadcrumbSchema} />;
}
