import React from 'react';
import SnippetRender from '../../../private/common/snippet/snippetRender';

const shouldNotRenderSchema = ['acumulado-chef', 'ficha-receta'];

export const BreadcrumbSchema = ({ sections = [], layout = '' }) => {
    if (shouldNotRenderSchema.includes(layout)) return <></>;

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
