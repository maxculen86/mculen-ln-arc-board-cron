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
        expect(screen.getByText('SUSCRIBITE')).toBeInTheDocument();
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
        expect(screen.getByText('SUSCRIBITE')).toBeInTheDocument();
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
        expect(screen.getByText('Digital')).toBeInTheDocument();
    });
});
