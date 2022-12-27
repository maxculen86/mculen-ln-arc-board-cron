import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';

const DATA_SECTION = 'AperturaAcuRecetas';
function BreadcrumbAutor({ author = {}, host }) {
    const sections = [
        {
            path: host || '/',
            name: 'LA NACION'
        },
        {
            path: `/autor/${author._id || ''}`,
            name: author.byline || ''
        }
    ];
    return (
        <>
            <BreadCrumbBase
                sections={sections}
                lastLinked
                dataSection={DATA_SECTION}
            />
            <BreadCrumbSchema sections={sections} host={host} />
        </>
    );
}

BreadcrumbAutor.propTypes = {
    author: PropTypes.shape({
        _id: PropTypes.string,
        byline: PropTypes.string
    }).isRequired,
    host: PropTypes.string.isRequired
};

export default BreadcrumbAutor;
