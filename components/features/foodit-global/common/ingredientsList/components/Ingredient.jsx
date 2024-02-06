import React from 'react';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';

export const Ingredient = ({ ingredient, quantity }) => {
    return (
        <>
            <li className="flex ai-center jc-between">
                <div className="flex flex-column gap-4">
                    <Text className="text-16">{ingredient}</Text>
                    <Text className="text-14 text-light-600">{quantity}</Text>
                </div>
                <Button
                    title="Quitar ingrediente"
                    variant="link"
                    onClick={() => {
                        // TODO: agregar funcion para eliminar el ingrediente
                        window.LN.observable.publish('showModalIngredient', {
                            show: true,
                            data: {
                                type: 'ingredient',
                                displayName: ingredient
                            }
                        });
                    }}
                >
                    <Icon size={24}>
                        <IconSprite name="delete" />
                    </Icon>
                </Button>
            </li>
            <hr className="sm-none" />
        </>
    );
};

export default Ingredient;
