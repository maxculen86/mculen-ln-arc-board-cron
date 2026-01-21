import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../../../../../../components/features/LN/common/navBar/default';
import { getNavbarItems } from '../../../../../../components/features/LN/common/navBar/helpers';
import NavbarItem from '../../../../../../components/features/LN/common/navBar/components/NavbarItem';
import useGetUserData from '../../../../../../components/private/common/auth/hooks/useGetUserData';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../components/features/LN/common/navBar/helpers',
    () => ({
        getNavbarItems: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/navBar/components/NavbarItem',
    () => jest.fn(() => <div data-testid="navbar-item" />)
);

jest.mock(
    '../../../../../../components/private/common/auth/hooks/useGetUserData',
    () => jest.fn()
);

describe('components - features - LN - common - navBar - default', () => {
    const mockUseAppContext = require('fusion:context').useAppContext;

    beforeEach(() => {
        jest.clearAllMocks();

        mockUseAppContext.mockReturnValue({
            layout: 'HomeLN10',
            siteProperties: {
                layoutsName: {
                    HomeLN10: 'HomeLN10'
                }
            }
        });

        useGetUserData.mockReturnValue({
            userType: 'subscribed'
        });

        getNavbarItems.mockReturnValue([
            {
                text: 'Inicio',
                iconName: 'home',
                href: 'https://www.lanacion.com.ar/'
            },
            {
                text: 'Secciones',
                iconName: 'fuction',
                onClick: jest.fn()
            },
            {
                text: 'Foodit',
                iconName: 'logo-foodit',
                href: 'https://www.foodit.com.ar/'
            }
        ]);
    });

    it('renders all navbar items', () => {
        render(<Navbar />);

        const navbarItems = screen.getAllByTestId('navbar-item');
        expect(navbarItems).toHaveLength(3);
    });

    it('calls getNavbarItems with correct userType', () => {
        render(<Navbar />);

        expect(getNavbarItems).toHaveBeenCalledWith({
            userType: 'subscribed'
        });
    });

    it('passes correct props to NavbarItem components', () => {
        const mockItems = [
            {
                text: 'Inicio',
                iconName: 'home',
                href: 'https://www.lanacion.com.ar/'
            },
            {
                text: 'Secciones',
                iconName: 'fuction',
                onClick: jest.fn()
            }
        ];

        getNavbarItems.mockReturnValue(mockItems);
        render(<Navbar />);

        expect(NavbarItem).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                text: 'Inicio',
                iconName: 'home',
                href: 'https://www.lanacion.com.ar/',
                color: 'primary'
            }),
            {}
        );

        expect(NavbarItem).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                text: 'Secciones',
                iconName: 'fuction',
                color: 'base'
            }),
            {}
        );
    });

    it('applies primary color to home icon when on home layout', () => {
        mockUseAppContext.mockReturnValue({
            layout: 'HomeLN10',
            siteProperties: {
                layoutsName: {
                    HomeLN10: 'HomeLN10'
                }
            }
        });

        getNavbarItems.mockReturnValue([
            {
                text: 'Inicio',
                iconName: 'home',
                href: 'https://www.lanacion.com.ar/'
            }
        ]);

        render(<Navbar />);

        expect(NavbarItem).toHaveBeenCalledWith(
            expect.objectContaining({
                color: 'primary'
            }),
            {}
        );
    });

    it('applies default color to home icon when not on home layout', () => {
        mockUseAppContext.mockReturnValue({
            layout: 'NotaLN10',
            siteProperties: {
                layoutsName: {
                    HomeLN10: 'HomeLN10'
                }
            }
        });

        getNavbarItems.mockReturnValue([
            {
                text: 'Inicio',
                iconName: 'home',
                href: 'https://www.lanacion.com.ar/'
            }
        ]);

        render(<Navbar />);

        expect(NavbarItem).toHaveBeenCalledWith(
            expect.objectContaining({
                color: 'base'
            }),
            {}
        );
    });

    it('uses href as key when available', () => {
        getNavbarItems.mockReturnValue([
            {
                text: 'Inicio',
                iconName: 'home',
                href: 'https://www.lanacion.com.ar/'
            }
        ]);

        const { container } = render(<Navbar />);
        const listItems = container.querySelectorAll('li');

        expect(listItems[0]).toHaveAttribute('class');
        expect(listItems[0]).toBeInTheDocument();
    });

    it('uses text as key when href is not available', () => {
        getNavbarItems.mockReturnValue([
            {
                text: 'Secciones',
                iconName: 'fuction',
                onClick: jest.fn()
            }
        ]);

        const { container } = render(<Navbar />);
        const listItems = container.querySelectorAll('li');

        expect(listItems[0]).toHaveAttribute('class');
        expect(listItems[0]).toBeInTheDocument();
    });

    it('renders correctly for unlogged user', () => {
        useGetUserData.mockReturnValue({
            userType: 'unlogged'
        });

        render(<Navbar />);

        expect(getNavbarItems).toHaveBeenCalledWith({
            userType: 'unlogged'
        });
    });

    it('should match snapshot - home layout', () => {
        mockUseAppContext.mockReturnValue({
            layout: 'HomeLN10',
            siteProperties: {
                layoutsName: {
                    HomeLN10: 'HomeLN10'
                }
            }
        });

        const { container } = render(<Navbar />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot - other layout', () => {
        mockUseAppContext.mockReturnValue({
            layout: 'NotaLN10',
            siteProperties: {
                layoutsName: {
                    HomeLN10: 'HomeLN10'
                }
            }
        });

        const { container } = render(<Navbar />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot - unlogged user', () => {
        useGetUserData.mockReturnValue({
            userType: 'unlogged'
        });

        const { container } = render(<Navbar />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
