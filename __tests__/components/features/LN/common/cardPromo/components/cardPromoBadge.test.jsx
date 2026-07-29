import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPromoBadge from '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoBadge';

jest.mock('@ln/ds-common-badge', () => ({
    Badge: function MockBadge({ children }) {
        return <span data-testid="badge">{children}</span>;
    }
}));

describe('CardPromoBadge', () => {
    describe('rendering', () => {
        it('should render the provided label', () => {
            render(<CardPromoBadge label="NUEVO EPISODIO" />);
            expect(screen.getByText('NUEVO EPISODIO')).toBeInTheDocument();
        });

        it('should default the label to "nuevo" when none is provided', () => {
            render(<CardPromoBadge />);
            expect(screen.getByText('nuevo')).toBeInTheDocument();
        });
    });

    describe('positioning', () => {
        it('should sit 4px inside the top-right corner', () => {
            const { container } = render(<CardPromoBadge />);

            expect(container.firstChild).toHaveClass(
                'absolute',
                'top-4',
                'right-4'
            );
        });

        it('should stack above the media', () => {
            const { container } = render(<CardPromoBadge />);

            expect(container.firstChild).toHaveClass('z-10');
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with a custom label', () => {
            const { asFragment } = render(<CardPromoBadge label="NUEVO" />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with the default label', () => {
            const { asFragment } = render(<CardPromoBadge />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
