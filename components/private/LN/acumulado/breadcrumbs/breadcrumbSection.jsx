import React from 'react';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import WithNavigation from '../../common/hocs/WithNavigation';

function BreadcrumbSection({ sections, siteProperties }) {
    return (
        <>
            <BreadCrumbBase sections={sections} />
            <BreadCrumbSchema
                sections={sections}
                host={siteProperties.shareConfig.host}
            />
        </>
    );
}

export default WithNavigation(BreadcrumbSection);
