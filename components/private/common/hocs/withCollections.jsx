import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';

import get from '../utils/get';

const withColections = (WrappedComponent, filter, imageConfig) => props => {
    const { size = 2, idCollection: id, website = 'la-nacion-ar' } =
        props || {};

    if (!id) return null;

    const articleList = useContent({
        source: 'collectionsSource',
        query: {
            id,
            size,
            website
        },
        filter,
        imageConfig
    });

    const articles = get(articleList, 'content_elements', null);

    return (
        articles &&
        articles.length >= size && (
            <WrappedComponent articles={articles.splice(0, size)} />
        )
    );
};

withColections.propTypes = {
    WrappedComponent: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    imageConfig: PropTypes.string.isRequired
};

export default withColections;
