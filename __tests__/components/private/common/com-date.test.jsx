import React from 'react';
import { render, screen } from '@testing-library/react';
import ComDate from '../../../../components/private/common/com-date';

// Mock fusion:static
const mockStatic = ({ children }) => <div>{children}</div>;
jest.mock('fusion:static', () => ({
    __esModule: true,
    default: mockStatic
}));

describe('ComDate', () => {
    const isoDate = '2026-03-12T14:30:00.000Z';

    it('displays formatted date text', () => {
        render(<ComDate display_date={isoDate} />);
        expect(screen.getByText(/12 de marzo de 2026/i)).toBeInTheDocument();
    });

    it('sets datetime attribute to the human-readable date', () => {
        render(<ComDate display_date={isoDate} />);
        const timeElement = screen
            .getByText(/12 de marzo de 2026/i)
            .closest('time');
        expect(timeElement).toHaveAttribute('datetime', '12 de marzo de 2026');
    });

    it('accepts size prop with CSS class suffix', () => {
        render(<ComDate display_date={isoDate} size="--fourxs" />);
        const timeElement = screen
            .getByText(/12 de marzo de 2026/i)
            .closest('time');
        expect(timeElement).toHaveClass('com-date --fourxs');
    });

    it('defaults to --twoxs size when no size prop provided', () => {
        render(<ComDate display_date={isoDate} />);
        const timeElement = screen
            .getByText(/12 de marzo de 2026/i)
            .closest('time');
        expect(timeElement).toHaveClass('com-date --twoxs');
    });
});
