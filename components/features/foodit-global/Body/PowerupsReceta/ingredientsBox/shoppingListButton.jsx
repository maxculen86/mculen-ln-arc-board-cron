import React, { useMemo } from 'react';

import { handleIgredientListButton } from './_helper';
import { isFooditSuscriptor } from '../../../hooks/useGetUserData';
import getToken from '../../../../../private/common/utils/getToken';
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
        () => isFooditSuscriptor(getToken('ProductoPremiumId')),
        []
    );

    const { bookmarkId, setBookmarkId } = useIsInShoppingList(
        articleId,
        isSuscriptor
    );

    return (
        <Button
            title="Agregar"
            size={{ sm: 32, md: 40 }}
            onClick={() =>
                handleIgredientListButton({
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
