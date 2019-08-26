import React from 'react';
import '../../../../../assets/bundles/css/ln/components/ranking.css';
import PropTypes from 'fusion:prop-types';
import TitleSection from '../titles/titleSection';
import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';

// mock array
import { articles } from './mock';

const Ranking = props => {
    const articleList = () => {
        // TODO: pasarle el objeto con la receta (articleData)
        console.log('articulos: ', articles);
        return articles.map(article => (
            <ArticleMain border articleData={article} />
        ));
    };

    return (
        <div className="com-ranking hlp-none hlp-tablet-none">
            <TitleSection size="m" text="Recetas más leídas" />
            <OrderedList items={articleList()} />
        </div>
    );
};

/*Ranking.propTypes = {
    recipes: PropTypes.shape.isRequired
};*/

export default Ranking;
