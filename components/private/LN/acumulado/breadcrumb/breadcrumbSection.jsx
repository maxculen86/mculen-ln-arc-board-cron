import React from 'react';
import { useContent } from 'fusion:content';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';

const DATA_SECTION = 'AperturaAcuRecetas';
function BreadcrumbSection({ sectionId, host, colorCategory }) {
    const { sections } = useContent({
        sourceName: 'navigationTreeSource',
        query: {
            website: 'la-nacion-ar',
            sectionId
        },
        staticMode: true
    }) || { sections: [] };

    return (
        <>
            <BreadCrumbBase
                lastLinked
                sections={sections}
                dataSection={DATA_SECTION}
                host={host}
                colorCategory={colorCategory}
            />
            <BreadCrumbSchema
                sections={sections}
                host={host}
                colorCategory={colorCategory}
            />
        </>
    );
}

export default BreadcrumbSection;
