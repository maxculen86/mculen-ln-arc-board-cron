import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Cart } from '@ln/foodit-ui-assets';
import IngredientsSection from './ingredientsSection';

export const Ingredients = props => {
    const { items = [], titleList = '' } = props || {};
    return (
        <div className="flex flex-column gap-24">
            <div className="flex ai-center gap-16">
                <Text className="roboto-bold text-12 text-14_md">
                    PORCIONES
                </Text>
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
                </div>
            </div>
            <Text
                as="h2"
                className="prumo prumo-light text-24 text-32_md text-36_lg"
            >
                Ingredientes
            </Text>
            <IngredientsSection items={items} titleList={titleList} />
            <Button title="Agregar" size={{ sm: 32, md: 40 }}>
                <Icon size={16}>
                    <Cart />
                </Icon>
                Agregar a la lista
            </Button>
        </div>
    );
};

export default Ingredients;
