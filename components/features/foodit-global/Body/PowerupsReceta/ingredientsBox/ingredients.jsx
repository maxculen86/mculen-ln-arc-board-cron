import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IngredientsSection from './ingredientsSection';
import IconSprite from '../../../../../features/private-global/common/iconSprite/IconSprite';
import { saveIngredientsList } from './_helper';

export const Ingredients = ({
    articleId,
    ingredientsLists = [],
    title,
    portions
}) => {
    const addToShoppingLists = ingredientsLists.reduce(
        (accumulator, currentList) => {
            if (currentList.typeList === 'ingredientes')
                return [...accumulator, currentList];

            const filteredItems = currentList.items.filter(
                item => item.includeInShoppingList
            );

            if (filteredItems.length)
                return [
                    ...accumulator,
                    {
                        ...currentList,
                        items: filteredItems
                    }
                ];

            return accumulator;
        },
        []
    );

    return (
        <div className="flex flex-column gap-24">
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
                const ingredientsNames = items.map(item => {
                    const ingredientName =
                        item.fullIngredientString ||
                        (typeof item === 'string' && item) ||
                        '';
                    return ingredientName.toLowerCase();
                });
                return (
                    <IngredientsSection
                        key={titleList}
                        items={ingredientsNames}
                        titleList={titleList}
                    />
                );
            })}
            <Button
                title="Agregar"
                size={{ sm: 32, md: 40 }}
                onClick={() => {
                    saveIngredientsList({
                        text: title,
                        sections: addToShoppingLists,
                        id: articleId
                    });
                }}
            >
                <Icon size={16}>
                    <IconSprite name="cart" critical />
                </Icon>
                Agregar a la lista
            </Button>
        </div>
    );
};

export default Ingredients;
