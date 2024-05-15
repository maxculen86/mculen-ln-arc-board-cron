import React from 'react';

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

    return (
        <>
            <script type="application/ld+json" key={`schema-BreadcrumbList`}>
                {JSON.stringify(breadcrumbSchema)}
            </script>
        </>
    );
};
