import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import getBadge from '../../../../../components/private/common/utils/getBadge';

jest.mock(
    '../../../../../components/features/LN/common/ratingBadge/default',
    () =>
        jest.fn(({ ratingProps }) => (
            <div
                data-testid="rating-badge"
                data-value={ratingProps?.defaultValue}
            />
        ))
);

jest.mock('../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(() => <svg data-testid="subscriber-icon" />)
);

describe('getBadge', () => {
    describe('when contentCode is cerrada', () => {
        it('should render the subscriber icon', () => {
            const { container } = render(getBadge('cerrada', {}));

            expect(screen.getByTestId('subscriber-icon')).toBeInTheDocument();
            expect(container.querySelector('.ln-badge')).toBeInTheDocument();
        });

        it('should not render a text badge', () => {
            render(
                getBadge('cerrada', {
                    text: 'Suscriptores',
                    style: 'subscriber'
                })
            );

            expect(screen.queryByText('Suscriptores')).not.toBeInTheDocument();
        });
    });

    describe('when contentCode is comun', () => {
        it('should render the chapita badge with label text', () => {
            render(getBadge('comun', { text: 'Chapita', style: 'live' }));

            expect(screen.getByText('Chapita')).toBeInTheDocument();
        });

        it('should return null when label text is empty', () => {
            const result = getBadge('comun', { text: '', style: 'live' });

            expect(result).toBeNull();
        });

        it('should return null when label text is only whitespace', () => {
            const result = getBadge('comun', { text: '   ', style: 'live' });

            expect(result).toBeNull();
        });
    });

    describe('when contentCode is undefined', () => {
        it('should fall back to comun and render label text', () => {
            render(getBadge(undefined, { text: 'Chapita', style: 'live' }));

            expect(screen.getByText('Chapita')).toBeInTheDocument();
        });

        it('should return null when label text is also undefined', () => {
            const result = getBadge(undefined, {
                text: undefined,
                style: 'live'
            });

            expect(result).toBeNull();
        });
    });

    describe('when rating is provided', () => {
        it('should render RatingBadge with the correct value', () => {
            render(getBadge('comun', {}, 3.5));

            const badge = screen.getByTestId('rating-badge');
            expect(badge).toBeInTheDocument();
            expect(badge).toHaveAttribute('data-value', '3.5');
        });

        it('should prioritize rating over cerrada', () => {
            render(getBadge('cerrada', {}, 4));

            expect(screen.getByTestId('rating-badge')).toBeInTheDocument();
            expect(
                screen.queryByTestId('subscriber-icon')
            ).not.toBeInTheDocument();
        });

        it('should wrap RatingBadge in ln-rating-badge', () => {
            const { container } = render(getBadge('comun', {}, 3.5));

            expect(
                container.querySelector('.ln-rating-badge')
            ).toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot for cerrada', () => {
            const { asFragment } = render(getBadge('cerrada', {}));
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot for comun with label', () => {
            const { asFragment } = render(
                getBadge('comun', { text: 'En Vivo', style: 'live' })
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with rating', () => {
            const { asFragment } = render(getBadge('comun', {}, 4.5));
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
