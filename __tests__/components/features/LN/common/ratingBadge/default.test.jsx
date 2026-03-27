import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingBadge from '../../../../../../components/features/LN/common/ratingBadge/default';

jest.mock('../../../../../../components/features/ui/ln/rating/default', () =>
    jest.fn(props => <div data-testid="mock-rating" data-size={props.size} />)
);

jest.mock('../../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(({ name, size }) => (
        <span data-testid="mock-icon" data-name={name} data-size={size} />
    ))
);

const Rating = require('../../../../../../components/features/ui/ln/rating/default');

describe('components - features - LN - common - ratingBadge', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the outer wrapper with data-tw attribute', () => {
        const { container } = render(<RatingBadge />);
        expect(container.querySelector('[data-tw]')).toBeInTheDocument();
    });

    it('renders Rating with default size (16)', () => {
        render(<RatingBadge />);
        expect(screen.getByTestId('mock-rating')).toHaveAttribute(
            'data-size',
            '16'
        );
    });

    it('passes size=20 to Rating when specified', () => {
        render(<RatingBadge size={20} />);
        expect(screen.getByTestId('mock-rating')).toHaveAttribute(
            'data-size',
            '20'
        );
    });

    it('renders Rating with readOnly=true', () => {
        render(<RatingBadge />);
        expect(Rating.mock.calls[0][0]).toMatchObject({ readOnly: true });
    });

    it('applies padding classes for size=16 (py-8 px-12)', () => {
        const { container } = render(<RatingBadge size={16} />);
        const innerDiv = container.querySelector('[data-tw] > div');
        expect(innerDiv.className).toContain('py-8 px-12');
    });

    it('applies padding classes for size=20 (py-12 px-16)', () => {
        const { container } = render(<RatingBadge size={20} />);
        const innerDiv = container.querySelector('[data-tw] > div');
        expect(innerDiv.className).toContain('py-12 px-16');
    });

    it('merges extra className from containerProps', () => {
        const { container } = render(
            <RatingBadge containerProps={{ className: 'mt-12 mb-16' }} />
        );
        const innerDiv = container.querySelector('[data-tw] > div');
        expect(innerDiv.className).toContain('mt-12 mb-16');
    });

    it('spreads remaining containerProps onto the container div', () => {
        const { container } = render(
            <RatingBadge
                containerProps={{ 'data-testid': 'badge-container' }}
            />
        );
        expect(
            container.querySelector('[data-testid="badge-container"]')
        ).toBeInTheDocument();
    });

    it('delegates ratingProps to Rating', () => {
        render(<RatingBadge ratingProps={{ defaultValue: 4.5 }} />);
        expect(Rating.mock.calls[0][0]).toMatchObject({ defaultValue: 4.5 });
    });

    it('renders without errors when no props are provided', () => {
        expect(() => render(<RatingBadge />)).not.toThrow();
    });

    it('matches snapshot with default props', () => {
        const { asFragment } = render(<RatingBadge />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with size=20, ratingProps and containerProps', () => {
        const { asFragment } = render(
            <RatingBadge
                size={20}
                ratingProps={{ defaultValue: 3.5 }}
                containerProps={{ className: 'mt-12 mb-16' }}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
