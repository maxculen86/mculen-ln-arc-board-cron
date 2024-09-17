/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import AuthInitializer from '../../../../auth/AuthInitializer';

export const GlobalContext = React.createContext();

const actionType = {
    SHOW_MODAL: (state, action) => {
        const { typeModal, typeAlert, open, origin, data } = action.payload;
        return {
            ...state,
            showModal: {
                typeModal,
                typeAlert,
                open,
                origin,
                data
            }
        };
    },
    default: state => state
};
const reducer = (state, action) => {
    return actionType[action.type]
        ? actionType[action.type](state, action)
        : actionType.default(state);
};
const GlobalProvider = ({ children }) => {
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
        }),
        showModal: {
            typeModal: '',
            typeAlert: '',
            open: false,
            origin: '',
            data: undefined
        }
    });

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            <AuthInitializer>{children}</AuthInitializer>
        </GlobalContext.Provider>
    );
};
GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired
};
export default GlobalProvider;
