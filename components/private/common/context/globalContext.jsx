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
        siteService: useContent({
            source: 'navigationTreeSource',
            query: {
                website
            },
            filter: `
                {  
                    tooltips
                    Termicas
                    bannerConfig
                    site
                }
            `,
            transform: response => {
                const {
                    site = {},
                    Termicas: termicasConfig = {},
                    bannerConfig = {}
                } = response || {};
                const {
                    sitio_adserver: sitioAdserver = {},
                    tooltips = {}
                } = site;
                return {
                    bannerConfig: { dfp_id: bannerConfig.dfp_id },
                    tooltips: Object.keys(tooltips).map(key => ({
                        text: key,
                        label: tooltips[key]
                    })),
                    banners: Object.keys(bannerConfig).map(key => ({
                        adunit: key,
                        dimensions: bannerConfig[key]
                    })),
                    adserver: Object.keys(sitioAdserver).map(key => ({
                        key,
                        value: sitioAdserver[key]
                    })),
                    termicas: Object.keys(termicasConfig).map(key => ({
                        key,
                        value: termicasConfig[key]
                    }))
                };
            }
        })
    });

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

GlobalProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default GlobalProvider;
