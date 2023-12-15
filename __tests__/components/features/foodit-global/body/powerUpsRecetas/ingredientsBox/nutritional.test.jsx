import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nutritional from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/nutritional';

describe('components - features - foodit-global - body - powerUpRecetas - ingredientsBox - Nutritional', () => {
    const nutritionalMock = {
        items: ['list item 1', 'list item 2', 'list item 3'],
        titleList: 'Nutricional'
    };
    const { items, titleList } = nutritionalMock;
    it('should render correctly, items mapper and title', () => {
        const { getByText } = render(<Nutritional {...nutritionalMock} />);
        items.forEach(item => {
            const text = getByText(item);
            expect(text).toBeInTheDocument();
        });
        const title = getByText(titleList);
        expect(title).toBeInTheDocument();
    });
});
