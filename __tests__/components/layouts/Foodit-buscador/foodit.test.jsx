import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FooditSearch from '../../../../components/layouts/Foodit-buscador/foodit';
import { useDrawer } from '@ln/common-ui-drawer';
import { useWindowSize, getTypeOfDevice } from '@ln/hooks';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn()
}));

jest.mock('@ln/common-ui-drawer');
jest.mock(
    '../../../../components/features/foodit-global/common/BaseLayout/foodit',
    () =>
        ({ children }) => <div>{children}</div>
);
jest.mock(
    '../../../../components/features/foodit-global/Queryly/_children/searchContext',
    () =>
        ({ children }) => <div>{children}</div>
);
jest.mock(
    '../../../../components/features/foodit-global/Queryly/_children/filterBox',
    () => () => <div data-testid="filter-box" />
);
jest.mock(
    '../../../../components/features/foodit-global/Queryly/_children/articlesGrid',
    () => () => <div data-testid="articles-grid" />
);
jest.mock(
    '../../../../components/features/foodit-global/Queryly/_children/drawerBuscador',
    () =>
        ({ toggleDrawer }) => (
            <div data-testid="drawer-buscador">
                <button onClick={toggleDrawer}>Close Drawer</button>
            </div>
        )
);

jest.mock('@ln/hooks', () => {
    return {
        useWindowSize: jest.fn(),
        getTypeOfDevice: jest.fn()
    };
});
const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

describe('foodit Component', () => {
    const mockToggleDrawer = jest.fn();
    useContext.mockReturnValue({ appliedFilters: [] });

    beforeEach(() => {
        useDrawer.mockReturnValue({ toggleDrawer: mockToggleDrawer });
        getTypeOfDevice.mockReturnValue('desktop');
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render BaseLayout and QuerylyContext', () => {
        useWindowSize.mockReturnValue({ width: 1280 });
        render(<FooditSearch />);

        expect(screen.getByTestId('filter-box')).toBeInTheDocument();
        expect(screen.getByTestId('articles-grid')).toBeInTheDocument();
    });

    it('should render the FilterBox inside the aside for large screens', () => {
        useWindowSize.mockReturnValue({ width: 1280 });
        render(<FooditSearch />);

        const filterBox = screen.getByTestId('filter-box');
        expect(filterBox).toBeInTheDocument();

        const asideElement = screen.getByRole('complementary');
        expect(asideElement).toContainElement(filterBox);
    });

    it('should render the ArticlesGrid', () => {
        useWindowSize.mockReturnValue({ width: 1280 });

        render(<FooditSearch />);
        expect(screen.getByTestId('articles-grid')).toBeInTheDocument();
    });

    it('should render the DrawerBuscador component and handle toggleDrawer', () => {
        useWindowSize.mockReturnValue({ width: 1279 });

        render(<FooditSearch />);

        const drawerBuscador = screen.getByTestId('drawer-buscador');
        expect(drawerBuscador).toBeInTheDocument();

        const closeButton = screen.getByRole('button', {
            name: /close drawer/i
        });
        fireEvent.click(closeButton);
        expect(mockToggleDrawer).toHaveBeenCalledTimes(1);
    });

    it('should ensure proper layout and structure', () => {
        useWindowSize.mockReturnValue({ width: 1280 });

        const { container } = render(<FooditSearch />);

        const section = container.querySelector('#queryly_advanced_container');
        expect(section).toBeInTheDocument();
        expect(section).toHaveClass(
            'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg relative'
        );

        const aside = section.querySelector('aside');
        expect(aside).toHaveClass('lg-only col-span-4');
    });
});
