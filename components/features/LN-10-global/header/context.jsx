import React, { useState, useContext } from 'react';
import { useHeaderVariants } from './useHeaderVariants';
import useGetUserData from '../../../../auth/hooks/useGetUserData';
import { SUBSCRIBED_HELPER } from '../../../../auth/helper/loginHelper';

export const HeaderContext = React.createContext({});

export const HeaderProvider = ({ children, ...headerVariantProps }) => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleDesplegable = () => setShowMenu(prev => !prev);

    const loginData = useGetUserData(SUBSCRIBED_HELPER.LN);
    const { userType } = loginData || {};

    const headerVariants = useHeaderVariants({ ...headerVariantProps });

    return (
        <HeaderContext.Provider
            value={{
                showMenu,
                toggleDesplegable,
                userType,
                ...loginData,
                ...headerVariants
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => useContext(HeaderContext);
