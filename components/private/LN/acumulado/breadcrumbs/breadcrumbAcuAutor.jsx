import React from 'react';
import BreadCrumbBase from '../../common/breadcrumbBase';

function BreadcrumbAcuAutor({ author }) {
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

export default BreadcrumbAcuAutor;
