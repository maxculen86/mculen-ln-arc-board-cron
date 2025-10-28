import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const LinkedCardContext = createContext(undefined);

function LinkedCardProvider({ variant, children, cardColor }) {
    const value = useMemo(() => ({ variant, cardColor }), [variant, cardColor]);
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

LinkedCardProvider.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['collapsed', 'expanded']).isRequired,
    cardColor: PropTypes.string.isRequired
};

export default LinkedCardProvider;
