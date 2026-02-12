import React from 'react';
import { Text } from '@ln/common-ui-text';
import Ingredient from './Ingredient';

function IngredientsListContent({ bookmarkId, titleList, items = [] }) {
    return (
        <div>
            <div className="flex flex-column gap-8 pt-24">
                {titleList && (
                    <Text className="roboto-bold text-16">{titleList}</Text>
                )}
                {items?.map(item => (
                    <Ingredient
                        key={`${bookmarkId}-${item.ingredient || ''}`}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default IngredientsListContent;
