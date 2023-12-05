import React from 'react';
import DrawerContainer from '../DrawerContainer/foodit';
import MyAccount from '../MyAccount/foodit';
import { menuUser } from '../utils/menuUser';

export const DrawerMyAccount = () => {
    // TODO: contenido de menú
    const itemsList = menuUser;

    return (
        <DrawerContainer drawerId="drawer-account" position="right">
            <MyAccount
                itemsList={itemsList}
                fullWidth
                avatarProps={{
                    email: 'lbarandiaran@lanacion.com.ar',
                    initials: 'LB',
                    hasSuscription: true
                }}
            />
        </DrawerContainer>
    );
};

export default DrawerMyAccount;
