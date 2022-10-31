import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysMonthNav from '../../../../../../components/private/LN/services/holidays/HolidaysMonthNav';

describe('components - private - holidays - HolidaysNav', () => {
    let component;
    const dataFeriadosMes = {
        calendar: {
            year: '2021',
            monthNumber: 12,
            monthName: 'Diciembre',
            monthHolidays: [
                {
                    month: 12
                }
            ]
        },
        previousAndNextCalendar: {
            next: {
                text: 'enero 2022',
                url: '/feriados/2022/enero/'
            }
        }
    };

    beforeEach(() => {
        component = render(
            <HolidaysMonthNav
                calendar={dataFeriadosMes.calendar}
                previousAndNextCalendar={
                    dataFeriadosMes.previousAndNextCalendar
                }
            />
        );
    });

    test('snapshot HolidaysMonthNav', () => {
        expect(component.container).toMatchSnapshot();
    });

    test('existance of button containing link to previous month to be false if prop "previousAndNextHolidays", "previous" property is undefined', () => {
        expect(
            component.getAllByTitle(`Ir a feriados de `, {
                exact: false
            })
        ).toHaveLength(1);
        expect(
            component.getAllByTitle(`Ir a feriados de `, {
                exact: false
            })[0]
        ).toHaveAttribute(
            'title',
            `Ir a feriados de ${dataFeriadosMes.previousAndNextCalendar.next.text}`
        );
    });
});
