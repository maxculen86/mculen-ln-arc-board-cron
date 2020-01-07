import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProvider = ({ children }) => {
    const [state, setState] = useState({
        authenticated: false
    });

    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    );
};

GlobalProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired
};

export { GlobalContext, GlobalProvider };
