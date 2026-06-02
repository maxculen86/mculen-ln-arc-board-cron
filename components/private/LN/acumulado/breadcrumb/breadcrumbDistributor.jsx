import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';

const DATA_SECTION = 'AperturaAcuRecetas';
function BreadcrumbDistributor({ name, requestUri }) {
    const sections = [
        {
            path: SITE_LANACION || '/',
            name: 'LA NACION'
        },
        {
            path: requestUri,
            name
        }
    ];

    return (
        <>
            <BreadCrumbBase sections={sections} dataSection={DATA_SECTION} />
            <BreadCrumbSchema sections={sections} />
        </>
    );
}

export default BreadcrumbDistributor;
