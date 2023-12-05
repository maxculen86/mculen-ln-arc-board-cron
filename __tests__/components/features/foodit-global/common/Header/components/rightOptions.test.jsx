import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RightOptions } from '../../../../../../../components/features/foodit-global/common/Header/components/rightOptions/RightOptions';
import { toggleDrawer } from '@ln/common-ui-drawer';

jest.mock('@ln/common-ui-drawer');

describe('Components - features - foodit-global - common - header - components - RightOptions', () => {
    it('renders subscribe button when buttonSubscribeText prop is provided', () => {
        const { getByText } = render(
            <RightOptions buttonSubscribeText="Subscribe" />
        );
        expect(getByText('Subscribe')).toBeInTheDocument();
    });

    it('renders login button when buttonLogginText prop is provided', () => {
        const { getByText } = render(<RightOptions buttonLogginText="Login" />);
        expect(getByText('Login')).toBeInTheDocument();
    });
    it('when the user is "unlogged" it should not render any menu options, only subscribe and login button', () => {
        const { getByTitle } = render(
            <RightOptions
                buttonSubscribeText="Subscribe"
                buttonLogginText="Iniciar sesión"
                userType="unlogged"
            />
        );
        const buttonSubscribe = getByTitle('Suscribite');
        const buttonLogin = getByTitle('Iniciar sesión');
        const buttons = document.querySelectorAll('button');
        expect(buttons).toHaveLength(2);
        expect(buttonSubscribe).toBeInTheDocument();
        expect(buttonLogin).toBeInTheDocument();
    });
    it('renders avatar and profile icon when userType is logged', () => {
        const { getByTitle } = render(
            <RightOptions userType="logged" buttonSubscribeText="Suscribite" />
        );
        const Avatar = getByTitle('Abrir menú');
        const ProfileButton = getByTitle('Abrir menu de usuario');

        expect(Avatar).toBeInTheDocument();
        expect(ProfileButton).toBeInTheDocument();
    });
    it('renders avatar and profile icon when userType is subscribe', () => {
        const { getByTitle } = render(
            <RightOptions
                userType="subscribed"
                buttonSubscribeText="Mejora tu plan"
            />
        );
        const Avatar = getByTitle('Abrir menú');
        const ProfileButton = getByTitle('Abrir menu de usuario');

        expect(Avatar).toBeInTheDocument();
        expect(ProfileButton).toBeInTheDocument();
    });
    it('renders avatar and profile icon when userType is subscribePlus', () => {
        const { getByTitle } = render(
            <RightOptions userType="subscribedPlus" />
        );
        const Avatar = getByTitle('Abrir menú');
        const ProfileButton = getByTitle('Abrir menu de usuario');

        expect(Avatar).toBeInTheDocument();
        expect(ProfileButton).toBeInTheDocument();
    });

    it('calls toggleDrawer when user button is clicked', () => {
        const { getByTitle } = render(<RightOptions userType="logged" />);
        fireEvent.click(getByTitle('Abrir menu de usuario'));
        expect(toggleDrawer).toHaveBeenCalledWith({
            id: 'drawer-account',
            show: true
        });
    });
});
