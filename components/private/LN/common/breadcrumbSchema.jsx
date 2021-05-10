import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';

function BreadcrumbSchema({ sections, host }) {
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
        const slash = el.path && el.path.slice(-1) !== '/' ? '/' : '';
        return `
                {
                    "@type": "ListItem",
                    "position": ${i + 2},
                    "name": "${el.name}",
                    "item": "${host +
                        (host.includes('/recetas') ? '' : el.path) +
                        slash}"
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

BreadcrumbSchema.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            path: PropTypes.string
        })
    ).isRequired,
    host: PropTypes.string.isRequired
};

// BreadcrumbSchema.defaultProps = {
//     sections: [
//         {
//             name: undefined,
//             path: undefined
//         }
//     ],
//     host: ''
// };

export default BreadcrumbSchema;
