import React, { useContext, useMemo } from 'react';
import PropTypes from 'fusion:prop-types';
import useGetContentVariant from './useGetContentVariant';

export const SignatureContext = React.createContext({});

export function SignatureContextProvider({ children }) {
    const { contentVariant, setContentVariant } =
        useGetContentVariant('article');

    const value = useMemo(
        () => ({ contentVariant, setContentVariant }),
        [contentVariant]
    );

    return (
        <SignatureContext.Provider value={value}>
            {children}
        </SignatureContext.Provider>
    );
}

SignatureContextProvider.propTypes = { children: PropTypes.node.isRequired };

export const useSignatureContext = () => useContext(SignatureContext);
