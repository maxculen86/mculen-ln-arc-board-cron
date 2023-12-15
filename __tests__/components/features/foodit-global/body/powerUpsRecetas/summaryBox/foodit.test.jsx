import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timer, Resto } from '@ln/foodit-ui-assets';
import SummaryBox from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/summaryBox/foodit';

describe('components - features - foodit-global - body - powerUpRecetas - summaryBox - foodit', () => {
    const summaryBoxMock = [
        { icon: <Timer />, time: '10 min.', text: 'Tiempo de cocción' },
        { icon: <Resto />, time: '11 min.', text: 'Tiempo de Preparación' },
        { icon: <Timer />, time: '12 min.', text: 'Tiempo total' }
    ];
    it('should render correctly, items mapper and title', () => {
        const { getByText } = render(<SummaryBox items={summaryBoxMock} />);
        summaryBoxMock.forEach(item => {
            const text = getByText(item.text);
            const time = getByText(item.time);
            expect(text).toBeInTheDocument();
            expect(time).toBeInTheDocument();
        });
        const icons = document.querySelectorAll('i');
        expect(icons.length).toBe(3);
    });
});
