import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadcrumbComponent from '../../../common/breadcrumbBase';
import BreadCrumbSchema from '../../../common/breadcrumbSchema';

const getPrimaryTree = (sections, section, resultSections) => {
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
};

const breadcrumbArticle = ({
    globalContent: {
        taxonomy: { primary_section, sections }
    },
    siteProperties: { title: siteTitle, shareConfig }
}) => {
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
                extraClasses=""
                sections={allSections}
                lastLinked
            />
            <BreadCrumbSchema sections={allSections} host={shareConfig.host} />
        </>
    );
};

breadcrumbArticle.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.array.isRequired,
            primary_section: PropTypes.object
        }).isRequired
    }).isRequired,
    siteProperties: PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired
};

export default breadcrumbArticle;
