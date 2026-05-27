import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badge from '../default';

jest.mock('@ln/ds-common-badge', () => ({
    Badge: jest.fn(({ children, ...props }) => (
        <span data-testid="common-badge" {...props}>
            {children}
        </span>
    ))
}));

describe('Badge facade (foodit)', () => {
    it('renders CommonBadge', () => {
        render(<Badge>LUNES</Badge>);
        expect(screen.getByTestId('common-badge')).toBeInTheDocument();
    });

    it('renders children', () => {
        render(<Badge>MIERCOLES</Badge>);
        expect(screen.getByText('MIERCOLES')).toBeInTheDocument();
    });

    it('forwards all props to CommonBadge', () => {
        render(
            <Badge size={20} color="custom" className="custom-class">
                LUNES
            </Badge>
        );
        const badge = screen.getByTestId('common-badge');
        expect(badge).toHaveClass('custom-class');
    });

    it('renders without children', () => {
        render(<Badge size={16} />);
        expect(screen.getByTestId('common-badge')).toBeInTheDocument();
    });
});
