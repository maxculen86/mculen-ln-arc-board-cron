import React, { useContext, useMemo, useCallback } from 'react';
import { LOGIN_URL } from 'fusion:environment';
import { useHeaderVariants } from './useHeaderVariants';
import useGetUserData from '../../../private/common/auth/hooks/useGetUserData';
import { SUBSCRIBED_HELPER } from '../../../private/common/auth/helper/loginHelper';

export const HeaderContext = React.createContext({});

export function HeaderProvider({ children, ...headerVariantProps }) {
    const loginData = useGetUserData(SUBSCRIBED_HELPER.LN);
    const goToLoginUrl = useCallback(() => {
        window.location.href = LOGIN_URL + window.btoa(window.location.href);
    }, []);

    const headerVariants = useHeaderVariants({ ...headerVariantProps });

    const contextValue = useMemo(
        () => ({
            goToLoginUrl,
            ...loginData,
            ...headerVariants
        }),
        [goToLoginUrl, loginData, headerVariants]
    );

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
}

export const useHeaderContext = () => useContext(HeaderContext);
