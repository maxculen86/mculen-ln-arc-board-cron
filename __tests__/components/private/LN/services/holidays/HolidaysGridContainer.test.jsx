import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysGridContainer from '../../../../../../components/private/LN/services/holidays/HolidaysGridContainer';

describe('components - private - holidays - HolidaysGridContainer', () => {
    let component;
    const calendarss = [
        {
            monthNumber: 1,
            monthName: 'Enero',
            year: '2022',
            holidayData: [
                {
                    days: [1],
                    reason: 'Año nuevo',
                    day_type: 1,
                    day_type_name: 'Inamovible'
                }
            ]
        },
        {
            monthNumber: 2,
            monthName: 'Febrero',
            year: '2022',
            holidayData: [
                {
                    days: [28],
                    reason: 'Carnaval',
                    day_type: 1,
                    day_type_name: 'Inamovible'
                }
            ]
        }
    ];

    beforeEach(() => {
        component = render(<HolidaysGridContainer calendars={calendarss} />);
    });

    test('snapshot HolidaysGridContainer', () => {
        expect(component.container).toMatchSnapshot();
    });

    test('existance of links to month page', () => {
        expect(
            component.getAllByTitle('Ir a feriados de ', {
                exact: false
            }).length
        ).toBe(calendarss.length);

        expect(
            component.getAllByTitle('Ir a feriados de ', {
                exact: false
            })[0]
        ).toHaveAttribute(
            'href',
            expect.stringContaining(
                `https://www.lanacion.com.ar/feriados/${
                    calendarss[0].year
                }/${calendarss[0].monthName.toLowerCase()}/`
            )
        );
    });
});
