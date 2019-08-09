import React from 'react';
import PropTypes from 'prop-types';
import ArticleItem from './articleItem';
import articleFiltered from '../../../../../content/filters/LN/nota/articleFiltered';
import withArticlesData from '../common/hocs/withArticlesData';

const ArticleList = props => {
    const { articles } = props;
    return articles.map(e => <ArticleItem e={e} />);
};

export default withArticlesData(ArticleList, articleFiltered);
