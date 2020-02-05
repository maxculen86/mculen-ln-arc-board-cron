import React from 'react';
import BreadCrumbBase from '../../common/breadcrumbBase';

function BreadcrumbAutorColumnista(props) {
    const { customFields, host, title } = props;
    const sections = [
        {
            path: host || '/',
            name: title
        },
        {
            name: customFields.sectionName
        }
    ];
    return (
        <>
            <BreadCrumbBase sections={sections} host={host} />
        </>
    );
}

export default BreadcrumbAutorColumnista;
