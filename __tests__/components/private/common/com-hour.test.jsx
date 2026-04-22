import React from 'react';
import { render, screen } from '@testing-library/react';
import ComHour from '../../../../components/private/common/com-hour';

jest.mock(
    '../../../../components/private/common/utils/dateAndTimeUtil',
    () => () => ({ date: '12 de marzo de 2026', time: '11:30' })
);

jest.mock(
    '../../../../components/features/common/timezone/utils/timezoneConversion',
    () => ({ formatTimelineTime: () => null })
);

jest.mock(
    '../../../../resources/dist/css/ln/components/com-hour.css',
    () => ({})
);

describe('ComHour', () => {
    it('renders the time element with visible text and matching dateTime attribute', () => {
        render(<ComHour display_date="2026-03-12T14:30:00.000Z" />);
        const timeEl = screen.getByText('11:30');
        expect(timeEl.tagName.toLowerCase()).toBe('time');
        expect(timeEl).toHaveAttribute('datetime', '11:30');
    });

    it('returns null when labelEdicionImpresa is Impresa', () => {
        const { container } = render(
            <ComHour
                display_date="2026-03-12T14:30:00.000Z"
                labelEdicionImpresa={{ text: 'Impresa' }}
            />
        );
        expect(container.firstChild).toBeNull();
    });
});
