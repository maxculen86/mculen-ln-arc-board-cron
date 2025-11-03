import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { useDrawer } from '@ln/common-ui-drawer';
import RenderUserOptions from '../../../../../../../components/features/foodit-global/common/Header/components/rightOptions/RenderUserOptions';
import useGetUserData from '../../../../../../../components/private/common/auth/hooks/useGetUserData';

jest.mock(
    '../../../../../../../components/private/common/auth/hooks/useGetUserData'
);

jest.mock('@ln/common-ui-drawer', () => ({
    useDrawer: jest.fn()
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn()
}));

describe('Components - features - foodit-global - common - header - components - RightOptions', () => {
    const mockUserLogedAndSuscribed = {
        userType: 'susbscribed',
        isSubscribed: true,
        userEmail: 'hola@mundo.com',
        userName: 'Hola',
        userLastName: 'Mundo'
    };

    useDrawer.mockReturnValue({ toggleDrawer: jest.fn() });

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

    it('when the user is "unlogged" it should not render any menu options', () => {
        useGetUserData.mockReturnValue({
            userType: 'unlogged',
            isSubscribed: false,
            userEmail: '',
            userName: '',
            userLastName: ''
        });

        const { container } = render(<RenderUserOptions />);

        expect(container).toMatchInlineSnapshot(`<div />`);
    });

    it('renders avatar and profile icon when userType is logged', () => {
        useContext.mockReturnValue({ variant: 'no-suscriber' });

        useGetUserData.mockReturnValue({
            ...mockUserLogedAndSuscribed,
            userType: 'logged',
            isSubscribed: false
        });

        const { getByTitle } = render(<RenderUserOptions />);
        const Avatar = getByTitle('Abrir menú');
        const ProfileButton = getByTitle('Abrir menu de usuario');

        expect(Avatar).toBeInTheDocument();
        expect(ProfileButton).toBeInTheDocument();
    });

    it('renders avatar and profile icon when userType is subscribe', () => {
        useContext.mockReturnValue({ variant: 'suscriber' });
        useGetUserData.mockReturnValue(mockUserLogedAndSuscribed);

        const { getByTitle } = render(<RenderUserOptions />);
        const Avatar = getByTitle('Abrir menú');
        const ProfileButton = getByTitle('Abrir menu de usuario');

        expect(Avatar).toBeInTheDocument();
        expect(ProfileButton).toBeInTheDocument();
    });

    it('calls toggleDrawer when user button is clicked', () => {
        useContext.mockReturnValue({ variant: 'suscriber' });
        useGetUserData.mockReturnValue(mockUserLogedAndSuscribed);

        const { getByTitle } = render(<RenderUserOptions />);
        fireEvent.click(getByTitle('Abrir menu de usuario'));
        expect(
            useDrawer({ id: 'drawer-account' }).toggleDrawer
        ).toHaveBeenCalled();
    });
});
