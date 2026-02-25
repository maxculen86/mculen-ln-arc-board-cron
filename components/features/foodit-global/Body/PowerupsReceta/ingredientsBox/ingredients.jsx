import React, { useState, useMemo } from 'react';
import { Text } from '@ln/common-ui-text';
import get from '../../../../../private/common/utils/get';

import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../private/common/auth/helper/loginHelper';
import { useIsInShoppingList } from './hooks/useIsInShoppingList';
import { IngredientsSection } from './ingredientsSection';
import ShoppingListButton from './shoppingListButton';
import { modifyPortionsQuantity } from './_helper';
import { IngredientsPortionsText } from './ingredientsPortionsText';
import { IngredientsButtons } from './ingredientsButtons';
import usePortions from './hooks/usePortions';
import useIngredientsList from './hooks/useIngredientsList';

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
    const ingredientsNames = items.map(item => {
        const fullIngredientString = get(
            item,
            'fullIngredientString',
            ''
        ).toLowerCase();
        const isOptionalIngredient = get(item, 'isOptionalIngredient', false);
        return isOptionalIngredient
            ? `${fullIngredientString} (opcional)`
            : fullIngredientString;
    });

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
    showButtonsConversor = true,
    canonicalUrl
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
    usePortions('recipe-portions', currentPortion, Number(portions));
    const ingredientsModified = useMemo(
        () =>
            modifyPortionsQuantity({
                ingredientsArray: ingredientsLists,
                currentPortion,
                defaultPortion: Number(portions)
            }),
        [ingredientsLists, currentPortion, portions]
    );
    useIngredientsList('ingredients-list', ingredientsModified);
    const currentIngredients = ingredientsModified.map(
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
                    ingredientsLists={ingredientsModified}
                    title={title}
                    articleId={articleId}
                    canonicalUrl={canonicalUrl}
                />
            )}
        </div>
    );
}

export default Ingredients;
