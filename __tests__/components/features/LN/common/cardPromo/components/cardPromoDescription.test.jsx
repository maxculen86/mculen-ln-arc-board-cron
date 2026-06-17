import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPromoDescription from '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoDescription';

jest.mock('@ln/ds-cva', () => ({
    cva: jest.fn(() => jest.fn(() => 'ds-card-description')),
    cx: (...args) => args.flat().filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/context/cardPromoContext',
    () => ({
        useCardPromoContext: jest.fn(() => ({
            size: 24,
            orientation: 'vertical',
            responsiveSize: {},
            responsiveOrientation: {}
        }))
    })
);

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/styles',
    () => ({
        cardDescriptionVariants: jest.fn(() => 'ds-card-description'),
        getResponsiveCardClasses: jest.fn(() => '')
    })
);

describe('CardPromoDescription', () => {
    describe('when children is not provided', () => {
        it('should return null when children is undefined', () => {
            const { container } = render(<CardPromoDescription />);
            expect(container.firstChild).toBeNull();
        });

        it('should return null when children is empty string', () => {
            const { container } = render(
                <CardPromoDescription>{''}</CardPromoDescription>
            );
            expect(container.firstChild).toBeNull();
        });

        it('should return null when children is null', () => {
            const { container } = render(
                <CardPromoDescription>{null}</CardPromoDescription>
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('when children is provided', () => {
        it('should render a paragraph element', () => {
            render(
                <CardPromoDescription>
                    Descripción del juego
                </CardPromoDescription>
            );
            const p = screen.getByText('Descripción del juego');
            expect(p.tagName).toBe('P');
        });

        it('should display the provided children text', () => {
            render(
                <CardPromoDescription>
                    Resuelve el crucigrama diario
                </CardPromoDescription>
            );
            expect(
                screen.getByText('Resuelve el crucigrama diario')
            ).toBeInTheDocument();
        });

        it('should apply the card description class from variants', () => {
            render(<CardPromoDescription>Texto</CardPromoDescription>);
            expect(screen.getByText('Texto')).toHaveClass(
                'ds-card-description'
            );
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with children', () => {
            const { asFragment } = render(
                <CardPromoDescription>Descripción</CardPromoDescription>
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when no children (renders null)', () => {
            const { asFragment } = render(<CardPromoDescription />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
