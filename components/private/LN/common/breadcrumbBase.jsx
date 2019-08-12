import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../assets/bundles/css/ln/components/breadcrumb.css';

const breadcrumbBase = props => {
    const { sections } = props;
    const listSections = sections.map(section => {
        return (
            <a key={section.path} href={section.path}>
                {section.name}
            </a>
        );
    });

    return (
        <nav className="com-breadcrumb hlp-marginBottom-40">{listSections}</nav>
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
