import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysCalendarDetail from '../../../../../components/features/LN-services/holidaysCalendarDetail/default';
import outputMonthWithHolidays from '../../../../../__mocks__/data/holidays/outputMonthWithHolidays.json';

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

describe('Components- Features - HolidaysCalendarDetail - default.jsx - test', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: outputMonthWithHolidays
    }));
    it('Should match snapshot showing all the private components', () => {
        const { container } = render(<HolidaysCalendarDetail id="MOCKID" />);
        expect(container).toMatchSnapshot();
    });

    it('Should render the month detail calendar', () => {
        const { container } = render(<HolidaysCalendarDetail id="MOCKID" />);
        const gridContainer = container.getElementsByClassName(
            'holidays-card-calendar'
        );
        expect(gridContainer.length).toBe(1);
    });

    it('Should render the month title', () => {
        render(<HolidaysCalendarDetail id="MOCKID" />);
        expect(screen.getByText('Mayo')).toBeInTheDocument();
    });

    it('Should render the holidays of the month calendar', () => {
        const { container } = render(<HolidaysCalendarDetail id="MOCKID" />);
        const gridContainer = container.getElementsByClassName('--immovable');
        expect(gridContainer.length).toBe(2);
    });
});
