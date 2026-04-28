import React from 'react';
import { render } from '@testing-library/react';
import SimpleDate from '../../../../../components/features/LN-nota/simpleDate/default';

jest.mock('fusion:static', () => ({
    __esModule: true,
    default: ({ children }) => <div>{children}</div>
}));

jest.mock(
    '../../../../../components/features/LN-nota/simpleDate/styles',
    () => ({
        dateVariants: () => 'mock-date-variant-class'
    })
);

jest.mock(
    '../../../../../components/private/common/utils/dateAndTimeUtil',
    () => jest.fn(() => ({ date: '16 de abril de 2026', time: '10:30 hs.' }))
);

const ISO_DATE = '2026-04-16T10:30:00.000Z';

describe('SimpleDate', () => {
    it('renders a <time> element with the correct datetime attribute', () => {
        const { container } = render(<SimpleDate dateTime={ISO_DATE} />);
        const timeEl = container.querySelector('time');
        expect(timeEl).not.toBeNull();
        expect(timeEl.getAttribute('datetime')).toBe('16 de abril de 2026');
    });

    it('renders both date and time text when showTime is true', () => {
        const { getByText } = render(
            <SimpleDate dateTime={ISO_DATE} showTime />
        );
        expect(getByText('16 de abril de 2026')).toBeTruthy();
        expect(getByText('10:30 hs.')).toBeTruthy();
    });

    it('renders only date text when showTime is false', () => {
        const { getByText, queryByText } = render(
            <SimpleDate dateTime={ISO_DATE} showTime={false} />
        );
        expect(getByText('16 de abril de 2026')).toBeTruthy();
        expect(queryByText('10:30 hs.')).toBeNull();
    });

    it('renders without errors when variant prop is provided', () => {
        const { container } = render(
            <SimpleDate dateTime={ISO_DATE} variant="light" />
        );
        expect(container.querySelector('time')).not.toBeNull();
    });
});
