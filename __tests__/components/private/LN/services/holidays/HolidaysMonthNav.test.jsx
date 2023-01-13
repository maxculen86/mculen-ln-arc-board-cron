import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysMonthNav from '../../../../../../components/private/LN/services/holidays/HolidaysMonthNav';

describe('components - private - holidays - HolidaysNav', () => {
    const mockCalendarDate = () => {
        const mockActualDate = new Date(2022, 10, 17);
        const mockFirstDayDate = new Date(2022, 10, 1);
        const mockLastDayDate = new Date(2022, 10, 0);
        const spy = jest
            .spyOn(global, 'Date')
            .mockImplementationOnce(() => mockActualDate)
            .mockImplementationOnce(() => mockActualDate)
            .mockImplementationOnce(() => mockFirstDayDate)
            .mockImplementationOnce(() => mockLastDayDate);
    };
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
                title: 'Ir a feriados de enero del 2022',
                url: 'feriados/2022/enero/'
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
        mockCalendarDate();
        expect(component.container).toMatchSnapshot();
    });

    test('existance of button containing link to previous month to be false if prop "previousAndNextHolidays", "previous" property is undefined', () => {
        mockCalendarDate();
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
            `${dataFeriadosMes.previousAndNextCalendar.next.title}`
        );
    });
});
