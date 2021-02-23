import React from 'react';
import PropTypes from 'fusion:prop-types';
import addRelatedImage from '../utils/addRelatedImage';

const WithRelatedImages = WrappedComponent => props => {
    const { articles } = props;
    const articleList = articles?.map(article => {
        return addRelatedImage(article);
    });
    return <WrappedComponent articles={articleList || articles} />;
};

WithRelatedImages.propTypes = {
    WrappedComponent: PropTypes.func.isRequired
};

export default WithRelatedImages;
