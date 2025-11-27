import React from 'react';
import PropTypes from 'prop-types';
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

ShoppingListButton.propTypes = {
    isSuscriptor: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    articleId: PropTypes.string.isRequired,
    ingredientsLists: PropTypes.arrayOf(
        PropTypes.shape({
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    fullIngredientString: PropTypes.string.isRequired,
                    ingredient: PropTypes.string.isRequired,
                    amount: PropTypes.number.isRequired
                })
            ).isRequired,
            titleList: PropTypes.string.isRequired,
            typeList: PropTypes.string.isRequired
        })
    ).isRequired,
    canonicalUrl: PropTypes.string.isRequired
};

export default ShoppingListButton;
