import React from 'react';

function BreadcrumbSchema({ sections, host }) {
    let items = sections
        .map((el, i) => {
            return `
        {
            "@type": "ListItem",
            "position": ${i + 1},
            "name": "${el.name}",
            "item": "${host + el.path}"
        }`;
        })
        .join(',');
    return (
        <script type="application/ld+json">
            {`{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [${items}]
            }`}
        </script>
    );
}

export default BreadcrumbSchema;
