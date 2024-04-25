import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvatarRecetas from '../../../../../../../components/features/foodit-global/common/Header/components/Avatar';
import { toggleDrawer } from '@ln/common-ui-drawer';

jest.mock('@ln/common-ui-drawer', () => ({
    toggleDrawer: jest.fn()
}));

xdescribe('Components - Features - foodit-global - common - Header - components - AvatarRecetas', () => {
    it('renders correctly', () => {
        const { getByTitle, debug } = render(
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
        expect(toggleDrawer).toHaveBeenCalledWith({
            id: 'drawer-account',
            show: true
        });
    });
});
