import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPromoAction from '../../../../../../../components/features/LN/common/cardPromo/components/cardPromoAction';
import { useCardPromoContext } from '../../../../../../../components/features/LN/common/cardPromo/context/cardPromoContext';
import { getResponsiveCardClasses } from '../../../../../../../components/features/LN/common/cardPromo/styles';

jest.mock('@ln/ds-cva', () => ({
    cva: jest.fn(() => jest.fn(() => 'ds-card-action')),
    cx: (...args) => args.flat().filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/button/default',
    () =>
        function MockButton({ children, title, 'aria-label': ariaLabel }) {
            return (
                <button type="button" aria-label={ariaLabel} title={title}>
                    {children}
                </button>
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
        cardActionVariants: jest.fn(() => 'ds-card-action'),
        getResponsiveCardClasses: jest.fn(() => '')
    })
);

const defaultContext = {
    size: 24,
    orientation: 'vertical',
    responsiveSize: {},
    responsiveOrientation: {}
};

describe('CardPromoAction', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useCardPromoContext.mockReturnValue(defaultContext);
    });

    describe('rendering', () => {
        it('should render the provided children as the button label', () => {
            render(<CardPromoAction title="Jugar">Jugar</CardPromoAction>);
            expect(
                screen.getByRole('button', { name: 'Jugar' })
            ).toBeInTheDocument();
        });

        it('should set the title attribute from the title prop', () => {
            render(
                <CardPromoAction title="Reproducir">Reproducir</CardPromoAction>
            );
            expect(
                screen.getByRole('button', { name: 'Reproducir' })
            ).toHaveAttribute('title', 'Reproducir');
        });
    });

    describe('responsive wiring', () => {
        it('should resolve responsive classes for the action component', () => {
            render(<CardPromoAction title="Jugar">Jugar</CardPromoAction>);
            expect(getResponsiveCardClasses).toHaveBeenCalledWith(
                'action',
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
                <CardPromoAction title="Jugar">Jugar</CardPromoAction>
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
