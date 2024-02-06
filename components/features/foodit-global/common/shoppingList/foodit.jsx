import React from 'react';
import { useShoppingList } from './hooks/useShoppingList';
import EmptyState from '../emptyState/foodit';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import CollectionBox from '../collectionBox/foodit';
import { IngredientsList } from '../ingredientsList/foodit';
import { ModalRemoveIngredient } from '../Modals/RemoveIngredients/foodit';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { useAppContext } from 'fusion:context';

const ShoppingList = () => {
    const { contextPath, deployment } = useAppContext();
    const { loading, isMobile, shoppingList } = useShoppingList();

    // TODO: agregar loader cuando esté definido
    if (loading) return <div className="h-250 bg-positive">Cargando...</div>;

    if (shoppingList.length === 0)
        return (
            <EmptyState
                title="Aún no hay nada por aca"
                description="Agregá los ingredientes que necesitas comprar para hacer tus recetas"
                imageProps={{
                    src: getAssetsPath(contextPath)(deployment)(
                        'empty-state-recetario.webp'
                    ),
                    alt: 'No se encontraron resultados',
                    with: 147,
                    height: 151
                }}
            />
        );

    return (
        <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg">
            <aside className="sm-none col-span-5 bg-positive p-24 p-32_lg">
                <CollectionBox
                    title="Colecciones"
                    list={shoppingList}
                    button={
                        // TODO: agregar funcionalidad para el onClick
                        <Button title="copiar" onClick={() => null}>
                            <Icon size={16}>
                                <IconSprite name="copy" />
                            </Icon>
                            Copiar todo
                        </Button>
                    }
                />
            </aside>
            <IngredientsList list={shoppingList} isMobile={isMobile} />
            <ModalRemoveIngredient />
        </div>
    );
};

export default ShoppingList;
