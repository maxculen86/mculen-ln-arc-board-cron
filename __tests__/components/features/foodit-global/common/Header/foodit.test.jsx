import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import HeaderFoodit from '../../../../../../components/features/foodit-global/common/Header/foodit';
import Context from 'fusion:context';

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn()
}));

describe('Components - Features - foodit-global - Common - HeaderFoodit', () => {
    Context.useAppContext = jest.fn(() => ({
        layout: 'Foodit-home'
    }));

    // TODO: testear comportamiento topnavigation cuando se defina el contenido
    // it('when the header state sticky is true, should contain fixed class', () => {
    //     render(<HeaderFoodit isSticky />);
    //     const header = document.querySelector('header');
    //     expect(header.classList.contains('fixed')).toBeTruthy();
    // });

    it('should return buttons login and button suscribed when the user is unlogged', () => {
        useContext.mockReturnValue({
            ProductoPremiumId: '',
            UsuarioDetalleEmail: '',
            UsuarioDetalleNombre: '',
            UsuarioDetalleApellido: ''
        });

        const { container } = render(<HeaderFoodit />);

        expect(screen.getAllByText('INICIAR SESIÓN')).toHaveLength(2);
        expect(screen.getAllByText('SUSCRIBIRSE POR $999')).toHaveLength(2);
        expect(container).toMatchSnapshot();
    });

    it('should show the user avatar with the initials of their name and the upgrade plan button when the user is logged in and subscribed to foodit.', () => {
        useContext.mockReturnValue({
            ProductoPremiumId: '2,3,4,5',
            UsuarioDetalleEmail: 'hola@mundo.com',
            UsuarioDetalleNombre: 'Hola',
            UsuarioDetalleApellido: 'Mundo'
        });

        render(<HeaderFoodit />);

        expect(screen.getAllByText('MEJORA TU PLAN')).toHaveLength(2);
        expect(screen.getAllByText('HM')).toHaveLength(1);
    });

    it('Should show the initials of the email in the avatar when the user does not have a first or last name', () => {
        useContext.mockReturnValue({
            ProductoPremiumId: '2,3,4,5',
            UsuarioDetalleEmail: 'hola@mundo.com',
            UsuarioDetalleNombre: '',
            UsuarioDetalleApellido: ''
        });

        render(<HeaderFoodit />);

        expect(screen.getAllByText('MEJORA TU PLAN')).toHaveLength(2);
        expect(screen.getAllByText('HO')).toHaveLength(1);
    });

    it('should show the users avatar and the subscribe button when the user is logged in but is not a subscriber.', () => {
        useContext.mockReturnValue({
            ProductoPremiumId: '',
            UsuarioDetalleEmail: 'hola@mundo.com',
            UsuarioDetalleNombre: 'Hola',
            UsuarioDetalleApellido: 'Mundo'
        });

        render(<HeaderFoodit />);

        expect(screen.getAllByText('SUSCRIBIRSE POR $999')).toHaveLength(2);
        expect(screen.getAllByText('HM')).toHaveLength(1);
    });

    // TODO: queda pendiente Test para el tipo de suscriptor suscibedPlus
    // it('should show the user avatar only when the user is a plus subscriber', () => {
    //     useContext.mockReturnValue({
    //         ProductoPremiumId: '2,3,4,5,6',??
    //         UsuarioDetalleEmail: 'hola@mundo.com',
    //         UsuarioDetalleNombre: 'Hola',
    //         UsuarioDetalleApellido: 'Mundo'
    //     });

    //     render(<HeaderFoodit />);

    //     expect(screen.getAllByText('HM')).toHaveLength(1);

    // });
});
