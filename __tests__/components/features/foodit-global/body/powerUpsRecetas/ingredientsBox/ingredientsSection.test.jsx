import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientsSection from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/ingredientsSection';

describe('components - features - foodit-global - body - powerUpRecetas - ingredientsBox - Nutritional', () => {
    const ingredientsMock = {
        items: [
            '2 pechugas de pollo',
            '1 zucchini',
            'Mostaza',
            'Crema de leche (optativo)',
            'Pimentón ahumado',
            'Sal & pimienta',
            'Papel aluminio o manteca'
        ],
        titleList: 'Para el bajon'
    };
    const { items, titleList } = ingredientsMock;
    it('should render correctly, texts and links', () => {
        const { getByText } = render(
            <IngredientsSection {...ingredientsMock} />
        );
        items.forEach(item => {
            const text = getByText(item);
            expect(text).toBeInTheDocument();
        });
        const title = getByText(titleList);
        expect(title).toBeInTheDocument();
    });
});
