import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';

function BreadcrumbAutor({ author, host }) {
    const sections = [
        {
            path: '/',
            name: 'LA NACION'
        },
        {
            path: '/autores',
            name: 'Autores'
        },
        {
            path: `/autores/${author._id}`,
            name: author.byline
        }
    ];
    return (
        <>
            <BreadCrumbBase sections={sections} />
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
