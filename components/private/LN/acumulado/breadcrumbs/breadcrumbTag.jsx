import React from 'react';
import PropTypes from 'fusion:prop-types';
import BreadCrumbBase from '../../common/breadcrumbBase';

function BreadcrumbTag({ tag }) {
    const sections = [
        {
            path: '/',
            name: 'LA NACION'
        },
        {
            path: tag.slug,
            name: tag.text
        }
    ];
    return (
        <>
            <BreadCrumbBase sections={sections} />
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
