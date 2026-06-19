import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPromoMedia from '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoMedia';
import { useCardPromoContext } from '../../../../../../../components/features/LN/common/cardPromo/context/cardPromoContext';
import { getResponsiveCardClasses } from '../../../../../../../components/features/LN/common/cardPromo/styles';

jest.mock('@ln/ds-cva', () => ({
    cva: jest.fn(() => jest.fn(() => 'ds-card-media')),
    cx: (...args) => args.flat().filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/image/default',
    () =>
        function MockImage({ src, alt, sources }) {
            return (
                <img
                    src={src}
                    alt={alt}
                    data-sources={(sources || []).length}
                />
            );
        }
);

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/context/cardPromoContext',
    () => ({
        useCardPromoContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/styles',
    () => ({
        cardMediaVariants: jest.fn(() => 'ds-card-media'),
        getResponsiveCardClasses: jest.fn(() => '')
    })
);

const defaultContext = {
    size: 24,
    orientation: 'vertical',
    responsiveSize: {},
    responsiveOrientation: {}
};

describe('CardPromoMedia', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useCardPromoContext.mockReturnValue(defaultContext);
    });

    describe('rendering', () => {
        it('should render an image with the provided alt text', () => {
            render(<CardPromoMedia src="/img.jpg" alt="Crucigrama" />);
            expect(screen.getByAltText('Crucigrama')).toBeInTheDocument();
        });

        it('should render an image with the provided src', () => {
            render(<CardPromoMedia src="/img.jpg" alt="Crucigrama" />);
            expect(screen.getByAltText('Crucigrama')).toHaveAttribute(
                'src',
                '/img.jpg'
            );
        });

        it('should default sources to an empty array when not provided', () => {
            render(<CardPromoMedia src="/img.jpg" alt="Crucigrama" />);
            expect(screen.getByAltText('Crucigrama')).toHaveAttribute(
                'data-sources',
                '0'
            );
        });

        it('should pass through the provided sources', () => {
            render(
                <CardPromoMedia
                    src="/img.jpg"
                    alt="Crucigrama"
                    sources={[{ srcset: 'a' }, { srcset: 'b' }]}
                />
            );
            expect(screen.getByAltText('Crucigrama')).toHaveAttribute(
                'data-sources',
                '2'
            );
        });
    });

    describe('responsive wiring', () => {
        it('should resolve responsive classes for the media component', () => {
            render(<CardPromoMedia src="/img.jpg" alt="Crucigrama" />);
            expect(getResponsiveCardClasses).toHaveBeenCalledWith(
                'media',
                {},
                {},
                24,
                'vertical'
            );
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with default context', () => {
            const { asFragment } = render(
                <CardPromoMedia src="/img.jpg" alt="Crucigrama" />
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
