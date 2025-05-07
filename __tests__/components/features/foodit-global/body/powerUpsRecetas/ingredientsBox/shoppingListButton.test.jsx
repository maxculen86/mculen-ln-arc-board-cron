import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ShoppingListButton from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/shoppingListButton';
import { handleIngredientListButton } from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/_helper';
import getToken from '../../../../../../../components/private/common/utils/getToken';
import { useIsInShoppingList } from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/hooks/useIsInShoppingList';

jest.mock(
    '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/_helper'
);
jest.mock(
    '../../../../../../../components/private/common/auth/helper/loginHelper'
);
jest.mock(
    '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/hooks/useIsInShoppingList'
);
jest.mock('../../../../../../../components/private/common/utils/getToken');

useIsInShoppingList.mockReturnValue({
    bookmarkId: null,
    setBookmarkId: jest.fn()
});

xdescribe('Components - Features - Foodit-global - Body - PowerUpsRecetas - IngredientsBox - ShoppingListButton', () => {
    const setBookmarkIdMock = jest.fn();
    const defaultProps = {
        isSuscriptor: true,
        articleId: '12345',
        title: 'Test Recipe',
        ingredientsLists: [
            {
                typeList: 'ingredientes',
                items: [{ id: '1', includeInShoppingList: true }]
            }
        ],
        setBookmarkId: setBookmarkIdMock,
        bookmarkId: null
    };

    beforeEach(() => {
        jest.clearAllMocks();
        getToken.mockReturnValue('mockToken');
    });

    it('should render the button with "AGREGAR A LISTA" text initially', () => {
        render(<ShoppingListButton {...defaultProps} />);
        expect(screen.getByText('AGREGAR A LISTA')).toBeInTheDocument();
    });

    it('should render the button with "ELIMINAR DE LISTA" text when bookmarkId is provided', () => {
        render(<ShoppingListButton {...defaultProps} bookmarkId="123" />);
        expect(screen.getByText('ELIMINAR DE LISTA')).toBeInTheDocument();
    });

    it('should call handleIngredientListButton with correct parameters when clicked', () => {
        render(<ShoppingListButton {...defaultProps} bookmarkId={null} />);

        fireEvent.click(screen.getByText('AGREGAR A LISTA'));

        expect(handleIngredientListButton).toHaveBeenCalledWith({
            isSuscriptor: true,
            title: 'Test Recipe',
            articleId: '12345',
            portions: 1,
            bookmarkId: null,
            setBookmarkId: setBookmarkIdMock,
            ingredientsLists: defaultProps.ingredientsLists
        });
    });
});
