import React, { useState, useEffect } from 'react';
import { useContent } from 'fusion:content';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProvider = props => {
    const { children } = props;
    const [state, setState] = useState({
        authenticated: false,
        commentsEnabled: false,
        commentsCount: 0,
        contentNavigationTreeSource: {}
    });
    const content = useContent({
        source: 'navigationTreeSource',
        query: {
            website: 'la-nacion-ar'
        }
    });

    useEffect(() => {
        setState(_state => ({
            ..._state,
            contentNavigationTreeSource: content
        }));
    }, [content]);

    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
