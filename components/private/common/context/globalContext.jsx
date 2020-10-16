/* eslint-disable no-shadow */

import React, { useState, useRef } from 'react';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProvider = props => {
    const source = useRef(null);
    const [state, setState] = useState({
        authenticated: false,
        commentsEnabled: false,
        commentsCount: 0
        //contentNavigationTreeSource: null
    });

    if (!source.current) source.current = [state, setState];

    /* const content = useContent({
        source: 'navigationTreeSource',
        query: {
            website: 'la-nacion-ar'
        }
    });/

    /* useEffect(() => {
        setState(state => ({ ...state, contentNavigationTreeSource: content }));
    }, [content]); */

    const { children } = props;
    // [state, setState]

    return (
        <GlobalContext.Provider value={source.current}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
