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
    const data = {
        __html: `
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [${items}]
            }`
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={data}
        ></script>
    );
}

export default BreadcrumbSchema;
