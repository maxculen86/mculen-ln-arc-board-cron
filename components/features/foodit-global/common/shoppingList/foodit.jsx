import React, { useState } from 'react';
import { useShoppingList } from './hooks/useShoppingList';
import { getVariantBarrier } from '../emptyState/helpers';
import { ModalRemoveIngredient } from '../Modals/RemoveIngredients/foodit';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import TabIngredients from '../ingredientsList/components/TabIngredients';
import { SkeletonShoppingList } from '../skeletons/ShoppingList/foodit';
import { EmptyStateDS } from '../../../ui/foodit/emptyState/default';

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

    if (loading) return <SkeletonShoppingList />;

    if (!shoppingList.length)
        return (
            <div className="min-h-344">
                <EmptyStateDS variant={getVariantBarrier(userType)} />
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
