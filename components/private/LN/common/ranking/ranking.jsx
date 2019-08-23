import React from 'react';
import '../../../../../assets/bundles/css/ln/components/ranking.css';
import TitleSection from '../titles/titleSection';
import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';

const Ranking = props => {
    const recipes = () => {
        // TODO: pasarle el objeto con la receta (articleData)
        return props.recipes.map(recipe => <ArticleMain border={true} />);
    };

    return (
        <div className="com-ranking hlp-none hlp-tablet-none">
            <TitleSection size="m" text="Recetas más leídas" />
            <OrderedList items={recipes} />
        </div>
    );
};

export default Ranking;
