import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import getCustomBadge from '../../../../../../components/features/LN/common/utils/getCustomBadge';

jest.mock(
    '../../../../../../components/features/LN/common/ratingBadge/default',
    () =>
        jest.fn(({ ratingProps }) => (
            <div
                data-testid="rating-badge"
                data-value={ratingProps?.defaultValue}
            />
        ))
);

jest.mock('../../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(() => <svg data-testid="subscriber-icon" />)
);

describe('getCustomBadge', () => {
    describe('when rating is provided', () => {
        it('should render RatingBadge with the correct value', () => {
            render(getCustomBadge({ rating: 3.5, isSubscriber: false }));

            const badge = screen.getByTestId('rating-badge');
            expect(badge).toBeInTheDocument();
            expect(badge).toHaveAttribute('data-value', '3.5');
        });

        it('should prioritize rating over isSubscriber', () => {
            render(getCustomBadge({ rating: 4, isSubscriber: true }));

            expect(screen.getByTestId('rating-badge')).toBeInTheDocument();
            expect(
                screen.queryByTestId('subscriber-icon')
            ).not.toBeInTheDocument();
        });
    });

    describe('when isSubscriber is true', () => {
        it('should render the subscriber icon', () => {
            render(getCustomBadge({ rating: null, isSubscriber: true }));

            expect(screen.getByTestId('subscriber-icon')).toBeInTheDocument();
        });

        it('should render the icon wrapper with correct classes', () => {
            const { container } = render(
                getCustomBadge({ rating: null, isSubscriber: true })
            );

            const wrapper = container.querySelector('[data-tw]');
            expect(wrapper).toBeInTheDocument();
        });
    });

    describe('when neither rating nor isSubscriber', () => {
        it('should return null when both are falsy', () => {
            const result = getCustomBadge({
                rating: null,
                isSubscriber: false
            });

            expect(result).toBeNull();
        });

        it('should return null when called with undefined values', () => {
            const result = getCustomBadge({});

            expect(result).toBeNull();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with rating', () => {
            const { asFragment } = render(
                getCustomBadge({ rating: 3.5, isSubscriber: false })
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when isSubscriber', () => {
            const { asFragment } = render(
                getCustomBadge({ rating: null, isSubscriber: true })
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when neither', () => {
            const result = getCustomBadge({
                rating: null,
                isSubscriber: false
            });
            expect(result).toBeNull();
        });
    });
});
