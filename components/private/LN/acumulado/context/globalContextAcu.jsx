import React, { useState } from 'react';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProviderAcu = props => {
    const { acumuladoGeneral, acumuladoColor } = props;
    const [state, setState] = useState({
        authenticated: false,
        acumuladoGeneral,
        acumuladoColor
    });

    const { children } = props;

    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProviderAcu };
