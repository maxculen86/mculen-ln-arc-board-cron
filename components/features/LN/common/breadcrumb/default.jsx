import React from 'react';
import Static from 'fusion:static';
import BreadcrumbBase from './BreadcrumbBase';
import BreadcrumbSchema from './BreadcrumbSchema';
import buildBreadcrumbSections from './helpers/buildBreadcrumbSections';

function Breadcrumb({
    globalContent: {
        taxonomy: { primary_section: primarySection, sections }
    } = {},
    siteProperties: { title: siteTitle, host },
    ...props
}) {
    const allSections = buildBreadcrumbSections({
        sections,
        primarySection,
        siteTitle
    });

    return (
        <Static id="LN-breadcrumb-article" htmlOnly>
            <BreadcrumbBase
                sections={allSections}
                lastLinked
                host={host}
                {...props}
            />
            <BreadcrumbSchema sections={allSections} />
        </Static>
    );
}

export default Breadcrumb;
