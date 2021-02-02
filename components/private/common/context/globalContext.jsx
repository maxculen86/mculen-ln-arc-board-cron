/* eslint-disable no-shadow */

import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';

export const GlobalContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const GlobalProvider = ({ children }) => {
    const { arcSite: website = 'la-nacion-ar' } = useAppContext();
    const [state, dispatch] = React.useReducer(reducer, {
        authenticated: false,
        navigationTreeSource: useContent({
            source: 'navigationTreeSource',
            query: {
                website
            },
            filter: `
                {  
                    tooltips
                    Termicas
                    bannerConfig
                }
            `
        })
    });
    const value = { state, dispatch };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

GlobalProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default GlobalProvider;
