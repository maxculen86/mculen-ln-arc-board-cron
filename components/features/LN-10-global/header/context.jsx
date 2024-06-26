import React, { useState, useContext } from 'react';
import { useHeaderVariants } from './useHeaderVariants';
import { getUserType, getUserData } from './_helper';

export const HeaderContext = React.createContext({});

export const HeaderProvider = ({ children, ...headerVariantProps }) => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleDesplegable = () => setShowMenu(prev => !prev);

    const loginData = getUserData();
    const { isSubscribed, userEmail } = loginData || {};
    const userType = getUserType(isSubscribed, userEmail);

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
