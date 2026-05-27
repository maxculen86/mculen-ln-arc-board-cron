import React, { useMemo } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import AuthInitializer from '../auth/AuthInitializer';

export const GlobalContext = React.createContext();

const actionType = {
    default: state => state
};

const reducer = (state, action) =>
    actionType[action.type]
        ? actionType[action.type](state, action)
        : actionType.default(state);

function GlobalProvider({ children }) {
    const { arcSite: website = 'la-nacion-ar' } = useAppContext();
    const [state, dispatch] = React.useReducer(reducer, {
        siteService: useContent({
            source: 'navigationTreeSource',
            query: {
                website
            },
            transform: response => {
                const {
                    site = {},
                    Termicas: termicasConfig = {},
                    bannerConfig = {},
                    migration = {}
                } = response || {};
                const {
                    sitio_adserver: sitioAdserver = {},
                    tooltips = {},
                    not_recommended_sections: notRecommendedSections = []
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
                    })),
                    migration,
                    notRecommendedSections
                };
            }
        })
    });

    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <GlobalContext.Provider value={contextValue}>
            <AuthInitializer website={website}>{children}</AuthInitializer>
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;
