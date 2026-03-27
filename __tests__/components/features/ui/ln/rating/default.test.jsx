import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Rating from '../../../../../../components/features/ui/ln/rating/default';

jest.mock('@ln/ds-common-rating', () => ({
    Rating: jest.fn(({ defaultValue, precision, ...props }) => (
        <div
            data-testid="common-rating"
            data-default-value={defaultValue}
            data-precision={precision}
            {...props}
        />
    ))
}));

const { Rating: CommonRating } = require('@ln/ds-common-rating');

describe('components - features - ui - ln - rating', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with default values (defaultValue=0.5, precision=0.5)', () => {
        const { getByTestId } = render(<Rating />);
        const el = getByTestId('common-rating');

        expect(el).toBeInTheDocument();
        expect(el).toHaveAttribute('data-default-value', '0.5');
        expect(el).toHaveAttribute('data-precision', '0.5');
    });

    it('allows overriding defaultValue', () => {
        const { getByTestId } = render(<Rating defaultValue={3} />);

        expect(getByTestId('common-rating')).toHaveAttribute(
            'data-default-value',
            '3'
        );
    });

    it('allows overriding precision', () => {
        const { getByTestId } = render(<Rating precision={1} />);

        expect(getByTestId('common-rating')).toHaveAttribute(
            'data-precision',
            '1'
        );
    });

    it('forwards additional props to the underlying CommonRating', () => {
        render(<Rating readOnly size={20} />);

        expect(CommonRating.mock.calls[0][0]).toMatchObject({
            readOnly: true,
            size: 20
        });
    });

    it('keeps defaultValue=0.5 when undefined is received', () => {
        render(<Rating defaultValue={undefined} />);

        expect(CommonRating.mock.calls[0][0]).toMatchObject({
            defaultValue: 0.5
        });
    });

    it('keeps precision=0.5 when undefined is received', () => {
        render(<Rating precision={undefined} />);

        expect(CommonRating.mock.calls[0][0]).toMatchObject({ precision: 0.5 });
    });

    it('matches snapshot with default props', () => {
        const { asFragment } = render(<Rating />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with custom props', () => {
        const { asFragment } = render(
            <Rating defaultValue={3.5} precision={1} readOnly size={20} />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
