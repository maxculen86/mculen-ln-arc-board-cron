import React from 'react';
import { useAppContext } from 'fusion:context';
import { render, screen } from '@testing-library/react';
import CardInfo from '../../../../../../components/features/foodit-global/common/emptyState/cardInfo';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('CardInfo component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('if layout is FooditMenuSemanal show info card menu semanal', () => {
        useAppContext.mockReturnValue({
            layout: 'FooditMenuSemanal',
            siteProperties: {
                layoutsName: {
                    FooditMenuSemanal: 'FooditMenuSemanal',
                    FooditListadoCompras: 'FooditListadoCompras'
                }
            }
        });

        render(<CardInfo />);

        const firstTitle = screen.getAllByText(
            /Guardá tu receta favorita|Agregá ingredientes|Planificá tu semana/
        )[0];
        expect(firstTitle).toHaveTextContent('Planificá tu semana');
    });

    it('if layout is FooditListadoCompras show info card lista de compras', () => {
        useAppContext.mockReturnValue({
            layout: 'FooditListadoCompras',
            siteProperties: {
                layoutsName: {
                    FooditMenuSemanal: 'FooditMenuSemanal',
                    FooditListadoCompras: 'FooditListadoCompras'
                }
            }
        });

        render(<CardInfo />);

        const firstTitle = screen.getAllByText(
            /Guardá tu receta favorita|Agregá ingredientes|Planificá tu semana/
        )[0];
        expect(firstTitle).toHaveTextContent(
            'Agregá ingredientes a la lista de compras'
        );
    });
    it('should match snapshot', () => {
        useAppContext.mockReturnValue({
            layout: 'FooditMenuSemanal',
            siteProperties: {
                layoutsName: {
                    FooditMenuSemanal: 'FooditMenuSemanal',
                    FooditListadoCompras: 'FooditListadoCompras'
                }
            }
        });

        const { container } = render(<CardInfo />);
        expect(container).toMatchSnapshot();
    });
});
