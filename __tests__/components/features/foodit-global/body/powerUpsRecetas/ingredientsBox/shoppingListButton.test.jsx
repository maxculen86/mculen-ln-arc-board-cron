import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ShoppingListButton from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/shoppingListButton';
import { handleIgredientListButton } from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/_helper';
import { useIsInShoppingList } from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/hooks/useIsInShoppingList';
import { isFooditSuscriptor } from '../../../../../../../components/features/foodit-global/hooks/useGetUserData';
import getToken from '../../../../../../../components/private/common/utils/getToken';

jest.mock(
    '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/_helper'
);
jest.mock(
    '../../../../../../../components/features/foodit-global/hooks/useGetUserData'
);
jest.mock(
    '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/hooks/useIsInShoppingList'
);
jest.mock('../../../../../../../components/private/common/utils/getToken');

describe('Components - Features - Foodit-global - Body - PowerUpsRecetas - IngredientsBox - ShoppingListButton', () => {
    const defaultProps = {
        articleId: '12345',
        title: 'Test Recipe',
        ingredientsLists: [
            {
                typeList: 'ingredientes',
                items: [{ id: '1', includeInShoppingList: true }]
            }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        isFooditSuscriptor.mockReturnValue(true);
        getToken.mockReturnValue('mockToken');
        useIsInShoppingList.mockReturnValue({
            bookmarkId: null,
            setBookmarkId: jest.fn()
        });
    });

    it('should render the button with "AGREGAR A LISTA" text initially', () => {
        render(<ShoppingListButton {...defaultProps} />);
        expect(screen.getByText('AGREGAR A LISTA')).toBeInTheDocument();
    });

    it('should render the button with "ELIMINAR DE LISTA" text when bookmarkId is provided', () => {
        useIsInShoppingList.mockReturnValue({
            bookmarkId: '123',
            setBookmarkId: jest.fn()
        });
        render(<ShoppingListButton {...defaultProps} />);
        expect(screen.getByText('ELIMINAR DE LISTA')).toBeInTheDocument();
    });

    it('should call handleIgredientListButton with correct parameters when clicked', () => {
        const setBookmarkIdMock = jest.fn();
        useIsInShoppingList.mockReturnValue({
            bookmarkId: null,
            setBookmarkId: setBookmarkIdMock
        });

        render(<ShoppingListButton {...defaultProps} />);

        fireEvent.click(screen.getByText('AGREGAR A LISTA'));

        expect(handleIgredientListButton).toHaveBeenCalledWith({
            isSuscriptor: true,
            title: 'Test Recipe',
            articleId: '12345',
            bookmarkId: null,
            setBookmarkId: setBookmarkIdMock,
            ingredientsLists: defaultProps.ingredientsLists
        });
    });
});
