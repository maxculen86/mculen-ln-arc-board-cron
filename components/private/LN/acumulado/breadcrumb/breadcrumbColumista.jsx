import React from 'react';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';

const DATA_SECTION = 'AperturaAcuRecetas';
function BreadcrumbColumnista({ host, requestUri }) {
    const sections = [
        {
            path: host || '/',
            name: 'LA NACION'
        },
        {
            path: requestUri,
            name: 'Columnistas'
        }
    ];
    return (
        <>
            <BreadCrumbBase sections={sections} dataSection={DATA_SECTION} />
            <BreadCrumbSchema sections={sections} host={host} />
        </>
    );
}

export default BreadcrumbColumnista;
