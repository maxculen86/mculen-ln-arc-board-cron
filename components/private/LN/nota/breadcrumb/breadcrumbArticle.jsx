/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
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

BreadcrumbArticle.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.array.isRequired,
            primary_section: PropTypes.object
        }).isRequired,
        website_url: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        siteService: PropTypes.shape({
            tooltips: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    label: PropTypes.string
                })
            )
        })
    }).isRequired,
    siteProperties: PropTypes.shape({
        title: PropTypes.string.isRequired,
        host: PropTypes.string.isRequired
    }).isRequired,
    className: PropTypes.string
};

BreadcrumbArticle.defaultProps = {
    className: ''
};

export default BreadcrumbArticle;
