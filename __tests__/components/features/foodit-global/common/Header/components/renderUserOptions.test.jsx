import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { useDrawer } from '@ln/common-ui-drawer';
import RenderUserOptions from '../../../../../../../components/features/foodit-global/common/Header/components/rightOptions/RenderUserOptions';

jest.mock('@ln/common-ui-drawer', () => ({
    useDrawer: jest.fn()
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn()
}));

describe('Components - features - foodit-global - common - header - components - RightOptions', () => {
    const mockUserLogedAndSuscribed = {
        ProductoPremiumId: '2,3,4,5',
        UsuarioDetalleEmail: 'hola@mundo.com',
        UsuarioDetalleNombre: 'Hola',
        UsuarioDetalleApellido: 'Mundo'
    };
    useDrawer.mockReturnValue({ toggleDrawer: jest.fn() });

    it('when the user is "unlogged" it should not render any menu options', () => {
        useContext.mockReturnValue({
            ProductoPremiumId: '',
            UsuarioDetalleEmail: '',
            UsuarioDetalleNombre: '',
            UsuarioDetalleApellido: ''
        });

        const { container } = render(<RenderUserOptions />);

        expect(container).toMatchInlineSnapshot(`<div />`);
    });

    it('renders avatar and profile icon when userType is logged', () => {
        useContext.mockReturnValue({
            ProductoPremiumId: '',
            UsuarioDetalleEmail: 'hola@mundo.com',
            UsuarioDetalleNombre: 'Hola',
            UsuarioDetalleApellido: 'Mundo'
        });

        const { getByTitle } = render(<RenderUserOptions />);
        const Avatar = getByTitle('Abrir menú');
        const ProfileButton = getByTitle('Abrir menu de usuario');

        expect(Avatar).toBeInTheDocument();
        expect(ProfileButton).toBeInTheDocument();
    });

    it('renders avatar and profile icon when userType is subscribe', () => {
        useContext.mockReturnValue(mockUserLogedAndSuscribed);

        const { getByTitle } = render(<RenderUserOptions />);
        const Avatar = getByTitle('Abrir menú');
        const ProfileButton = getByTitle('Abrir menu de usuario');

        expect(Avatar).toBeInTheDocument();
        expect(ProfileButton).toBeInTheDocument();
    });

    it('calls toggleDrawer when user button is clicked', () => {
        useContext.mockReturnValue(mockUserLogedAndSuscribed);

        const { getByTitle } = render(<RenderUserOptions />);
        fireEvent.click(getByTitle('Abrir menu de usuario'));
        expect(
            useDrawer({ id: 'drawer-account' }).toggleDrawer
        ).toHaveBeenCalled();
    });
});
