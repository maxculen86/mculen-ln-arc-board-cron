import React from 'react';

import SnippetRender from '../../../private/common/snippet/snippetRender';

export const BreadcrumbSchema = ({ sections = [] }) => {
    const breadcrumbSchema = {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: sections.map(({ name, url }, index) => ({
            '@type': 'ListItem',
            position: index,
            item: {
                '@id': url,
                name
            }
        }))
    };

    return <SnippetRender id="breadcrumb-schema" data={breadcrumbSchema} />;
};
