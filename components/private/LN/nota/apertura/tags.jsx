import React from 'react';
import TaxonomyComponent from '../../common/taxonomyImportantList';
import PropTypes from 'fusion:prop-types';

const tags = ({ tags, destacado }) => {
    const listTags = tags.map(x => {
        return {
            path: x.slug,
            text: x.text
        };
    });
    return <TaxonomyComponent list={listTags} destacado={destacado} />;
};

tags.propTypes = {
    listTags: PropTypes.array,
    listTags: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            path: PropTypes.string
        })
    ),
    destacado: PropTypes.boolean
};

export default tags;
