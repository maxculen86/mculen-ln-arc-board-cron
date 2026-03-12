import React from 'react';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import capitalizeFirstLetter from '../../../common/utils/capitalizeFirstLetter';

const DATA_SECTION = 'AperturaAcuRecetas';
function BreadcrumbTag({ tag, host }) {
    const sections = [
        {
            path: host || '/',
            name: 'LA NACION'
        },
        {
            path: `/tema/${tag.slug}`,
            name: capitalizeFirstLetter(tag.name)
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

export default BreadcrumbTag;
