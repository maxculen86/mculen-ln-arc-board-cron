import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysNav from '../../../../../../components/private/LN/services/holidays/HolidaysNav';

describe('components - private - holidays - HolidaysNav', () => {
    let component;
    let mockYear = new Date().getFullYear();

    beforeEach(() => {
        component = render(<HolidaysNav year={mockYear} />);
    });

    test('snapshot HolidaysNav', () => {
        expect(component.container).toMatchSnapshot();
    });

    test('existance of buttons containing links to two other years', () => {
        expect(
            component.getByTitle(`ir a feriados ${mockYear - 1}`, {
                exact: false
            })
        ).toHaveAttribute(
            'href',
            expect.stringContaining(
                `https://www.lanacion.com.ar/feriados/${mockYear - 1}/`
            )
        );

        expect(
            component.getByTitle(`ir a feriados ${mockYear + 1}`, {
                exact: false
            })
        ).toHaveAttribute(
            'href',
            expect.stringContaining(
                `https://www.lanacion.com.ar/feriados/${mockYear + 1}/`
            )
        );

        expect(
            component.getAllByTitle(`ir a feriados `, {
                exact: false
            })
        ).toHaveLength(2);
    });
});
