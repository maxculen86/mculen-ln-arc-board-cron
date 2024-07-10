import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';

import { getCustomConfigByLayout } from '../floatingGroupButton/helpers';
import { useShoppingList } from './hooks/useShoppingList';
import { copyListToClipboard } from './_helpers';
import { getVariantBarrier } from '../emptyState/helpers';

import EmptyState from '../emptyState/foodit';
import CollectionBox from '../collectionBox/foodit';
import { IngredientsList } from '../ingredientsList/foodit';
import { ModalRemoveIngredient } from '../Modals/RemoveIngredients/foodit';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { Spinner } from '@ln/foodit-ui-spinner';
import FloatingGroupButton from '../floatingGroupButton/foodit';
import useGetUserConfig from '../../hooks/useGetUserConfig';

const ShoppingList = () => {
    const { layout } = useAppContext();

    const {
        loading,
        isMobile,
        shoppingList,
        setShoppingList
    } = useShoppingList();

    const [selectedItem, setSelectedItem] = useState({ id: 'Todas' });

    const { userType } = useGetUserConfig();

    const selectedArticle = shoppingList.find(
        list => list.id === selectedItem.id
    );

    const displayList =
        selectedItem.id !== 'Todas' ? [selectedArticle] : shoppingList;

    if (selectedItem.id !== 'Todas' && !selectedArticle)
        setSelectedItem({ id: 'Todas' });

    // TODO: agregar loader cuando esté definido
    if (loading)
        return (
            <div className="min-h-344 flex jc-center ai-center">
                <Spinner variant="secondary" />
            </div>
        );

    if (!shoppingList.length)
        return (
            <div className="min-h-344">
                <EmptyState
                    variant={getVariantBarrier(userType)}
                    direction="column"
                />
            </div>
        );

    return (
        <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg min-h-344">
            <aside className="sm-none col-span-5 bg-positive p-24 p-32_lg">
                <CollectionBox
                    title="Recetas"
                    list={shoppingList}
                    button={
                        <Button
                            title="copiar"
                            onClick={() => copyListToClipboard(shoppingList)}
                        >
                            <Icon size={16}>
                                <IconSprite name="copy" />
                            </Icon>
                            Copiar todo
                        </Button>
                    }
                    onItemSelected={setSelectedItem}
                />
            </aside>
            <IngredientsList
                list={displayList}
                isMobile={isMobile}
                setShoppingList={setShoppingList}
            />
            <ModalRemoveIngredient />
            <FloatingGroupButton
                {...getCustomConfigByLayout(layout, [
                    () => copyListToClipboard(shoppingList)
                ])}
            />
        </div>
    );
};

export default ShoppingList;
