import React from 'react';
import PropTypes from 'prop-types';
import ArticleMain from '../../common/articleTypes/articleMain';
import articleFiltered from '../../../../../content/filters/LN/nota/articleFiltered';
import withAcuArticlesData from '../../common/hocs/WithAcuArticlesData';

const ArticleList = props => {
    const {
        articles,
        imageResizePresets,
        globalContent: { promo_items }
    } = props;

    if (!articles) return null;

    const articleId = promo_items.basic._id;
    const articlesArray = articles.filter(article => {
        if (article.promo_items.hasOwnProperty('receta')) {
            return article.promo_items.basic._id !== articleId;
        }
        return true;
    });

    return articlesArray.map(e => (
        <ArticleMain imageResizePresets={imageResizePresets} articleData={e} />
    ));
};

export default withAcuArticlesData(ArticleList, null, 'notaM');
