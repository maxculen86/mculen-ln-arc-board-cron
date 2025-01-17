import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient';
import { groupRecipeIngredients } from '../../shoppingList/groupRecipeIngredients';

function MapperIngredientList({ list = [], isTabIngredients }) {
    if (!list.length) return null;

    // Group and format ingredients for the "Tab Ingredients" view
    const formattedResults = useMemo(() => {
        if (isTabIngredients) {
            return groupRecipeIngredients(list);
        }
        return [];
    }, [list, isTabIngredients]);

    // Render list items
    const renderIngredient = (item, keyPrefix) => (
        <Ingredient
            key={`${keyPrefix}-${item.ingredient || item.name}-${item.unit || ''}`}
            item={item}
            typeList={item.typeList || ''}
            isTabIngredients={isTabIngredients}
        />
    );

    return (
        <ul className="flex flex-column gap-8 pt-24">
            {!isTabIngredients
                ? list.map(({ items = [], typeList = '' }) =>
                      items.map(item => renderIngredient(item, typeList))
                  )
                : formattedResults.map(item =>
                      renderIngredient(item, 'formatted')
                  )}
        </ul>
    );
}

MapperIngredientList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            typeList: PropTypes.string.isRequired,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    amount: PropTypes.string,
                    unit: PropTypes.string.isRequired,
                    ingredient: PropTypes.string.isRequired,
                    abbreviation: PropTypes.string
                })
            ).isRequired
        })
    ).isRequired,
    isTabIngredients: PropTypes.bool
};

MapperIngredientList.defaultProps = {
    isTabIngredients: false
};

export default MapperIngredientList;
