import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderFoodit from '../../../../../../components/features/foodit-global/common/Header/foodit';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import menuCategories from '../../../../../../__mocks__/data/fooditMenuCategories/menuCategories';
import useGetUserData from '../../../../../../auth/hooks/useGetUserData';
jest.mock('../../../../../../auth/hooks/useGetUserData');

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

jest.mock('../../../../../../auth/hooks/useGetUserData', () => jest.fn());

describe('Components - Features - foodit-global - Common - HeaderFoodit', () => {
    Context.useAppContext = jest.fn(() => ({
        layout: 'Foodit-home',
        siteProperties: {
            layoutsName: {
                FooditHome: 'Foodit-home'
            }
        }
    }));

    // TODO: testear comportamiento topnavigation cuando se defina el contenido
    // it('when the header state sticky is true, should contain fixed class', () => {
    //     render(<HeaderFoodit isSticky />);
    //     const header = document.querySelector('header');
    //     expect(header.classList.contains('fixed')).toBeTruthy();
    // });

    it('should return buttons login and button suscribed when the user is unlogged', () => {
        useContent.mockReturnValue(menuCategories);
        useGetUserData.mockReturnValue({
            userType: 'unlogged',
            userEmail: '',
            userName: '',
            userLastName: '',
            isSubscribed: false
        });

        const { container } = render(<HeaderFoodit />);

        expect(screen.getAllByText('INICIÁ SESIÓN')).toHaveLength(2);
        expect(screen.getAllByText('SUSCRIBITE')).toHaveLength(2);
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

        render(<HeaderFoodit />);

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

        render(<HeaderFoodit />);

        expect(screen.getAllByText('HO')).toHaveLength(1);
        expect(screen.getAllByText('SUSCRIBITE')).toHaveLength(2);
    });
});
