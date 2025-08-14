import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HeaderFoodit from '../../../../../../components/features/foodit-global/common/Header/foodit';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import menuCategories from '../../../../../../__mocks__/data/fooditMenuCategories/menuCategories';
import useGetUserData from '../../../../../../components/private/common/auth/hooks/useGetUserData';
import { useNavigationData } from '../../../../../../components/features/foodit-global/common/Header/hooks/useNavigationData';

jest.mock(
    '../../../../../../components/private/common/auth/hooks/useGetUserData'
);

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../../../components/private/common/auth/hooks/useGetUserData',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Header/hooks/useNavigationData',
    () => ({
        useNavigationData: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Header/hooks/useStickyHeader',
    () => ({
        useStickyHeader: () => ({ sticky: true })
    })
);

describe('Components - Features - foodit-global - Common - HeaderFoodit', () => {
    Context.useAppContext = jest.fn(() => ({
        layout: 'Foodit-home',
        siteProperties: {
            layoutsName: {
                FooditHome: 'Foodit-home'
            }
        }
    }));
    beforeEach(() => {
        useNavigationData.mockReturnValue({ categories: [] });
    });

    // TODO: testear comportamiento topnavigation cuando se defina el contenido
    // it('when the header state sticky is true, should contain fixed class', () => {
    //     render(<HeaderFoodit isSticky />);
    //     const header = document.querySelector('header');
    //     expect(header.classList.contains('fixed')).toBeTruthy();
    // });

    it('should return buttons login and button suscribed when the user is unlogged', () => {
        useNavigationData.mockReturnValue({
            categories: menuCategories
        });
        useGetUserData.mockReturnValue({
            userType: 'unlogged',
            userEmail: '',
            userName: '',
            userLastName: '',
            isSubscribed: false
        });

        const { container } = render(
            <HeaderFoodit
                layout="Foodit-home"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        expect(screen.getAllByText('INICIÁ SESIÓN')).toHaveLength(2);
        expect(screen.getAllByText('SUSCRIBITE GRATIS')).toHaveLength(2);
        expect(container).toMatchSnapshot();
    });

    it('should show the user avatar with the initials of their name when the user is logged and subscribed to foodit.', () => {
        useContent.mockReturnValue(menuCategories);
        useGetUserData.mockReturnValue({
            userType: 'subscribed',
            userEmail: 'hola@mundo.com',
            userName: 'Hola',
            userLastName: 'Mundo',
            isSubscribed: true
        });

        render(
            <HeaderFoodit
                layout="Foodit-home"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        expect(screen.getAllByText('HM')).toHaveLength(1);
    });
    it('Should show the initials and button "SUSCRIBITE" when the user is not sucribed', () => {
        useContent.mockReturnValue(menuCategories);
        useGetUserData.mockReturnValue({
            userType: 'logged',
            userEmail: 'hola@mundo.com',
            userName: '',
            userLastName: '',
            isSubscribed: false
        });

        render(
            <HeaderFoodit
                layout="Foodit-home"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        expect(screen.getAllByText('HO')).toHaveLength(1);
        expect(screen.getAllByText('SUSCRIBITE GRATIS')).toHaveLength(2);
    });

    it('The logo should render as an "h1" tag on the homepage.', () => {
        useGetUserData.mockReturnValue({
            userType: 'subscribed',
            userEmail: 'hola@mundo.com',
            userName: 'Hola',
            userLastName: 'Mundo',
            isSubscribed: true
        });

        render(
            <HeaderFoodit
                layout="Foodit-home"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        const logoText = screen.getByText('Foodit');
        expect(logoText).toBeInTheDocument();
        expect(logoText.parentElement.tagName).toBe('H1');
    });
    it('should apply correct classes when layout is FooditBuscador', () => {
        useGetUserData.mockReturnValue({
            userType: 'logged',
            userEmail: 'hola@mundo.com',
            userName: '',
            userLastName: '',
            isSubscribed: false
        });

        const layoutsName = {
            FooditHome: 'Foodit-home',
            FooditAcumulado: 'Foodit-acumulado',
            FooditBuscador: 'Foodit-buscador'
        };

        const { container } = render(
            <HeaderFoodit layout="Foodit-buscador" layoutsName={layoutsName} />
        );

        const headerContainer = container.querySelector('.z-15');

        expect(headerContainer).not.toHaveClass('--hide-search');
    });

    it('The logo should render as an "div" tag on the other layouts.', () => {
        useGetUserData.mockReturnValue({
            userType: 'subscribed',
            userEmail: 'hola@mundo.com',
            userName: 'Hola',
            userLastName: 'Mundo',
            isSubscribed: true
        });

        render(
            <HeaderFoodit
                layout="Foodit-acumulado"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        const logoText = screen.getByText('Foodit');
        expect(logoText).toBeInTheDocument();
        expect(logoText.parentElement.tagName).toBe('DIV');
    });
});
