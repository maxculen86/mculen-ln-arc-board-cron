import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvatarRecetas from '../../../../../../../components/features/foodit-global/common/Header/components/Avatar';
import { useDrawer } from '@ln/common-ui-drawer';

jest.mock('@ln/common-ui-drawer', () => ({
    useDrawer: jest.fn()
}));

describe('Components - Features - foodit-global - common - Header - components - AvatarRecetas', () => {
    useDrawer.mockReturnValue({ toggleDrawer: jest.fn() });
    it('renders correctly', () => {
        const { getByTitle } = render(
            <AvatarRecetas
                className="test"
                initials="AB"
                suscription="Suscriptor digital"
            />
        );
        expect(getByTitle('Abrir menú')).toBeInTheDocument();
    });

    it('renders Avatar with correct initials', () => {
        const { getByText } = render(
            <AvatarRecetas
                className="test"
                initials="AB"
                suscription="Suscriptor digital"
            />
        );
        expect(getByText('AB')).toBeInTheDocument();
    });

    it('calls toggleDrawer on button click', () => {
        const { getByTitle } = render(
            <AvatarRecetas
                className="test"
                initials="AB"
                suscription="Suscriptor digital"
            />
        );
        fireEvent.click(getByTitle('Abrir menú'));
        expect(
            useDrawer({ id: 'drawer-account' }).toggleDrawer
        ).toHaveBeenCalled();
    });
});
