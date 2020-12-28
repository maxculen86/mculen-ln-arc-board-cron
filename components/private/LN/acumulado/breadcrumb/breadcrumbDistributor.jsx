import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';

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
        <>
            <BreadCrumbBase sections={sections} dataSection={DATA_SECTION} />
            <BreadCrumbSchema sections={sections} host={host} />
        </>
    );
}

BreadcrumbDistributor.propTypes = {
    canonicalUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired
};

export default BreadcrumbDistributor;
