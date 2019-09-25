import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../resources/dist/css/ln/components/breadcrumb.css';

const BreadcrumbBase = ({ sections, extraClasses, dataSection }) => {
    const extraOpts = {};
    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    const listSections = sections.map(section => {
        return (
            <a key={section.path} href={section.path} {...extraOpts}>
                {section.name}
            </a>
        );
    });
    return (
        <nav className={`com-breadcrumb ${extraClasses || ''}`}>
            {listSections}
        </nav>
    );
};

BreadcrumbBase.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            path: PropTypes.string
        })
    ).isRequired,
    extraClasses: PropTypes.string,
    dataSection: PropTypes.string
};

BreadcrumbBase.defaultProps = {
    extraClasses: undefined,
    dataSection: undefined
};

export default BreadcrumbBase;
