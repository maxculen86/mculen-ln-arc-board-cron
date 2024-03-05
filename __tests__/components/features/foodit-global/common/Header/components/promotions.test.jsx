import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { Promotions } from '../../../../../../../components/features/foodit-global/common/Header/components/promotions/Promotions';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn()
}));

describe('Components - Features - foodit-global - common - Header - components - Promotions', () => {
    it('renders correctly for user type "unlogged"', () => {
        useContext.mockReturnValue({
            ProductoPremiumId: '',
            UsuarioDetalleEmail: '',
            UsuarioDetalleNombre: '',
            UsuarioDetalleApellido: ''
        });

        const { container } = render(<Promotions />);

        const PromotionContainer = container.querySelector(
            '.promotions-container'
        );

        expect(PromotionContainer).toHaveClass('jc-center');
        expect(screen.getByText('INICIAR SESIÓN')).toBeInTheDocument();
        expect(screen.getByText('SUSCRIBIRSE POR $999')).toBeInTheDocument();
    });
    it('renders correctly for user type "logged"', () => {
        useContext.mockReturnValue({
            ProductoPremiumId: '',
            UsuarioDetalleEmail: 'hola@mundo.com',
            UsuarioDetalleNombre: 'Hola',
            UsuarioDetalleApellido: 'Mundo'
        });

        const { container } = render(<Promotions />);
        const PromotionContainer = container.querySelector(
            '.promotions-container'
        );

        expect(PromotionContainer).toHaveClass('jc-between');
        expect(screen.getByText('SUSCRIBIRSE POR $999')).toBeInTheDocument();
        expect(screen.getByText('Gratis')).toBeInTheDocument();
    });

    it('renders correctly for user type "subscribed"', () => {
        useContext.mockReturnValue({
            ProductoPremiumId: '2,3,4,5,22',
            UsuarioDetalleEmail: 'hola@mundo.com',
            UsuarioDetalleNombre: 'Hola',
            UsuarioDetalleApellido: 'Mundo'
        });

        const { container } = render(<Promotions />);

        const PromotionContainer = container.querySelector(
            '.promotions-container'
        );
        const icons = container.querySelectorAll('.icon');

        expect(icons).toHaveLength(1);
        expect(PromotionContainer).toHaveClass('jc-between');
        expect(screen.getByText('MEJORA TU PLAN')).toBeInTheDocument();
        expect(screen.getByText('Digital')).toBeInTheDocument();
    });

    //TODO: queda pendiente la validacion para el suscribedPlus
    // it('renders correctly for user type "subscribedPlus"', () => {

    //     useContext.mockReturnValue({
    //         ProductoPremiumId: '2,3,4,5,6', // ?? TODO: queda pendiente ver cuando es suscribedPlus
    //         UsuarioDetalleEmail: 'hola@mundo.com',
    //         UsuarioDetalleNombre: 'Hola',
    //         UsuarioDetalleApellido: 'Mundo'
    //     });

    //     const { container } = render(<Promotions />);
    //     screen.debug()

    //     const PromotionContainer = container.querySelector(
    //         '.promotions-container'
    //     );
    //     const icons = container.querySelectorAll('.icon');
    //     expect(icons).toHaveLength(2);
    //     expect(PromotionContainer).toHaveClass('jc-between');
    //     expect(screen.getByText('Digital + Club')).toBeInTheDocument();
    // });
});
