import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import useGetContentVariant from './useGetContentVariant';

export const SignatureContext = React.createContext({});

export function SignatureContextProvider({ children }) {
    const { isSummary, setIsSummary } = useGetContentVariant();
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);

    const value = useMemo(
        () => ({
            isSummary,
            setIsSummary,
            isAudioPlaying,
            setIsAudioPlaying
        }),
        [isSummary, isAudioPlaying]
    );

    return (
        <SignatureContext.Provider value={value}>
            {children}
        </SignatureContext.Provider>
    );
}

SignatureContextProvider.propTypes = { children: PropTypes.node.isRequired };

export const useSignatureContext = () => useContext(SignatureContext);
