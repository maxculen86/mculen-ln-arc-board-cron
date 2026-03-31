import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppContext } from 'fusion:context';
import RenderRatingNote from '../../../../../components/private/common/layouts/renderRatingNote';
import { NOTICIA } from '../../../../../components/private/common/utils/subtypes/subtypeHelper';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../components/features/LN/common/ratingBadge/default',
    () =>
        jest.fn(({ size, ratingProps, containerProps }) => (
            <div
                data-testid="mock-rating-badge"
                data-size={size}
                data-default-value={ratingProps?.defaultValue}
                data-container-class={containerProps?.className}
            />
        ))
);

const buildGlobalContent = ({ subtype, contentElements = [] } = {}) => ({
    subtype,
    content_elements: contentElements
});

const ratingElement = { type: 'numeric_rating', numeric_rating: 4.5 };
const nonRatingElement = { type: 'text', content: 'Sample text' };

describe('components - private - common - layouts - renderRatingNote', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when conditions are NOT met', () => {
        it('returns null when subtype is not NOTICIA even if a ratingElement exists', () => {
            useAppContext.mockReturnValue({
                globalContent: buildGlobalContent({
                    subtype: '2', // INFOGRAFIA
                    contentElements: [ratingElement]
                })
            });

            const { container } = render(<RenderRatingNote />);
            expect(container).toBeEmptyDOMElement();
        });

        it('returns null when subtype is NOTICIA but there is no ratingElement', () => {
            useAppContext.mockReturnValue({
                globalContent: buildGlobalContent({
                    subtype: NOTICIA,
                    contentElements: [nonRatingElement]
                })
            });

            const { container } = render(<RenderRatingNote />);
            expect(container).toBeEmptyDOMElement();
        });

        it('returns null when content_elements is empty', () => {
            useAppContext.mockReturnValue({
                globalContent: buildGlobalContent({
                    subtype: NOTICIA,
                    contentElements: []
                })
            });

            const { container } = render(<RenderRatingNote />);
            expect(container).toBeEmptyDOMElement();
        });

        it('returns null when subtype is undefined', () => {
            useAppContext.mockReturnValue({
                globalContent: buildGlobalContent({
                    subtype: undefined,
                    contentElements: [ratingElement]
                })
            });

            const { container } = render(<RenderRatingNote />);
            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('when conditions ARE met (subtype=NOTICIA + ratingElement)', () => {
        beforeEach(() => {
            useAppContext.mockReturnValue({
                globalContent: buildGlobalContent({
                    subtype: NOTICIA,
                    contentElements: [ratingElement]
                })
            });
        });

        it('renders the RatingBadge', () => {
            render(<RenderRatingNote />);
            expect(screen.getByTestId('mock-rating-badge')).toBeInTheDocument();
        });

        it('passes size=20 to RatingBadge', () => {
            render(<RenderRatingNote />);
            expect(screen.getByTestId('mock-rating-badge')).toHaveAttribute(
                'data-size',
                '20'
            );
        });

        it('passes numeric_rating as defaultValue in ratingProps', () => {
            render(<RenderRatingNote />);
            expect(screen.getByTestId('mock-rating-badge')).toHaveAttribute(
                'data-default-value',
                '4.5'
            );
        });

        it('passes spacing classes "mt-12 mb-16" via containerProps', () => {
            render(<RenderRatingNote />);
            expect(screen.getByTestId('mock-rating-badge')).toHaveAttribute(
                'data-container-class',
                'mt-12 mb-16'
            );
        });

        it('picks the first numeric_rating element among multiple content_elements', () => {
            useAppContext.mockReturnValue({
                globalContent: buildGlobalContent({
                    subtype: NOTICIA,
                    contentElements: [
                        nonRatingElement,
                        { type: 'numeric_rating', numeric_rating: 3 }
                    ]
                })
            });

            render(<RenderRatingNote />);
            expect(screen.getByTestId('mock-rating-badge')).toHaveAttribute(
                'data-default-value',
                '3'
            );
        });

        it('matches snapshot', () => {
            const { asFragment } = render(<RenderRatingNote />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
