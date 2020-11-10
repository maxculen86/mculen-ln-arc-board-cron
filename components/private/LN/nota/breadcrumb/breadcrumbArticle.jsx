import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadcrumbComponent from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import getDomain from '../../../common/utils/getDomain';
import get from '../../../common/utils/get';

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

const getTrust = (label, siteService) => {
    const { trustLabels } = siteService || {};
    const trust = get(label, 'trust.text', '');
    const trustFinded = trustLabels.find(t => t.text === trust);
    return trustFinded;
};

const breadcrumbArticle = ({
    globalContent: {
        taxonomy: { primary_section, sections },
        website_url,
        _id,
        label,
        siteService
    },
    siteProperties: { title: siteTitle, host }
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
    const domainForRecetas = getDomain({ _id, website_url });
    const trust = getTrust(label, siteService);

    return (
        <>
            <BreadcrumbComponent
                extraClasses=""
                sections={allSections}
                lastLinked
                host={host}
                trust={trust}
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
