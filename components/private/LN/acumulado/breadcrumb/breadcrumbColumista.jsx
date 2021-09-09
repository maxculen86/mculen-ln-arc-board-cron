/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
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
            name: 'Todos los Columnistas'
        }
    ];
    return (
        <>
            <BreadCrumbBase sections={sections} dataSection={DATA_SECTION} />
            <BreadCrumbSchema sections={sections} host={host} />
        </>
    );
}

BreadcrumbColumnista.propTypes = {
    host: PropTypes.string,
    requestUri: PropTypes.string
};

export default BreadcrumbColumnista;
