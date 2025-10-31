/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import BreadcrumbComponent from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';

const getPrimaryTree = (sections, section, resultSections) => {
    if (section) {
        resultSections.push({
            name: section.name,
            path: section.path
        });
        if (section.parent_id && section.parent_id !== '/') {
            getPrimaryTree(
                sections,
                sections.find(parent => parent._id === section.parent_id),
                resultSections
            );
        }
    }
};

function BreadcrumbArticle({
    globalContent: { taxonomy: { primary_section, sections } } = {},
    siteProperties: { title: siteTitle, host },
    className = '',
    ...props
}) {
    let allSections = [];
    if (primary_section) {
        getPrimaryTree(sections, primary_section, allSections);
    }
    allSections.push({
        name: siteTitle,
        path: '/'
    });
    allSections = allSections.reverse();

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
