import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysHomeCalendar from '../../../../../components/features/LN-services/holidaysCalendar/default';
import outputTransformHome from '../../../../../__mocks__/data/holidays/outputTransformHome.json';

jest.mock(
    '../../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('Components- Features - HolidaysCalendar - default.jsx - test', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: outputTransformHome
    }));
    it('Should match snapshot showing all the private components', () => {
        const { container } = render(<HolidaysHomeCalendar id="QWERTYUIOP" />);
        expect(container).toMatchSnapshot();
    });

    it('Should render all the calendars in the right order', () => {
        const { container } = render(<HolidaysHomeCalendar id="QWERTYUIOP" />);
        const calendars = container.getElementsByClassName(
            'holidays-card-calendar'
        );
        expect(calendars.length).toBe(12);
    });

    it('Should render the holidays grid container properly', () => {
        const { container } = render(<HolidaysHomeCalendar id="QWERTYUIOP" />);
        const gridContainer = container.getElementsByClassName(
            'holidays-grid-container'
        );
        expect(gridContainer.length).toBe(1);
    });

    it('Should render the month titles', () => {
        render(<HolidaysHomeCalendar id="QWERTYUIOP" />);
        monthNames.forEach(month => {
            expect(screen.getByText(month)).toBeInTheDocument();
        });
    });
});

const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];
