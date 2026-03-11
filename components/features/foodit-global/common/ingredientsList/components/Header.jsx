import React from 'react';
import { Text } from '@ln/common-ui-text';
import { RecipeOptions } from './RecipeOptions';

function IngredientsListHeader({ list, title, bookmarkId, setShoppingList }) {
    return (
        <div className="flex gap-24 ai-center jc-between">
            <Text
                className="prumo prumo-light text-24 text-32_md text-36_lg text-left"
                as="h2"
            >
                {title}
            </Text>
            <RecipeOptions
                list={list}
                bookmarkId={bookmarkId}
                setShoppingList={setShoppingList}
            />
        </div>
    );
}

export default IngredientsListHeader;
