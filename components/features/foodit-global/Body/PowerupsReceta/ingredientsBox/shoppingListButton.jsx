import React, { useMemo } from 'react';

import { handleIngredientListButton } from './_helper';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../../auth/helper/loginHelper';
import { useIsInShoppingList } from './hooks/useIsInShoppingList';

import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { Button } from '@ln/foodit-ui-button';

const ShoppingListButton = ({
    ingredientsLists = [],
    articleId = '',
    title = ''
}) => {
    const isSuscriptor = useMemo(
        () => isSubscribed(SUBSCRIBED_HELPER.FOODIT),
        []
    );

    const { bookmarkId, setBookmarkId } = useIsInShoppingList(
        isSuscriptor,
        articleId
    );

    return (
        <Button
            title="Agregar"
            size={{ sm: 32, md: 40 }}
            onClick={() =>
                handleIngredientListButton({
                    isSuscriptor,
                    title,
                    articleId,
                    bookmarkId,
                    setBookmarkId,
                    ingredientsLists
                })
            }
        >
            <Icon size={16}>
                <IconSprite name="shopping-list" critical />
            </Icon>
            {bookmarkId ? 'ELIMINAR DE LISTA' : 'AGREGAR A LISTA'}
        </Button>
    );
};

export default ShoppingListButton;
