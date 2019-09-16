import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../resources/dist/css/ln/components/breadcrumb.css';

const breadcrumbBase = ({ sections, extraClasses }) => {
    const listSections = sections.map(section => {
        return (
            <a key={section.path} href={section.path}>
                {section.name}
            </a>
        );
    });
    return (
        <nav className={`com-breadcrumb ${extraClasses}`}>{listSections}</nav>
    );
};

breadcrumbBase.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            path: PropTypes.string
        })
    ).isRequired
};

export default breadcrumbBase;
