import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysNav from '../../../../../../components/private/LN/services/holidays/HolidaysNav';

describe('components - private - holidays - HolidaysNav', () => {
    let component;
    const mockDate = new Date(2023, 6, 1);
    const mockYear = mockDate.getFullYear();
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    beforeEach(() => {
        component = render(<HolidaysNav year={mockYear} layout="home" />);
    });

    test('Should match snapshot HolidaysNav', () => {
        expect(component.container).toMatchSnapshot();
    });

    test('Existance of buttons containing links to two other years', () => {
        expect(
            component.getByTitle(`Ir a feriados ${mockYear - 1}`, {
                exact: false
            })
        ).toHaveAttribute(
            'href',
            expect.stringContaining(`/feriados/${mockYear - 1}/`)
        );

        expect(
            component.getByTitle(`Ir a feriados ${mockYear + 1}`, {
                exact: false
            })
        ).toHaveAttribute(
            'href',
            expect.stringContaining(`/feriados/${mockYear + 1}/`)
        );

        expect(
            component.getAllByTitle(`Ir a feriados `, {
                exact: false
            })
        ).toHaveLength(2);
    });
});
