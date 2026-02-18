import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { isEmptyString } from '../../../../private/common/utils/dataValidation';

function BreadcrumbSchema({ sections, host = SITE_LANACION }) {
    const validSections = sections.filter(
        section => !isEmptyString(section?.name)
    );

    if (validSections.length === 0) {
        return null;
    }

    const [first, ...rest] = validSections;

    const parent = [
        {
            '@type': 'ListItem',
            position: 1,
            name: first.name,
            item: SITE_LANACION
        }
    ];

    const children = rest.map((el, i) => {
        const path =
            (el.path &&
                el.path.split('?')[0] +
                    (el.path.split('?')[0].slice(-1) !== '/' ? '/' : '')) ||
            '';
        const escapedName = el.name.replace(/"/g, '\\"');

        return `
                {
                    "@type": "ListItem",
                    "position": ${i + 2},
                    "name": "${escapedName}",
                    "item": "${host + path}"
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
