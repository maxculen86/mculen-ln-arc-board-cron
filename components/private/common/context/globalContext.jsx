/* eslint-disable no-shadow */

import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProvider = props => {
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

    const { children } = props;

    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
