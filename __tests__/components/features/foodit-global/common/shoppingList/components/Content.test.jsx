import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientsListContent from '../../../../../../../components/features/foodit-global/common/ingredientsList/components/Content';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/ingredientsList/components/Ingredient',
    () => ({ item, typeList }) => (
        <div data-testid="mock-ingredient">{item.ingredient}</div>
    )
);

describe('IngredientsListContent Component', () => {
    it('should display the title of the list', () => {
        const titleList = 'Shopping List';
        render(<IngredientsListContent titleList={titleList} items={[]} />);

        const titleElement = screen.getByText(titleList);
        expect(titleElement).toBeInTheDocument();
    });

    it('should render the correct number of ingredients', () => {
        const items = [
            { ingredient: 'Tomato', amount: 2, abbreviation: 'pcs' },
            { ingredient: 'Salt', amount: 1, abbreviation: 'kg' }
        ];
        render(
            <IngredientsListContent
                items={items}
                typeList="foodit-ingredientes"
            />
        );

        const ingredientElements = screen.getAllByTestId('mock-ingredient');
        expect(ingredientElements.length).toBe(items.length);
    });

    it('should display all ingredients names', () => {
        const items = [{ ingredient: 'Flour', amount: 1, abbreviation: 'kg' }];
        render(
            <IngredientsListContent
                items={items}
                typeList="foodit-ingredientes"
            />
        );

        const ingredientName = screen.getByText(items[0].ingredient);
        expect(ingredientName).toBeInTheDocument();
    });

    it('should not display a title if titleList is not provided', () => {
        render(<IngredientsListContent items={[]} />);

        const titleElement = screen.queryByText(/Shopping List/i);
        expect(titleElement).toBeNull();
    });
});
