import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Ingredient from '../../../../../../../components/features/foodit-global/common/ingredientsList/components/Ingredient';

describe('Ingredient Component', () => {
    it('should display the ingredient name', () => {
        const item = { ingredient: 'Tomato', amount: 2, abbreviation: 'pcs' };
        render(<Ingredient item={item} />);

        const ingredientElement = screen.getByText('Tomato');
        expect(ingredientElement).toBeInTheDocument();
    });

    it('should display only the ingredient name if no amount is provided', () => {
        const item = { ingredient: 'Salt' };
        render(<Ingredient item={item} />);

        const ingredientElement = screen.getByText('Salt');
        expect(ingredientElement).toBeInTheDocument();
        expect(screen.queryByText('pcs')).toBeNull();
    });

    it('should display the quantity and abbreviation when provided', () => {
        const item = { ingredient: 'Sugar', amount: 3, abbreviation: 'kg' };
        render(<Ingredient item={item} />);

        const quantityElement = screen.getByText('3 kg');
        expect(quantityElement).toBeInTheDocument();
    });

    it('should not display the quantity if no have quantity"', () => {
        const item = { ingredient: 'Flour', amount: 1, abbreviation: 'kg' };
        render(<Ingredient item={item} />);

        const quantityElement = screen.queryByText('1 kg');
        expect(quantityElement).toBeInTheDocument();
    });

    it('should display the name and displayAmount when isTabIngredients is true', () => {
        const item = { name: 'Tomato', displayAmount: '2 pcs' };
        render(<Ingredient item={item} isTabIngredients />);

        const nameElement = screen.getByText('Tomato');
        const displayAmountElement = screen.getByText('2 pcs');
        expect(nameElement).toBeInTheDocument();
        expect(displayAmountElement).toBeInTheDocument();
    });
});
