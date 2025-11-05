import React from 'react';
import { render, screen } from '@testing-library/react';
import { Promotions } from '../../../../../../../components/features/foodit-global/common/Header/components/promotions/Promotions';
import '@testing-library/jest-dom';
import useGetUserData from '../../../../../../../components/private/common/auth/hooks/useGetUserData';

jest.mock(
    '../../../../../../../components/private/common/auth/hooks/useGetUserData'
);
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn()
}));

describe('Components - Features - foodit-global - common - Header - components - Promotions', () => {
    const mockUserLogedAndSuscribed = {
        userType: 'subscribed',
        isSubscribed: true,
        userEmail: 'hola@mundo.com',
        userName: 'Hola',
        userLastName: 'Mundo'
    };

    beforeEach(() => {
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

    it('renders correctly for user type "unlogged"', () => {
        useGetUserData.mockReturnValue({
            userType: 'unlogged',
            isSubscribed: false,
            userEmail: '',
            userName: '',
            userLastName: ''
        });

        const { container } = render(<Promotions />);

        const PromotionContainer = container.querySelector(
            '.promotions-container'
        );

        expect(PromotionContainer).toHaveClass('jc-center');
        expect(screen.getByText('INICIÁ SESIÓN')).toBeInTheDocument();
        expect(screen.getByText('SUSCRIBITE GRATIS')).toBeInTheDocument();
    });
    it('renders correctly for user type "logged"', () => {
        useGetUserData.mockReturnValue({
            ...mockUserLogedAndSuscribed,
            userType: 'logged',
            isSubscribed: false
        });

        const { container } = render(<Promotions />);
        const PromotionContainer = container.querySelector(
            '.promotions-container'
        );

        expect(PromotionContainer).toHaveClass('jc-between');
        expect(screen.getByText('SUSCRIBITE GRATIS')).toBeInTheDocument();
        expect(screen.getByText('Gratis')).toBeInTheDocument();
    });

    //TODO: queda pendiente la validacion para el suscribedPlus (MVP2)
    it('renders correctly for user type "subscribed"', () => {
        useGetUserData.mockReturnValue(mockUserLogedAndSuscribed);

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
