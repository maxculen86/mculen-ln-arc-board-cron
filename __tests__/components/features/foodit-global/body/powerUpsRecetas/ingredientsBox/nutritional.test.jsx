import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nutritional from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/nutritional';

describe('components - features - foodit-global - body - powerUpRecetas - ingredientsBox - Nutritional', () => {
    const nutritionalListsMock = [
        {
            items: [
                { text: 'Calorias', value: 0, unit: 'kcal' },
                { text: 'Carbohidratos', value: 0, unit: 'g' }
            ],
            titleList: 'Cafe'
        }
    ];

    const [firstList] = nutritionalListsMock;
    const { items, titleList } = firstList;

    it('should render correctly, items mapper and title', () => {
        const { getByText } = render(
            <Nutritional nutritionLists={nutritionalListsMock} />
        );
        items.forEach(item => {
            const text = getByText(`${item.text}: ${item.value} ${item.unit}`);
            expect(text).toBeInTheDocument();
        });
        const title = getByText(titleList);
        expect(title).toBeInTheDocument();
    });

    it('should render correctly with no props', () => {
        const { container } = render(<Nutritional />);
        expect(container).toBeTruthy();
    });
});
