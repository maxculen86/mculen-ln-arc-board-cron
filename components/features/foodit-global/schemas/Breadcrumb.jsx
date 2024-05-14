import React from 'react';

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

    return (
        <>
            <script type="application/ld+json" key={`schema-BreadcrumbList`}>
                {JSON.stringify(breadcrumbSchema)}
            </script>
        </>
    );
};
