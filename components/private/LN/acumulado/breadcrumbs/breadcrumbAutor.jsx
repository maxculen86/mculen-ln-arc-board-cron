import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadCrumbBase from '../../common/breadcrumbBase';

function BreadcrumbAutor({ author }) {
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
            path: author.id,
            name: author.name
        }
    ];
    return (
        <>
            <BreadCrumbBase sections={sections} />
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
