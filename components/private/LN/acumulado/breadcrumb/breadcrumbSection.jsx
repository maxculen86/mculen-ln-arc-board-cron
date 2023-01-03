import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import WithNavigation from '../../common/hocs/WithNavigation';
import StaticContent from '../../../common/staticContent';

const DATA_SECTION = 'AperturaAcuRecetas';
function BreadcrumbSection({ sections, host, colorCategory }) {
    return (
        <StaticContent>
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
        </StaticContent>
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
    host: PropTypes.string.isRequired,
    colorCategory: PropTypes.string
};

BreadcrumbSection.defaultProps = {
    colorCategory: ''
};

export default WithNavigation(BreadcrumbSection);
