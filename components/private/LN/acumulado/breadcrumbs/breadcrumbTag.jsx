import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadCrumbBase from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';

function BreadcrumbTag({ tag, host }) {
    const sections = [
        {
            path: '/',
            name: 'LA NACION'
        },
        {
            path: `/tema/${tag.slug}`,
            name: tag.text
        }
    ];
    return (
        <>
            <BreadCrumbBase sections={sections} />
            <BreadCrumbSchema sections={sections} host={host} />
        </>
    );
}

BreadcrumbTag.propTypes = {
    tag: PropTypes.shape({
        slug: PropTypes.string,
        text: PropTypes.string
    }).isRequired
};

export default BreadcrumbTag;
