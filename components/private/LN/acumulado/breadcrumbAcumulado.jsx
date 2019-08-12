import React from 'react';
import BreadcrumbBase from '../common/breadcrumbBase';

export default function BreadcrumbAcumulado(props) {
    const sections = [];
    const baseSection = {
        path: '/',
        name: 'LA NACION'
    };
    sections.push(baseSection);

    return (
        <>
            <BreadcrumbBase sections={sections} />
        </>
    );
}
