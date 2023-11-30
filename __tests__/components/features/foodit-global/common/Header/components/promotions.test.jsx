import React from 'react';
import { render, screen } from '@testing-library/react';
import { Foodit, ClubLn } from '@ln/foodit-ui-assets';
import '@testing-library/jest-dom/extend-expect';
import { Promotions } from '../../../../../../../components/features/foodit-global/common/Header/components/promotions/Promotions';

describe('Components - Features - foodit-global - common - Header - components - Promotions', () => {
    it('renders correctly for user type "unlogged"', () => {
        const unloggedMock = {
            buttonLogginText: 'INICIAR SESIÓN',
            buttonSubscribeText: 'SUSCRIBIRSE POR $999',
            containerClassName: 'jc-center'
        };
        render(<Promotions {...unloggedMock} />);

        const { buttonLogginText, buttonSubscribeText } = unloggedMock;
        const PromotionContainer = document.querySelector(
            '.promotions-container'
        );

        expect(PromotionContainer).toHaveClass('jc-center');
        expect(screen.getByText(buttonLogginText)).toBeInTheDocument();
        expect(screen.getByText(buttonSubscribeText)).toBeInTheDocument();
    });
    it('renders correctly for user type "logged"', () => {
        const loggedMock = {
            buttonSubscribeText: 'SUSCRIBIRSE POR $999',
            plan: 'Gratis',
            containerClassName: 'jc-between'
        };
        const { buttonSubscribeText, plan, containerClassName } = loggedMock;
        render(<Promotions {...loggedMock} />);
        const PromotionContainer = document.querySelector(
            '.promotions-container'
        );

        expect(PromotionContainer).toHaveClass(containerClassName);
        expect(screen.getByText(buttonSubscribeText)).toBeInTheDocument();
        expect(screen.getByText(plan)).toBeInTheDocument();
    });
    it('renders correctly for user type "subscribed"', () => {
        const subscribedMock = {
            buttonSubscribeText: 'MEJORA TU PLAN',
            plan: 'Digital',
            iconFoodit: {
                element: <Foodit />,
                backgroudColor: '#143318'
            },
            containerClassName: 'jc-between'
        };
        const {
            buttonSubscribeText,
            plan,
            containerClassName
        } = subscribedMock;
        const { debug } = render(<Promotions {...subscribedMock} />);
        debug();
        const PromotionContainer = document.querySelector(
            '.promotions-container'
        );
        const icons = document.querySelectorAll('.icon');

        expect(icons).toHaveLength(1);
        expect(PromotionContainer).toHaveClass(containerClassName);
        expect(screen.getByText(buttonSubscribeText)).toBeInTheDocument();
        expect(screen.getByText(plan)).toBeInTheDocument();
    });

    it('renders correctly for user type "subscribedPlus"', () => {
        const subscribedPlusMock = {
            plan: 'Digital + Club',
            iconFoodit: {
                element: <Foodit />,
                backgroudColor: '#143318'
            },
            iconClubLn: {
                element: <ClubLn />,
                backgroudColor: '#0003A6'
            },
            containerClassName: 'jc-between'
        };
        const { plan, containerClassName } = subscribedPlusMock;
        render(<Promotions {...subscribedPlusMock} />);

        const PromotionContainer = document.querySelector(
            '.promotions-container'
        );
        const icons = document.querySelectorAll('.icon');

        expect(icons).toHaveLength(2);
        expect(PromotionContainer).toHaveClass(containerClassName);
        expect(screen.getByText(plan)).toBeInTheDocument();
    });
});
