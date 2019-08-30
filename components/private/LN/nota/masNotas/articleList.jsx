import React from 'react';
import PropTypes from 'prop-types';
import ArticleMain from '../../common/articleTypes/articleMain';
import articleFiltered from '../../../../../content/filters/LN/nota/articleFiltered';
import withAcuArticlesData from '../../common/hocs/WithAcuArticlesData';

const ArticleList = props => {
    const { articles, imageResizePresets } = props;
    if (!articles) return null;
    return articles.map(e => (
        <ArticleMain
            imageResizePresets={imageResizePresets}
            articleData={e}
            border
        />
    ));
};

export default withAcuArticlesData(ArticleList, null, 'masNotas');
