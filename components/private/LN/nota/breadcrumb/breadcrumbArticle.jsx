/* eslint-disable camelcase */
import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import BreadcrumbComponent from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';

import buildBreadcrumbSections from '../../../../features/LN/common/breadcrumb/helpers/buildBreadcrumbSections';

function BreadcrumbArticle({
    globalContent: { taxonomy: { primary_section, sections } } = {},
    siteProperties: { title: siteTitle, host },
    className = '',
    ...props
}) {
    const allSections = buildBreadcrumbSections({
        sections,
        primarySection: primary_section,
        siteTitle
    });

    return (
        <>
            <BreadcrumbComponent
                extraClasses={className}
                sections={allSections}
                lastLinked
                host={host}
                {...props}
            />
            <BreadCrumbSchema sections={allSections} host={SITE_LANACION} />
        </>
    );
}

export default BreadcrumbArticle;
