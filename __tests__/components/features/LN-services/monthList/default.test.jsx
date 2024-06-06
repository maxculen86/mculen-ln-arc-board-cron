import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MonthsList from '../../../../../components/features/LN-services/monthsList/default';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
export const monthNames = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
];

describe('Tests the month list.', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { serviceItem: '2024' }
    }));

    it('Should have the names of these classes', () => {
        const { container } = render(<MonthsList />);

        expect(container).toBeTruthy();
        expect(
            container.getElementsByClassName('service-list --font-bold')
        ).toHaveLength(1);
        expect(container.getElementsByClassName('service-item')).toHaveLength(
            monthNames.length
        );
        expect(
            container.getElementsByTagName('a')[0].getAttribute('class')
        ).toBe('com-link');
    });

    it('Should match the snapshot', () => {
        const { container } = render(<MonthsList />);

        expect(container).toMatchSnapshot();
    });

    it('Should render all months', () => {
        render(<MonthsList />);

        const anchors = screen.getAllByRole('link');

        expect(anchors).toHaveLength(monthNames.length);

        anchors.forEach((anchor, index) => {
            expect(anchor).toHaveTextContent(monthNames[index]);
            expect(anchor.getAttribute('title')).toBe(
                `Ir a feriados de ${monthNames[index]} del 2024`
            );
            expect(anchor.getAttribute('href')).toBe(
                `/feriados/2024/${monthNames[index]}/`
            );
        });
    });
});
