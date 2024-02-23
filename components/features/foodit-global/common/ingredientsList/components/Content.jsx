import React from 'react';
import Ingredient from './Ingredient';
import { Text } from '@ln/common-ui-text';

export const IngredientsListContent = ({
    bookmarkId,
    titleList,
    items = [],
    typeList
}) => {
    return (
        <div className="flex flex-column gap-16 gap-8_md pt-24 pt-0_md">
            {titleList && (
                <Text className="roboto-bold text-16">{titleList}</Text>
            )}
            {items?.map(item => (
                <Ingredient
                    key={`${bookmarkId}-${item.ingredient || item}`}
                    item={item}
                    typeList={typeList}
                />
            ))}
        </div>
    );
};

export default IngredientsListContent;
