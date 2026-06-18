import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPromoRoot from '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoRoot';

jest.mock('@ln/ds-cva', () => ({
    cva: jest.fn(() => jest.fn(() => 'ds-card')),
    cx: (...args) => args.flat().filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/context/cardPromoContext',
    () => ({
        CardPromoProvider: ({ children }) => children
    })
);

jest.mock(
    '../../../../../../../components/features/LN/common/cardPromo/styles',
    () => ({
        cardRootVariants: jest.fn(() => 'ds-card'),
        getResponsiveCardClasses: jest.fn(() => ''),
        normalizeResponsive: jest.fn((value, defaultValue) => ({
            default: value ?? defaultValue
        }))
    })
);

describe('CardPromoRoot', () => {
    describe('rendering', () => {
        it('should render an anchor element', () => {
            render(<CardPromoRoot href="/test">Contenido</CardPromoRoot>);
            expect(screen.getByRole('link')).toBeInTheDocument();
        });

        it('should set the href attribute on the anchor', () => {
            render(
                <CardPromoRoot href="/juegos/crucigrama">
                    Contenido
                </CardPromoRoot>
            );
            expect(screen.getByRole('link')).toHaveAttribute(
                'href',
                '/juegos/crucigrama'
            );
        });

        it('should render children inside the anchor', () => {
            render(<CardPromoRoot href="/test">Texto hijo</CardPromoRoot>);
            expect(screen.getByText('Texto hijo')).toBeInTheDocument();
        });

        it('should default target to _self', () => {
            render(<CardPromoRoot href="/test">Contenido</CardPromoRoot>);
            expect(screen.getByRole('link')).toHaveAttribute('target', '_self');
        });

        it('should use provided target value', () => {
            render(
                <CardPromoRoot href="/test" target="_blank">
                    Contenido
                </CardPromoRoot>
            );
            expect(screen.getByRole('link')).toHaveAttribute(
                'target',
                '_blank'
            );
        });

        it('should pass through additional props to the anchor', () => {
            render(
                <CardPromoRoot href="/test" data-testid="card-promo">
                    Contenido
                </CardPromoRoot>
            );
            expect(screen.getByTestId('card-promo')).toBeInTheDocument();
        });

        it('should apply the card class from variants', () => {
            render(<CardPromoRoot href="/test">Contenido</CardPromoRoot>);
            expect(screen.getByRole('link')).toHaveClass('ds-card');
        });
    });

    describe('displayName', () => {
        it('should have CardPromo as displayName', () => {
            expect(CardPromoRoot.displayName).toBe('CardPromo');
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with default props', () => {
            const { asFragment } = render(
                <CardPromoRoot href="/test">Contenido</CardPromoRoot>
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with size and orientation', () => {
            const { asFragment } = render(
                <CardPromoRoot href="/test" size={32} orientation="horizontal">
                    Contenido
                </CardPromoRoot>
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
