import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { handleIngredientListButton } from './_helper';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import usePortions from './hooks/usePortions';
import { useIsInShoppingList } from './hooks/useIsInShoppingList';

function ShoppingListButton({
    ingredientsLists = [],
    articleId = '',
    title = '',
    isSuscriptor,
    canonicalUrl = ''
}) {
    const { portionsValue } = usePortions('recipe-portions');

    const { bookmarkId, setBookmarkId } = useIsInShoppingList(
        isSuscriptor,
        articleId
    );

    const handleClick = async () => {
        try {
            await handleIngredientListButton({
                isSuscriptor,
                title,
                articleId,
                bookmarkId,
                setBookmarkId,
                ingredientsLists,
                portions: portionsValue,
                canonicalUrl
            });
        } catch (error) {
            console.error('Shopping list update failed:', error);
        }
    };

    const buttonText = bookmarkId ? 'ELIMINAR DE LISTA' : 'AGREGAR A LISTA';
    const buttonTitle = bookmarkId ? 'Eliminar de lista' : 'Agregar a lista';

    return (
        <Button
            title={buttonTitle}
            size={{ sm: 32, md: 40 }}
            onClick={handleClick}
        >
            <Icon size={16}>
                <IconSprite name="shopping-list" critical />
            </Icon>
            {buttonText}
        </Button>
    );
}

export default ShoppingListButton;
