import React from 'react';
import PropTypes from 'prop-types';
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

PrintIngredients.propTypes = {
    ingredientsList: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                fullIngredientString: PropTypes.string.isRequired
            })
        ).isRequired,
        titleList: PropTypes.string.isRequired
    }).isRequired
};

export default PrintIngredients;
