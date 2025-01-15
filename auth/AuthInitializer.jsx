import React, { useEffect, useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import initializeAuth, { initializeAuthV2 } from './helper/loginHelper';

export const AuthContext = createContext();

function AuthInitializer({ children, website = 'la-nacion-ar' }) {
    const [isFinishRotation, setIsFinishRotation] = useState(false);
    const [tokens, setTokens] = useState({});
    const isValidPage = website === 'foodit';

    useEffect(() => {
        // TODO: Usar initializeAuthV2 unicamente cuando se migre todo LN a lib UCL
        if (isValidPage) {
            initializeAuthV2({ website, setTokens });
        } else {
            initializeAuth(setIsFinishRotation);
        }
    }, []);

    const valuesFromLibUCL = useMemo(() => tokens, [tokens]);

    const values = isValidPage ? valuesFromLibUCL : isFinishRotation;

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}

AuthInitializer.propTypes = {
    children: PropTypes.node.isRequired,
    website: PropTypes.string.isRequired
};

export default AuthInitializer;
