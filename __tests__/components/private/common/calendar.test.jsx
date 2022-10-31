import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from '../../../../components/private/common/calendar/Calendar';

describe('Components - common - Calendar =>', () => {
    it('Test calendar without props', () => {
        const { container } = render(<Calendar />);

        expect(
            container.getElementsByClassName('labeled-calendar').length
        ).toBe(1);
        expect(container).toMatchSnapshot();
    });

    it('Test calendar with prop holidayData', () => {
        const calendar = {
            monthNumber: 5,
            monthName: 'Mayo',
            year: '2022',
            holidayData: [
                {
                    days: [1],
                    reason: 'Día del Trabajador.',
                    day_type: 2,
                    day_type_name: 'Trasladable'
                },
                {
                    days: [25],
                    reason: 'Día de la Revolución de Mayo.',
                    day_type: 1,
                    day_type_name: 'Inamovible'
                }
            ]
        };
        const { container } = render(
            <Calendar
                year={calendar.year}
                monthNumber={calendar.monthNumber}
                monthName={calendar.monthName}
                holidayData={calendar.holidayData}
                layout="month"
            />
        );

        expect(container.getElementsByClassName('--transferable').length).toBe(
            1
        );
        expect(container.getElementsByClassName('--immovable').length).toBe(1);
        expect(container).toMatchSnapshot();
    });
});
