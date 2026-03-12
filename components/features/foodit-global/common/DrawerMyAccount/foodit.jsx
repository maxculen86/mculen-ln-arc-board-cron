import React from 'react';
import DrawerContainer from '../DrawerContainer/foodit';
import { MyAccount } from '../MyAccount/foodit';
import { menuUser, logOutItem } from '../utils/menuUser';
import { DRAWER } from '../DrawerContainer/constants';
import useGetUserConfig from '../../hooks/useGetUserConfig';

function DrawerMyAccount({ arcSite, deployment }) {
    const itemsList = menuUser;

    const { email, initials, isSubscribed } = useGetUserConfig();

    return (
        <DrawerContainer drawerId={DRAWER.MY_ACCOUNT} position="right">
            <MyAccount
                itemsList={itemsList}
                logOutItem={logOutItem}
                fullWidth
                arcSite={arcSite}
                deployment={deployment}
                avatarProps={{
                    email,
                    initials,
                    hasSubscription: isSubscribed
                }}
            />
        </DrawerContainer>
    );
}

export default DrawerMyAccount;
