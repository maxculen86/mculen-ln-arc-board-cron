/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadcrumbComponent from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import getDomain from '../../../common/utils/getDomain';

const getPrimaryTree = (sections, section, resultSections) => {
    if (section) {
        resultSections.push({
            name: section.name,
            path: section.path
        });

        section.parent_id &&
            section.parent_id !== '/' &&
            getPrimaryTree(
                sections,
                sections.find(parent => parent._id === section.parent_id),
                resultSections
            );
    }
};

const BreadcrumbArticle = ({
    globalContent: {
        taxonomy: { primary_section, sections },
        website_url,
        _id
    } = {},
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
    }).isRequired
};

export default BreadcrumbArticle;
