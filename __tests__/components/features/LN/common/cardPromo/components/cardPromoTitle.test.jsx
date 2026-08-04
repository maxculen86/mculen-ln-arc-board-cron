import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPromoTitle from '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoTitle';

jest.mock('@ln/ds-cva', () => ({
    cva: jest.fn(() => jest.fn(() => 'ds-card-title')),
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
        cardTitleVariants: jest.fn(() => 'ds-card-title'),
        getResponsiveCardClasses: jest.fn(() => '')
    })
);

describe('CardPromoTitle', () => {
    describe('when children is not provided', () => {
        it('should return null when children is undefined', () => {
            const { container } = render(<CardPromoTitle />);
            expect(container.firstChild).toBeNull();
        });

        it('should return null when children is empty string', () => {
            const { container } = render(<CardPromoTitle>{''}</CardPromoTitle>);
            expect(container.firstChild).toBeNull();
        });

        it('should return null when children is null', () => {
            const { container } = render(
                <CardPromoTitle>{null}</CardPromoTitle>
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('when children is provided', () => {
        it('should render default a h2 element', () => {
            render(<CardPromoTitle>Mi Juego</CardPromoTitle>);
            const h2 = screen.getByText('Mi Juego');
            expect(h2.tagName).toBe('H2');
        });

        it('should render a span element', () => {
            render(<CardPromoTitle as="span">Mi Juego</CardPromoTitle>);
            const span = screen.getByText('Mi Juego');
            expect(span.tagName).toBe('SPAN');
        });

        it('should display the provided children text', () => {
            render(<CardPromoTitle>Crucigrama</CardPromoTitle>);
            expect(screen.getByText('Crucigrama')).toBeInTheDocument();
        });

        it('should apply the card title class from variants', () => {
            render(<CardPromoTitle>Sudoku</CardPromoTitle>);
            expect(screen.getByText('Sudoku')).toHaveClass('ds-card-title');
        });

        it('should render with numeric children', () => {
            render(<CardPromoTitle>{42}</CardPromoTitle>);
            expect(screen.getByText('42')).toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with children', () => {
            const { asFragment } = render(
                <CardPromoTitle>Mi Juego</CardPromoTitle>
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with children and span tag', () => {
            const { asFragment } = render(
                <CardPromoTitle as="span">Mi Juego</CardPromoTitle>
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when no children (renders null)', () => {
            const { asFragment } = render(<CardPromoTitle />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
