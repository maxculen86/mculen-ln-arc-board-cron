import React, { useState } from 'react';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProvider = props => {
    const [state, setState] = useState({
        authenticated: false
    });

    const { children } = props;

    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
