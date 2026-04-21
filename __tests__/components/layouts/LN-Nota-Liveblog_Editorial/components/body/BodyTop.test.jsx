import React from 'react';
import { render, screen } from '@testing-library/react';
import BodyTop from '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/body/BodyTop';

// Mock dependencies
jest.mock(
    '../../../../../../components/features/LN-nota/breadcrumbArticle',
    () => () => <nav>Breadcrumb</nav>
);
jest.mock(
    '../../../../../../components/chains/LN10-global/staticContentV2',
    () =>
        ({ children }) => <div>{children}</div>
);

describe('BodyTop', () => {
    const mockDateTime = {
        date: '12 de marzo de 2026',
        time: '16:00'
    };

    it('displays formatted date text', () => {
        render(<BodyTop dateTime={mockDateTime}>Children</BodyTop>);
        expect(screen.getByText('12 de marzo de 2026')).toBeInTheDocument();
    });

    it('displays formatted time', () => {
        render(<BodyTop dateTime={mockDateTime}>Children</BodyTop>);
        expect(screen.getByText('16:00')).toBeInTheDocument();
    });

    it('sets datetime attribute to human-readable date', () => {
        render(<BodyTop dateTime={mockDateTime}>Children</BodyTop>);
        const timeElement = screen
            .getByText('12 de marzo de 2026')
            .closest('time');
        expect(timeElement).toHaveAttribute('datetime', '12 de marzo de 2026');
    });

    it('renders children', () => {
        render(<BodyTop dateTime={mockDateTime}>Test Children</BodyTop>);
        expect(screen.getByText('Test Children')).toBeInTheDocument();
    });
});
