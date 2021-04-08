import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import WithNavigation from '../../common/hocs/WithNavigation';

const DATA_SECTION = 'AperturaAcuRecetas';
function BreadcrumbSection({ sections, host, colorCategory }) {
    return (
        <>
            <BreadCrumbBase
                lastLinked
                sections={sections}
                dataSection={DATA_SECTION}
                host={host}
                colorCategory={colorCategory}
            />
            <BreadCrumbSchema
                sections={sections}
                host={host}
                colorCategory={colorCategory}
            />
        </>
    );
}

BreadcrumbSection.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            path: PropTypes.string
        })
    ).isRequired,
    host: PropTypes.string.isRequired
};

export default WithNavigation(BreadcrumbSection);
