import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadcrumbComponent from '../../common/breadcrumbBase';

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
    siteProperties: { title: siteTitle }
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
        <BreadcrumbComponent
            extraClasses="hlp-marginBottom-40"
            sections={allSections.slice(0, 3)}
        />
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
