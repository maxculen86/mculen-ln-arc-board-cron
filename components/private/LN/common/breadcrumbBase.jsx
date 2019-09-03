import React from 'react';
import PropTypes from 'fusion:prop-types';
import WithNavigation from './hocs/WithNavigation';

import '../../../../assets/bundles/css/ln/components/breadcrumb.css';

const breadcrumbBase = ({ sections, extraClasses }) => {
    console.log('SECTIONS:::', sections);
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

export default WithNavigation(breadcrumbBase);
