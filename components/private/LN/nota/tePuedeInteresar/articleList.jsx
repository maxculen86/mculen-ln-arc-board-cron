import React from 'react';
import Article from './article';

const ArticleList = props => {
    const { articles } = props;
    return articles.map(article => <Article articleData={article} />);
};

export default ArticleList;
