import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';

import get from '../../../common/utils/get';

const withCollections = (WrappedComponent, filter, imageConfig) => props => {
    const { size = 2, website = 'la-nacion-ar', idCollection: id } =
        props || {};

    if (!id) return null;

    const articleList = useContent(
        id
            ? {
                  source: 'collectionsSource',
                  query: {
                      id: id.trim(),
                      size,
                      website
                  },
                  filter,
                  imageConfig
              }
            : {}
    );
    const articles = get(articleList, 'content_elements', null);
    const result =
        articles && articles.length >= size
            ? articles.splice(0, size)
            : articles;

    return <WrappedComponent {...props} articles={result || null} />;
};

withCollections.propTypes = {
    WrappedComponent: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    imageConfig: PropTypes.string.isRequired
};

export default withCollections;
