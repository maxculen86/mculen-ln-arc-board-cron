import React from 'react';
import PropTypes from 'fusion:prop-types';
import TaxonomyComponent from '../../common/taxonomyImportantList';

const Tags = ({ tags, destacado }) => {
    const listTags = tags.map(x => {
        return {
            path: x.slug,
            text: x.text
        };
    });
    return <TaxonomyComponent list={listTags} destacado={destacado} />;
};

Tags.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            slug: PropTypes.string,
            text: PropTypes.string
        })
    ).isRequired,
    destacado: PropTypes.boolean.isRequired
};

export default Tags;
