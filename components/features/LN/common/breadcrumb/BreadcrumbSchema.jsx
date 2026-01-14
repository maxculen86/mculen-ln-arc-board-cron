import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { isValidString } from '../../../../private/common/utils/dataValidation';

function BreadcrumbSchema({ sections }) {
    const parent = [{ ...sections.shift() }].reduce(
        (acc, val) => [
            {
                ...acc,
                '@type': 'ListItem',
                position: 1,
                name: val.name,
                item: SITE_LANACION
            }
        ],
        []
    );

    const children = sections.map((el, i) => {
        const path =
            (el.path &&
                el.path.split('?')[0] +
                    (el.path.split('?')[0].slice(-1) !== '/' ? '/' : '')) ||
            '';

        return `
                {
                    "@type": "ListItem",
                    "position": ${i + 2},
                    "name": "${isValidString(el.name) ? el.name.replace(/"/g, '\\"') : ''}",
                    "item": "${SITE_LANACION + path}"
                }
            `;
    });

    const items = [
        ...parent.map(el => JSON.stringify(el)),
        ...(children.length > 0 ? children : [])
    ];

    const data = {
        __html: `
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [${items}]
            }`
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={data} />;
}

export default BreadcrumbSchema;
