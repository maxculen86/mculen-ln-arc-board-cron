/* eslint-disable no-shadow */

import React, { useState, useRef } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProvider = props => {
    const source = useRef(null);
    const { arcSite: website = 'la-nacion-ar' } = useAppContext();

    const [state, setState] = useState({
        authenticated: false,
        commentsEnabled: false,
        commentsCount: 0,
        navigationTreeSource: useContent({
            source: 'navigationTreeSource',
            query: {
                website
            },
            filter: `
                {  
                    Termicas
                    bannerConfig
                }
            `
        })
    });

    if (!source.current) source.current = [state, setState];

    const { children } = props;

    return (
        <GlobalContext.Provider value={source.current}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
