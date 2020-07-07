import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadcrumbComponent from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import getDomain from '../../../common/utils/getDomain';

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
        taxonomy: { primary_section, sections },
        website_url,
        _id
    },
    siteProperties: { title: siteTitle, host },
    arcSite
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
    const domainForRecetas = getDomain(arcSite, { _id, website_url });

    return (
        <>
            <BreadcrumbComponent
                extraClasses=""
                sections={allSections}
                lastLinked
                host={host}
            />
            <BreadCrumbSchema sections={allSections} host={domainForRecetas} />
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
