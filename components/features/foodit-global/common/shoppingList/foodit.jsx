import React, { useState } from 'react';
import { Spinner } from '@ln/foodit-ui-spinner';
import { useShoppingList } from './hooks/useShoppingList';
import { getVariantBarrier } from '../emptyState/helpers';
import EmptyState from '../emptyState/foodit';
import { ModalRemoveIngredient } from '../Modals/RemoveIngredients/foodit';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import TabIngredients from '../ingredientsList/components/TabIngredients';

function ShoppingList() {
    const { loading, shoppingList, setShoppingList } = useShoppingList();

    const [selectedItem, setSelectedItem] = useState({ id: 'Todas' });

    const { userType } = useGetUserConfig();

    const selectedArticle = shoppingList.find(
        list => list.id === selectedItem.id
    );

    const displayList =
        selectedItem.id !== 'Todas' ? [selectedArticle] : shoppingList;

    if (selectedItem.id !== 'Todas' && !selectedArticle)
        setSelectedItem({ id: 'Todas' });

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
        <div>
            <TabIngredients
                list={displayList}
                setShoppingList={setShoppingList}
                shoppingList={shoppingList}
            />
            <ModalRemoveIngredient />
        </div>
    );
}

export default ShoppingList;
