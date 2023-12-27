import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Ingredients from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/ingredients';

describe('components - features - foodit-global - body - powerUpRecetas - ingredientsBox - Nutritional', () => {
    const ingredientsListMock = [
        {
            items: [
                {
                    fullIngredientString: '100 g de Manteca',
                    includeInShoppingList: true,
                    isMainIngredient: false
                },
                {
                    fullIngredientString: '3 Huevo',
                    includeInShoppingList: true,
                    isMainIngredient: false
                },
                {
                    fullIngredientString: '50 mL de Aceite de oliva',
                    includeInShoppingList: true,
                    isMainIngredient: false
                }
            ],
            titleList: 'Wafflesito rico'
        }
    ];
    const [firstList] = ingredientsListMock;
    const { items, titleList } = firstList;

    it('should render correctly, texts and links', () => {
        const { getByText } = render(
            <Ingredients ingredientsLists={ingredientsListMock} />
        );
        items.forEach(item => {
            const text = getByText(item.fullIngredientString);
            expect(text).toBeInTheDocument();
        });
        const title = getByText(titleList);
        expect(title).toBeInTheDocument();
    });

    it('should render correctly with no props', () => {
        const { container } = render(<Ingredients />);

        expect(container).toBeTruthy();
    });
});
