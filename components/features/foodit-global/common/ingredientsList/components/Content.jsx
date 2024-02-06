import React from 'react';
import Ingredient from './Ingredient';
import { Text } from '@ln/common-ui-text';

export const IngredientsListContent = ({ title, list = [] }) => {
    return (
        <div className="flex flex-column gap-16 gap-8_md pt-24 pt-0_md">
            {title && <Text className="roboto-bold text-16">{title}</Text>}
            {list?.map(item => (
                <Ingredient key={item.ingredient} {...item} />
            ))}
        </div>
    );
};

export default IngredientsListContent;
