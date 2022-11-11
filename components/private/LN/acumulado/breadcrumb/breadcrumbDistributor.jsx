import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import StaticContent from '../../../common/staticContent';

const DATA_SECTION = 'AperturaAcuRecetas';
function BreadcrumbDistributor({ name, canonicalUrl, host }) {
    const sections = [
        {
            path: host || '/',
            name: 'LA NACION'
        },
        {
            path: canonicalUrl,
            name
        }
    ];

    return (
        <StaticContent>
            <BreadCrumbBase sections={sections} dataSection={DATA_SECTION} />
            <BreadCrumbSchema sections={sections} host={host} />
        </StaticContent>
    );
}

BreadcrumbDistributor.propTypes = {
    canonicalUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired
};

export default BreadcrumbDistributor;
