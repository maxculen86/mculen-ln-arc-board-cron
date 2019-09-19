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
            path: `/${author._id}`,
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
        id: PropTypes.string,
        name: PropTypes.string
    }).isRequired
};

export default BreadcrumbAutor;
