import React, { createContext, useContext, useMemo } from 'react';

const LinkedCardContext = createContext(undefined);

function LinkedCardProvider({ variant, children, cardColor, gridColumns }) {
    const value = useMemo(
        () => ({ variant, cardColor, gridColumns }),
        [variant, cardColor, gridColumns]
    );
    return (
        <LinkedCardContext.Provider value={value}>
            {children}
        </LinkedCardContext.Provider>
    );
}

export const useLinkedCardContext = () => {
    const context = useContext(LinkedCardContext);
    if (!context) {
        throw new Error(
            'useLinkedCardContext must be used within a LinkedCardProvider'
        );
    }
    return context;
};

export default LinkedCardProvider;
