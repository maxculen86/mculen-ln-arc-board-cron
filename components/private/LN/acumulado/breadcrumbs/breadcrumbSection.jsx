import React from 'react';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import WithNavigation from '../../common/hocs/WithNavigation';

function BreadcrumbSection({ sections, host }) {
    return (
        <>
            <BreadCrumbBase sections={sections} />
            <BreadCrumbSchema sections={sections} host={host} />
        </>
    );
}

export default WithNavigation(BreadcrumbSection);
