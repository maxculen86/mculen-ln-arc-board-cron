import React, { createContext, useState, useEffect } from 'react';
import { handleLogin } from './_helpers';
import { setInitialState } from './_helpers';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const initialState = setInitialState();
    const [loginData, setLoginData] = useState(initialState);

    const restoreContext = () => {
        setLoginData(initialState);
    };

    useEffect(() => {
        handleLogin(setLoginData);
    }, []);

    return (
        <AuthContext.Provider value={{ ...loginData, restoreContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
