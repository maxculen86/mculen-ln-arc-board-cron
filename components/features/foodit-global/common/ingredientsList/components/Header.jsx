import React from 'react';
import { Text } from '@ln/common-ui-text';
import { RecipeOptions } from './RecipeOptions';

export const IngredientsListHeader = ({ title }) => {
    return (
        <div className="flex gap-24 ai-center">
            <Text
                className="prumo prumo-light text-24 text-32_md text-36_lg text-left"
                as="h2"
            >
                {title}
            </Text>
            <RecipeOptions recipeName={title} />
        </div>
    );
};

export default IngredientsListHeader;
