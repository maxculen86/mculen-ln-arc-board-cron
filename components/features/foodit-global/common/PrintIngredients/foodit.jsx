import React from 'react';
import { IngredientsSection } from '../../Body/PowerupsReceta/ingredientsBox/ingredientsSection';
import get from '../../../../private/common/utils/get';

function PrintIngredients({ ingredientsList }) {
    const { items = [], titleList = '' } = ingredientsList || {};
    const ingredientsNames = items.map(item =>
        get(item, 'fullIngredientString', '')
    );

    return (
        <IngredientsSection items={ingredientsNames} titleList={titleList} />
    );
}

export default PrintIngredients;
