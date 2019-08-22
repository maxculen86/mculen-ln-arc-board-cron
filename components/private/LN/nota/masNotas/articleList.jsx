import React from 'react';
import PropTypes from 'prop-types';
import ArticleMain from '../../common/articleTypes/articleMain';
import articleFiltered from '../../../../../content/filters/LN/nota/articleFiltered';
import withArticlesData from '../common/hocs/withArticlesData';

const ArticleList = props => {
    const { articles } = props;
    if (!articles) return null;
    return articles.content_elements.map(e => (
        <ArticleMain articleData={e} border={true} />
    ));
};

export default withArticlesData(ArticleList);
