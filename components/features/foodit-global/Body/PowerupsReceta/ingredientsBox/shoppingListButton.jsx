import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { handleIngredientListButton } from './_helper';

import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

function ShoppingListButton({
    ingredientsLists = [],
    articleId = '',
    title = '',
    bookmarkId,
    setBookmarkId,
    isSuscriptor,
    currentPortion,
    defaultPortion
}) {
    const portionsValue =
        currentPortion > defaultPortion ? currentPortion : defaultPortion;

    return (
        <Button
            title="Agregar a lista"
            size={{ sm: 32, md: 40 }}
            onClick={() =>
                handleIngredientListButton({
                    isSuscriptor,
                    title,
                    articleId,
                    bookmarkId,
                    setBookmarkId,
                    ingredientsLists,
                    portions: portionsValue
                })
            }
        >
            <Icon size={16}>
                <IconSprite name="shopping-list" critical />
            </Icon>
            {bookmarkId ? 'ELIMINAR DE LISTA' : 'AGREGAR A LISTA'}
        </Button>
    );
}
ShoppingListButton.propTypes = {
    setBookmarkId: PropTypes.func.isRequired,
    bookmarkId: PropTypes.oneOf(PropTypes.string, null).isRequired,
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
    currentPortion: PropTypes.number.isRequired,
    defaultPortion: PropTypes.number.isRequired
};

export default ShoppingListButton;
