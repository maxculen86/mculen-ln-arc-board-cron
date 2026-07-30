import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardInfo, {
    cardInfoArray
} from '../../../../../../../components/features/ui/foodit/emptyState/card/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../../components/features/ui/foodit/icon/default',
    () => ({
        __esModule: true,
        default: ({ name, size }) => (
            <span
                data-testid="card-icon"
                data-icon-name={name}
                data-size={size}
            />
        )
    })
);

jest.mock(
    '../../../../../../../components/features/ui/foodit/mediaScroller/default',
    () => ({
        MediaScroller: ({ children, responsive, className }) => (
            <div
                data-testid="media-scroller"
                data-responsive={JSON.stringify(responsive)}
                className={className}
            >
                {children}
            </div>
        )
    })
);

const { useAppContext } = require('fusion:context');

const LAYOUTS = {
    FooditMenuSemanal: 'Foodit-menu-semanal',
    FooditListadoCompras: 'Foodit-compras',
    FooditRecetario: 'Foodit-recetario'
};

const mockAppContext = (layout = 'Foodit-home') => ({
    layout,
    siteProperties: { layoutsName: LAYOUTS }
});

describe('CardInfo', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAppContext.mockReturnValue(mockAppContext());
    });

    describe('cardInfoArray export', () => {
        it('exports an array with 3 items', () => {
            expect(cardInfoArray).toHaveLength(3);
        });

        it('each item has iconName, title and description', () => {
            cardInfoArray.forEach(item => {
                expect(item).toHaveProperty('iconName');
                expect(item).toHaveProperty('title');
                expect(item).toHaveProperty('description');
            });
        });
    });

    describe('default rendering', () => {
        it('renders 3 cards', () => {
            render(<CardInfo />);
            expect(screen.getAllByTestId('card-icon')).toHaveLength(3);
        });

        it('renders all card titles', () => {
            render(<CardInfo />);
            expect(
                screen.getByText('Guardá tu receta favorita')
            ).toBeInTheDocument();
            expect(
                screen.getByText('Agregá ingredientes a la lista de compras')
            ).toBeInTheDocument();
            expect(screen.getByText('Planificá tu semana')).toBeInTheDocument();
        });

        it('renders all card descriptions', () => {
            const { container } = render(<CardInfo />);
            cardInfoArray.forEach(({ description }) => {
                expect(container).toHaveTextContent(
                    description.replace(/\s+/g, ' ').trim()
                );
            });
        });

        it('renders icons with size 32', () => {
            render(<CardInfo />);
            screen.getAllByTestId('card-icon').forEach(icon => {
                expect(icon).toHaveAttribute('data-size', '32');
            });
        });

        it('renders inside MediaScroller', () => {
            render(<CardInfo />);
            expect(screen.getByTestId('media-scroller')).toBeInTheDocument();
        });

        it('passes correct responsive config to MediaScroller', () => {
            render(<CardInfo />);
            const scroller = screen.getByTestId('media-scroller');
            const responsive = JSON.parse(
                scroller.getAttribute('data-responsive')
            );
            expect(responsive).toEqual({
                base: { columns: 4, span: 3 },
                md: { columns: 9, span: 3 },
                xl: { columns: 12, span: 4 }
            });
        });
    });

    describe('card order by layout', () => {
        const getIconOrder = () =>
            screen
                .getAllByTestId('card-icon')
                .map(el => el.getAttribute('data-icon-name'));

        it('default layout: bookmark → shopping-list → weekly-menu', () => {
            render(<CardInfo />);
            expect(getIconOrder()).toEqual([
                'bookmark',
                'shopping-list',
                'weekly-menu'
            ]);
        });

        it('FooditMenuSemanal: weekly-menu → bookmark → shopping-list', () => {
            useAppContext.mockReturnValue(
                mockAppContext(LAYOUTS.FooditMenuSemanal)
            );
            render(<CardInfo />);
            expect(getIconOrder()).toEqual([
                'weekly-menu',
                'bookmark',
                'shopping-list'
            ]);
        });

        it('FooditListadoCompras: shopping-list → bookmark → weekly-menu', () => {
            useAppContext.mockReturnValue(
                mockAppContext(LAYOUTS.FooditListadoCompras)
            );
            render(<CardInfo />);
            expect(getIconOrder()).toEqual([
                'shopping-list',
                'bookmark',
                'weekly-menu'
            ]);
        });

        it('FooditRecetario uses default order', () => {
            useAppContext.mockReturnValue(
                mockAppContext(LAYOUTS.FooditRecetario)
            );
            render(<CardInfo />);
            expect(getIconOrder()).toEqual([
                'bookmark',
                'shopping-list',
                'weekly-menu'
            ]);
        });

        it('FooditMenuSemanal shows "Planificá tu semana" as first title', () => {
            useAppContext.mockReturnValue(
                mockAppContext(LAYOUTS.FooditMenuSemanal)
            );
            render(<CardInfo />);
            const titles = screen
                .getAllByTestId('card-icon')
                .map(
                    icon =>
                        icon.closest('div[class]').querySelector('p')
                            .textContent
                );
            expect(titles[0]).toBe('Planificá tu semana');
        });
    });

    describe('snapshots', () => {
        it('default layout', () => {
            const { container } = render(<CardInfo />);
            expect(container).toMatchSnapshot();
        });

        it('FooditMenuSemanal layout', () => {
            useAppContext.mockReturnValue(
                mockAppContext(LAYOUTS.FooditMenuSemanal)
            );
            const { container } = render(<CardInfo />);
            expect(container).toMatchSnapshot();
        });

        it('FooditListadoCompras layout', () => {
            useAppContext.mockReturnValue(
                mockAppContext(LAYOUTS.FooditListadoCompras)
            );
            const { container } = render(<CardInfo />);
            expect(container).toMatchSnapshot();
        });
    });
});
