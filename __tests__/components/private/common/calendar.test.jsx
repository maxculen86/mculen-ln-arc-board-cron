import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from '../../../../components/private/common/calendar/Calendar';

describe('Components - common - Calendar =>', () => {
    it('testing components without props', () => {
        const { container } = render(<Calendar />);
        expect(container.getElementsByClassName('calendar-common').length).toBe(
            1
        );
        expect(
            container.getElementsByClassName(
                'com-text --arial --font-bold --4xs'
            ).length
        ).toBe(8);
        expect(container).toMatchSnapshot();
    });

    it('Test calendar with prop month', () => {
        const props = {
            month: 3
        };
        const { container } = render(<Calendar month={props.month} />);

        expect(
            container.getElementsByClassName('labeled-calendar').length
        ).toBe(1);

        expect(container.innerHTML.includes('Abril</h2>')).toBe(true);

        expect(container).toMatchSnapshot();
    });

    it('Test calendar with prop daysHighlight', () => {
        const props = {
            year: 2014,
            month: 3,
            daysHighlight: [
                {
                    day: 9,
                    class: 'bg-green'
                }
            ]
        };
        const { container } = render(
            <Calendar
                year={props.year}
                month={props.month}
                daysHighlight={props.daysHighlight}
            />
        );

        expect(container.getElementsByClassName('bg-green').length).toBe(1);
        expect(container).toMatchSnapshot();
    });
});
