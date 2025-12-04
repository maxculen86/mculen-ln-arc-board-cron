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
jest.mock(
    '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/hooks/usePortions',
    () => ({
        __esModule: true,
        default: () => ({ portionsValue: 1 })
    })
);

describe('Components - Features - Foodit-global - Body - PowerUpsRecetas - IngredientsBox - ShoppingListButton', () => {
    const setBookmarkIdMock = jest.fn();
    const defaultProps = {
        isSuscriptor: true,
        articleId: '12345',
        title: 'Test Recipe',
        canonicalUrl: '',
        ingredientsLists: [
            {
                titleList: 'Ingredientes',
                typeList: 'ingredientes',
                items: [
                    {
                        fullIngredientString: '1 taza de azúcar',
                        ingredient: 'azúcar',
                        amount: 1,
                        includeInShoppingList: true
                    }
                ]
            }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        getToken.mockReturnValue('mockToken');
    });

    it('should render the button with "AGREGAR A LISTA" text initially', () => {
        useIsInShoppingList.mockReturnValue({
            bookmarkId: null,
            setBookmarkId: setBookmarkIdMock
        });

        render(<ShoppingListButton {...defaultProps} />);
        expect(screen.getByText('AGREGAR A LISTA')).toBeInTheDocument();
    });

    it('should render the button with "ELIMINAR DE LISTA" text when bookmarkId is provided', () => {
        useIsInShoppingList.mockReturnValue({
            bookmarkId: '123',
            setBookmarkId: setBookmarkIdMock
        });

        render(<ShoppingListButton {...defaultProps} />);
        expect(screen.getByText('ELIMINAR DE LISTA')).toBeInTheDocument();
    });

    it('should call handleIngredientListButton with correct parameters when clicked', () => {
        useIsInShoppingList.mockReturnValue({
            bookmarkId: null,
            setBookmarkId: setBookmarkIdMock
        });

        render(<ShoppingListButton {...defaultProps} />);

        fireEvent.click(screen.getByText('AGREGAR A LISTA'));

        expect(handleIngredientListButton).toHaveBeenCalledWith({
            isSuscriptor: true,
            title: 'Test Recipe',
            articleId: '12345',
            portions: 1,
            bookmarkId: null,
            setBookmarkId: setBookmarkIdMock,
            ingredientsLists: defaultProps.ingredientsLists,
            canonicalUrl: ''
        });
    });

    it('should call handleIngredientListButton with canonicalUrl when provided', () => {
        useIsInShoppingList.mockReturnValue({
            bookmarkId: null,
            setBookmarkId: setBookmarkIdMock
        });

        const propsWithUrl = {
            ...defaultProps,
            canonicalUrl: '/recetas/test-recipe-nid12345/'
        };

        render(<ShoppingListButton {...propsWithUrl} />);

        fireEvent.click(screen.getByText('AGREGAR A LISTA'));

        expect(handleIngredientListButton).toHaveBeenCalledWith({
            isSuscriptor: true,
            title: 'Test Recipe',
            articleId: '12345',
            portions: 1,
            bookmarkId: null,
            setBookmarkId: setBookmarkIdMock,
            ingredientsLists: defaultProps.ingredientsLists,
            canonicalUrl: '/recetas/test-recipe-nid12345/'
        });
    });

    it('should handle errors gracefully when handleIngredientListButton fails', async () => {
        useIsInShoppingList.mockReturnValue({
            bookmarkId: null,
            setBookmarkId: setBookmarkIdMock
        });

        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation();
        handleIngredientListButton.mockRejectedValue(new Error('API Error'));

        render(<ShoppingListButton {...defaultProps} />);

        fireEvent.click(screen.getByText('AGREGAR A LISTA'));

        await screen.findByText('AGREGAR A LISTA');

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Shopping list update failed:',
            expect.any(Error)
        );

        consoleErrorSpy.mockRestore();
    });
});
