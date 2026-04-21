import React from 'react';
import { render } from '@testing-library/react';
import OpeningMeta from '../../../../../../components/layouts/LN-Nota-Cards/components/apertura/OpeningMeta';

jest.mock(
    '../../../../../../components/private/common/utils/dateAndTimeUtil',
    () => {
        const fn = jest.fn(() => ({
            date: '16 de abril de 2026',
            time: '13:30 hs.'
        }));
        const addHoursAndFormat = jest.fn((_n, d) => d);
        return { __esModule: true, default: fn, addHoursAndFormat };
    }
);

const PUBLISH_DATE = '2026-04-16T10:30:00.000Z';

describe('OpeningMeta', () => {
    it('renders a <time> element with datetime equal to the formatted date', () => {
        const { container } = render(
            <OpeningMeta data={{ publishDate: PUBLISH_DATE }} />
        );
        const timeEl = container.querySelector('time');
        expect(timeEl).not.toBeNull();
        expect(timeEl.getAttribute('datetime')).toBe('16 de abril de 2026');
    });

    it('renders the formatted date text visibly', () => {
        const { getByText } = render(
            <OpeningMeta data={{ publishDate: PUBLISH_DATE }} />
        );
        expect(getByText('16 de abril de 2026')).toBeTruthy();
    });

    it('does not crash when publishDate is undefined', () => {
        const { container } = render(<OpeningMeta data={{}} />);
        expect(container.querySelector('#openingMeta')).not.toBeNull();
    });

    it('does not crash when data is null', () => {
        const { container } = render(<OpeningMeta data={null} />);
        expect(container.querySelector('#openingMeta')).not.toBeNull();
    });
});
