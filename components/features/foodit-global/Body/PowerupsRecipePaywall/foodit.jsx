import React from 'react';

import { getListsFromPowerup } from '../PowerupsReceta/_helper';
import get from '../../../../private/common/utils/get';

import { Ingredients } from '../PowerupsReceta/ingredientsBox/ingredients';

export function PowerupsRecipePaywall({ article = {} }) {
    const {
        promo_items: promoItems = [],
        content_elements: contentElements = [],
        _id = ''
    } = article;

    const { counterPortion } = get(promoItems, 'receta.embed.config', {});

    const { ingredientsLists } = getListsFromPowerup(contentElements);

    return (
        <div className="bg-positive flex flex-column gap-16 gap-24_md gap-32_lg p-16 p-24_md p-32_lg">
            <Ingredients
                articleId={_id}
                ingredientsLists={ingredientsLists}
                portions={counterPortion}
                showButton={false}
                showButtonsConversor
            />
        </div>
    );
}
