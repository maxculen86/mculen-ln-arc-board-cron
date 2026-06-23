import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPromoContent from '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoContent';
import { useCardPromoContext } from '../../../../../../../components/features/LN/common/cardPromo/context/cardPromoContext';
import {
    cardContentVariants,
    getResponsiveCardClasses
} from '../../../../../../../components/features/LN/common/cardPromo/styles';

jest.mock('@ln/ds-cva', () => ({
    cva: jest.fn(() => jest.fn(() => 'ds-card-content')),
    cx: (...args) => args.flat().filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/context/cardPromoContext',
    () => ({
        useCardPromoContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/styles',
    () => ({
        cardContentVariants: jest.fn(() => 'ds-card-content'),
        getResponsiveCardClasses: jest.fn(() => '')
    })
);

const defaultContext = {
    size: 24,
    orientation: 'vertical',
    responsiveSize: {},
    responsiveOrientation: {}
};

describe('CardPromoContent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useCardPromoContext.mockReturnValue(defaultContext);
    });

    describe('rendering', () => {
        it('should render a div element with the provided children', () => {
            render(<CardPromoContent>Contenido</CardPromoContent>);
            const node = screen.getByText('Contenido');
            expect(node.tagName).toBe('DIV');
        });

        it('should apply the content class from variants', () => {
            render(<CardPromoContent>Contenido</CardPromoContent>);
            expect(screen.getByText('Contenido')).toHaveClass(
                'ds-card-content'
            );
        });
    });

    describe('responsive wiring', () => {
        it('should resolve responsive classes for the content component', () => {
            render(<CardPromoContent>Contenido</CardPromoContent>);
            expect(getResponsiveCardClasses).toHaveBeenCalledWith(
                'content',
                {},
                {},
                24,
                'vertical'
            );
        });

        it('should forward size and orientation from context to the variants', () => {
            useCardPromoContext.mockReturnValue({
                size: 18,
                orientation: 'horizontal',
                responsiveSize: {},
                responsiveOrientation: { md: 'vertical' }
            });
            render(<CardPromoContent>Contenido</CardPromoContent>);
            expect(cardContentVariants).toHaveBeenCalledWith(
                expect.objectContaining({ size: 18, orientation: 'horizontal' })
            );
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with default context', () => {
            const { asFragment } = render(
                <CardPromoContent>Contenido</CardPromoContent>
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
