import React, { useMemo } from 'react';
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

export default MapperIngredientList;
