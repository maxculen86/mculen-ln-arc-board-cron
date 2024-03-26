import React from 'react';
import { Text } from '@ln/common-ui-text';

export const Ingredient = ({ item, typeList }) => {
    const { ingredient = item || '', amount, abbreviation = '' } = item;
    const quantity = (amount && `${amount} ${abbreviation}`) || abbreviation;

    return (
        <>
            <li className="flex ai-center jc-between">
                <div className="flex flex-column gap-4">
                    <Text className="text-16">{ingredient}</Text>
                    {typeList === 'foodit-ingredientes' && (
                        <Text className="text-14 text-light-600">
                            {quantity}
                        </Text>
                    )}
                </div>
                {/* 
                Pendiente a posibilidad de modificar bookmarkContent para eliminar ingredientes de la lista de compras
                <Button
                    title="Quitar ingrediente"
                    variant="link"
                    onClick={() => {
                        window.LN.observable.publish('showModalIngredient', {
                            show: true,
                            data: {
                                type: 'ingredient',
                                displayName: ingredient,
                                bookmarkId,
                                bookmarkContent: { id, sections, text },
                                setShoppingList
                            }
                        });
                    }}
                >
                    <Icon size={24}>
                        <IconSprite name="delete" />
                    </Icon>
                </Button> */}
            </li>
            <hr className="sm-none" />
        </>
    );
};

export default Ingredient;
