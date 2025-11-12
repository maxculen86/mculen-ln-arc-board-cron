import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Ingredients from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/ingredients';

jest.mock(
    '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/shoppingListButton',
    () => () => <div data-testid="shopping-list-button"></div>
);

describe('components - features - foodit-global - body - powerUpRecetas - ingredientsBox - Nutritional', () => {
    const ingredientsListMock = [
        {
            items: [
                {
                    abbreviation: 'g',
                    amount: '400',
                    fullIngredientString: '400 g de Tofu firme',
                    includeInShoppingList: true,
                    ingredient: 'Tofu firme',
                    isMainIngredient: true,
                    unit: 'Gramo'
                },
                {
                    abbreviation: 'g',
                    amount: '150',
                    fullIngredientString: '150 g de Kale',
                    includeInShoppingList: true,
                    ingredient: 'Kale',
                    isMainIngredient: true,
                    unit: 'Gramo'
                },
                {
                    abbreviation: 'g',
                    amount: '200',
                    fullIngredientString: '200 g de Harina 0000',
                    includeInShoppingList: true,
                    ingredient: 'Harina 0000',
                    isMainIngredient: false,
                    unit: 'Gramo'
                },
                {
                    abbreviation: 'cdas.',
                    amount: '4',
                    fullIngredientString:
                        '4 cdas. de Aceite de oliva Virgen Extra',
                    includeInShoppingList: true,
                    ingredient: 'Aceite de oliva Virgen Extra',
                    isMainIngredient: false,
                    unit: 'Cucharadas'
                },
                {
                    abbreviation: 'a gusto',
                    amount: '',
                    fullIngredientString: 'Sal a gusto',
                    includeInShoppingList: true,
                    ingredient: 'Sal',
                    isMainIngredient: false,
                    unit: 'A Gusto'
                },
                {
                    abbreviation: 'a gusto',
                    amount: '',
                    fullIngredientString: 'Pimienta a gusto',
                    includeInShoppingList: true,
                    ingredient: 'Pimienta',
                    isMainIngredient: false,
                    unit: 'A Gusto'
                },
                {
                    abbreviation: 'c/n',
                    amount: '',
                    fullIngredientString: 'Agua c/n',
                    includeInShoppingList: true,
                    ingredient: 'Agua',
                    isMainIngredient: false,
                    unit: 'Cantidad necesaria'
                }
            ],
            titleList: 'Wafflesito rico'
        }
    ];
    const [firstList] = ingredientsListMock;
    const { items, titleList } = firstList;

    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });
    });

    it('should render correctly, texts and links', () => {
        const { getByText, getByTestId } = render(
            <Ingredients ingredientsLists={ingredientsListMock} portions="4" />
        );
        items.forEach(item => {
            const text = getByText(item.fullIngredientString.toLowerCase());
            expect(text).toBeInTheDocument();
        });

        expect(getByTestId('shopping-list-button')).toBeInTheDocument();
        const title = getByText(titleList);
        expect(title).toBeInTheDocument();
    });

    it('should not render shopping list button', () => {
        const { queryByTestId } = render(
            <Ingredients
                ingredientsLists={ingredientsListMock}
                showButton={false}
            />
        );

        expect(queryByTestId('shopping-list-button')).not.toBeInTheDocument();
    });

    it('should render correctly with no props', () => {
        const { container } = render(<Ingredients />);

        expect(container).toBeTruthy();
    });
});
