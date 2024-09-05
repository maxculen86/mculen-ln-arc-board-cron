import React from 'react';
import Static from 'fusion:static';

import get from '../../../../../private/common/utils/get';

import { Text } from '@ln/common-ui-text';
import IngredientsSection from './ingredientsSection';
import ShoppingListButton from './shoppingListButton';

export const Ingredients = ({
    articleId,
    ingredientsLists = [],
    title,
    portions,
    showButton = true
}) => {
    return (
        <div className="flex flex-column gap-24">
            <Static htmlOnly persistent id={`ingredients-list-${articleId}`}>
                {portions && (
                    <div className="flex ai-center gap-16">
                        <Text className="roboto-bold text-12 text-14_md">
                            PORCIONES: {portions}
                        </Text>

                        {/* 
                        TODO: Pendiente a definicion si se podran modificar las porciones
                        <div className="flex ai-center gap-8">
                            <Button
                                variant="secondary"
                                rounded="rounded-circle"
                                title="sacar"
                            >
                                -
                            </Button>
                            <Text className="roboto-bold text-12 text-14_md">0</Text>
                            <Button
                                variant="secondary"
                                rounded="rounded-circle"
                                title="agregar"
                            >
                                +
                            </Button>
                        </div> */}
                    </div>
                )}
                <Text
                    as="h2"
                    className="prumo prumo-light text-24 text-32_md text-36_lg"
                >
                    Ingredientes
                </Text>
                {ingredientsLists.map(list => {
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
                })}
            </Static>
            {showButton && (
                <ShoppingListButton
                    ingredientsLists={ingredientsLists}
                    title={title}
                    articleId={articleId}
                />
            )}
        </div>
    );
};

export default Ingredients;
