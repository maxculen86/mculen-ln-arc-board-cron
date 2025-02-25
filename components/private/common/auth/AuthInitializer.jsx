import React, { useEffect, useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import initializeAuth from './helper/loginHelper';

export const AuthContext = createContext();

function AuthInitializer({ children, website = 'la-nacion-ar' }) {
    const [tokens, setTokens] = useState({});

    useEffect(() => {
        initializeAuth({ website, setTokens });
    }, []);

    const valuesFromLibUCL = useMemo(() => tokens, [tokens]);

    return (
        <AuthContext.Provider value={valuesFromLibUCL}>
            {children}
        </AuthContext.Provider>
    );
}

AuthInitializer.propTypes = {
    children: PropTypes.node.isRequired,
    website: PropTypes.string.isRequired
};

export default AuthInitializer;
