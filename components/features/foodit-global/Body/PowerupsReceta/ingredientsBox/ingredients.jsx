import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/common-ui-text';
import get from '../../../../../private/common/utils/get';

import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../../auth/helper/loginHelper';
import { useIsInShoppingList } from './hooks/useIsInShoppingList';
import { IngredientsSection } from './ingredientsSection';
import ShoppingListButton from './shoppingListButton';
import { modifyPortionsQuantity } from './_helper';
import { IngredientsPortionsText } from './ingredientsPortionsText';
import { IngredientsButtons } from './ingredientsButtons';

function IngredientsTitle() {
    return (
        <Text
            as="h2"
            className="prumo prumo-light text-24 text-32_md text-36_lg"
        >
            Ingredientes
        </Text>
    );
}

const createIngredientSections = list => {
    const { items = [], titleList = '' } = list || {};
    const ingredientsNames = items.map(item =>
        get(item, 'fullIngredientString', '').toLowerCase()
    );

    return (
        <IngredientsSection
            key={titleList}
            items={ingredientsNames}
            titleList={titleList}
        />
    );
};

export function Ingredients({
    articleId,
    ingredientsLists = [],
    title,
    portions,
    showButton = true,
    showButtonsConversor = true
}) {
    const isSuscriptor = useMemo(
        () => isSubscribed(SUBSCRIBED_HELPER.FOODIT),
        []
    );

    const { bookmarkId, setBookmarkId } = useIsInShoppingList(
        isSuscriptor,
        articleId
    );
    const [currentPortion, setCurrentPortion] = useState(Number(portions));
    const ingredientsModificated = modifyPortionsQuantity({
        ingredientsArray: ingredientsLists,
        currentPortion,
        defaultPortion: Number(portions)
    });
    const currentIngredients = ingredientsModificated.map(
        createIngredientSections
    );
    return (
        <div className="flex flex-column gap-24">
            {portions && (
                <div className="flex flex-wrap ai-center gap-24">
                    <IngredientsPortionsText
                        articleId={articleId}
                        bookmarkId={bookmarkId}
                        showButtonsConversor={showButtonsConversor}
                    />
                    <IngredientsButtons
                        articleId={articleId}
                        bookmarkId={bookmarkId}
                        currentPortion={currentPortion}
                        portions={Number(portions)}
                        setCurrentPortion={setCurrentPortion}
                        showButtonsConversor={showButtonsConversor}
                    />
                </div>
            )}
            <IngredientsTitle />
            {currentIngredients}
            {showButton && (
                <ShoppingListButton
                    bookmarkId={bookmarkId}
                    setBookmarkId={setBookmarkId}
                    isSuscriptor={isSuscriptor}
                    ingredientsLists={currentIngredients}
                    title={title}
                    articleId={articleId}
                />
            )}
        </div>
    );
}

Ingredients.propTypes = {
    articleId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    portions: PropTypes.string.isRequired,
    showButton: PropTypes.bool.isRequired,
    showButtonsConversor: PropTypes.bool.isRequired,
    ingredientsLists: PropTypes.arrayOf(
        PropTypes.shape({
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    fullIngredientString: PropTypes.string.isRequired,
                    ingredient: PropTypes.string.isRequired
                })
            ).isRequired,
            titleList: PropTypes.string.isRequired,
            typeList: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Ingredients;
