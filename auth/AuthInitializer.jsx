import React, { useEffect, useState, createContext } from 'react';
import initializeAuth from './helper/loginHelper';

export const AuthContext = createContext();

const AuthInitializer = ({ children }) => {
    const [isFinishRotation, setIsFinishRotation] = useState(false);

    useEffect(() => {
        initializeAuth(setIsFinishRotation);
    }, []);

    return (
        <AuthContext.Provider value={isFinishRotation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthInitializer;
