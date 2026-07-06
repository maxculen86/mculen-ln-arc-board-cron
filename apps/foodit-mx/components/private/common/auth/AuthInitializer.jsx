import React, { useEffect, useState, createContext, useMemo } from 'react';
import initializeAuth, { initializeGoogleOneTap } from './helper/loginHelper';
import get from '../utils/get';

export const AuthContext = createContext();

function AuthInitializer({ children, website = 'la-nacion-ar' }) {
    const [tokens, setTokens] = useState({});

    useEffect(() => {
        const init = async () => {
            await initializeAuth({
                website,
                setTokens
            });

            if (get(window, 'UCL')) {
                window.dispatchEvent(new CustomEvent('ucl-ready'));
                await initializeGoogleOneTap(website);
            }
        };

        init();
    }, [website]);

    const valuesFromLibUCL = useMemo(() => tokens, [tokens]);

    return (
        <AuthContext.Provider value={valuesFromLibUCL}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthInitializer;
