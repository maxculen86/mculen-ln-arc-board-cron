import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SummaryBox from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/summaryBox/foodit';

describe('components - features - foodit-global - body - powerUpRecetas - summaryBox - foodit', () => {
    const cookTime = 10;
    const prepTime = 5;
    const counterTime = 15;

    it('should render correctly, items mapper and title', () => {
        const { getByText } = render(
            <SummaryBox
                cookTime={cookTime}
                prepTime={prepTime}
                counterTime={counterTime}
            />
        );

        expect(getByText('Tiempo de cocción')).toBeInTheDocument();
        expect(getByText('Tiempo de Preparación')).toBeInTheDocument();
        expect(getByText('Tiempo total')).toBeInTheDocument();

        const icons = document.querySelectorAll('i');
        expect(icons.length).toBe(3);
    });

    it('should render correctly without cooktime, items mapper and title', () => {
        const { getByText } = render(
            <SummaryBox cookTime={cookTime} counterTime={counterTime} />
        );

        expect(getByText('Tiempo de cocción')).toBeInTheDocument();
        expect(getByText('Tiempo total')).toBeInTheDocument();

        const icons = document.querySelectorAll('i');
        expect(icons.length).toBe(2);
    });

    it('should render correctly without preptime, items mapper and title', () => {
        const { getByText } = render(
            <SummaryBox prepTime={prepTime} counterTime={counterTime} />
        );

        expect(getByText('Tiempo de Preparación')).toBeInTheDocument();
        expect(getByText('Tiempo total')).toBeInTheDocument();

        const icons = document.querySelectorAll('i');
        expect(icons.length).toBe(2);
    });

    it('should render correctly with no props', () => {
        const { container } = render(<SummaryBox />);

        expect(container).toBeTruthy();
    });
});
