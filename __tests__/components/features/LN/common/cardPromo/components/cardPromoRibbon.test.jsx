import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPromoRibbon from '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoRibbon';
import { useCardPromoContext } from '../../../../../../../components/features/LN/common/cardPromo/context/cardPromoContext';
import { getResponsiveRibbonClasses } from '../../../../../../../components/features/LN/common/cardPromo/styles';

jest.mock('@ln/ds-cva', () => ({
    cva: jest.fn(() => jest.fn(() => 'ds-card-ribbon')),
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
        cardRibbonVariants: jest.fn(() => 'ds-card-ribbon'),
        getResponsiveRibbonClasses: jest.fn(() => ({ container: '', icon: '' }))
    })
);

describe('CardPromoRibbon', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useCardPromoContext.mockReturnValue({ size: 24, responsiveSize: {} });
        getResponsiveRibbonClasses.mockReturnValue({ container: '', icon: '' });
    });

    describe('rendering', () => {
        it('should render a note with the default aria-label', () => {
            render(<CardPromoRibbon />);
            expect(
                screen.getByRole('note', { name: 'Exclusivo suscriptor' })
            ).toBeInTheDocument();
        });

        it('should use the provided label as aria-label', () => {
            render(<CardPromoRibbon label="Solo suscriptores" />);
            expect(
                screen.getByRole('note', { name: 'Solo suscriptores' })
            ).toBeInTheDocument();
        });
    });

    describe('icon size by card size', () => {
        it('should apply size-16 to the icon when size is 18', () => {
            useCardPromoContext.mockReturnValue({
                size: 18,
                responsiveSize: {}
            });
            const { container } = render(<CardPromoRibbon />);
            expect(container.querySelector('svg')).toHaveClass('size-16');
        });

        it('should apply size-24 to the icon when size is not 18', () => {
            useCardPromoContext.mockReturnValue({
                size: 24,
                responsiveSize: {}
            });
            const { container } = render(<CardPromoRibbon />);
            expect(container.querySelector('svg')).toHaveClass('size-24');
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with default props', () => {
            const { asFragment } = render(<CardPromoRibbon />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
