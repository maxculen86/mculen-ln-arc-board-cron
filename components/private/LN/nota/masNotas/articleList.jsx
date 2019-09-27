import React from 'react';
import PropTypes from 'prop-types';
import ArticleMain from '../../common/articleTypes/articleMain';
import articleFiltered from '../../../../../content/filters/LN/nota/articleFiltered';
import withAcuArticlesData from '../../common/hocs/WithAcuArticlesData';

const ArticleList = props => {
    const {
        articles,
        globalContent: { promo_items }
    } = props;

    if (!articles) return null;

    return articles.map(e => <ArticleMain articleData={e} border />);
};

export default withAcuArticlesData(ArticleList, null, 'notaM');
