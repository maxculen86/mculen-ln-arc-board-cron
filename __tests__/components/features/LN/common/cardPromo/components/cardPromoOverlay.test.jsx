import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPromoOverlay from '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoOverlay';

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoBadge',
    () =>
        function MockCardPromoBadge({ label }) {
            return <span data-testid="card-badge">{label}</span>;
        }
);

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoRibbon',
    () =>
        function MockCardPromoRibbon() {
            return <div data-testid="card-ribbon" />;
        }
);

describe('CardPromoOverlay', () => {
    describe('when neither ribbon nor badge is provided', () => {
        it('should return null when both ribbon and badge are falsy', () => {
            const { container } = render(<CardPromoOverlay />);
            expect(container.firstChild).toBeNull();
        });

        it('should return null when ribbon is false and badge is undefined', () => {
            const { container } = render(<CardPromoOverlay ribbon={false} />);
            expect(container.firstChild).toBeNull();
        });

        it('should return null when ribbon is false and badge is null', () => {
            const { container } = render(
                <CardPromoOverlay ribbon={false} badge={null} />
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('when ribbon is true', () => {
        it('should render CardPromoRibbon', () => {
            render(<CardPromoOverlay ribbon={true} />);
            expect(screen.getByTestId('card-ribbon')).toBeInTheDocument();
        });

        it('should not render CardPromoBadge when ribbon is true', () => {
            render(<CardPromoOverlay ribbon={true} badge="NUEVO" />);
            expect(screen.queryByTestId('card-badge')).not.toBeInTheDocument();
        });

        it('should render ribbon even when badge is also provided', () => {
            render(<CardPromoOverlay ribbon={true} badge="NUEVO" />);
            expect(screen.getByTestId('card-ribbon')).toBeInTheDocument();
        });
    });

    describe('when badge is provided and ribbon is false', () => {
        it('should render CardPromoBadge when badge has a value', () => {
            render(
                <CardPromoOverlay
                    ribbon={false}
                    badge="NUEVO"
                    badgeLabel="nuevo"
                />
            );
            expect(screen.getByTestId('card-badge')).toBeInTheDocument();
        });

        it('should pass badgeLabel to CardPromoBadge', () => {
            render(
                <CardPromoOverlay
                    ribbon={false}
                    badge="NUEVO"
                    badgeLabel="nuevo episodio"
                />
            );
            expect(screen.getByText('nuevo episodio')).toBeInTheDocument();
        });

        it('should not render CardPromoRibbon when ribbon is false', () => {
            render(<CardPromoOverlay ribbon={false} badge="NUEVO" />);
            expect(screen.queryByTestId('card-ribbon')).not.toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot when returns null', () => {
            const { asFragment } = render(<CardPromoOverlay />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with ribbon', () => {
            const { asFragment } = render(<CardPromoOverlay ribbon={true} />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with badge', () => {
            const { asFragment } = render(
                <CardPromoOverlay
                    ribbon={false}
                    badge="NUEVO"
                    badgeLabel="nuevo"
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
