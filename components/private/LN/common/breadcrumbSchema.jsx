import React from 'react';
import PropTypes from 'fusion:prop-types';

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
    return <script type="application/ld+json" dangerouslySetInnerHTML={data} />;
}

BreadcrumbSchema.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            path: PropTypes.string
        })
    ),
    host: PropTypes.string
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
