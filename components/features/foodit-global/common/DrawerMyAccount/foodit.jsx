import React from 'react';
import DrawerContainer from '../DrawerContainer/foodit';
import MyAccount from '../MyAccount/foodit';
import { menuUser } from '../utils/menuUser';
import useGetUserData from '../../hooks/useGetUserData';

export const DrawerMyAccount = () => {
    // TODO: contenido de menú
    const itemsList = menuUser;

    const { email, initials, isSuscribed, restoreContext } = useGetUserData();

    return (
        <DrawerContainer drawerId="drawer-account" position="right">
            <MyAccount
                itemsList={itemsList}
                fullWidth
                avatarProps={{
                    email,
                    initials,
                    hasSubscription: isSuscribed,
                    restoreContext
                }}
            />
        </DrawerContainer>
    );
};

export default DrawerMyAccount;
