import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import { LOGIN_URL } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import { loginSetup } from '../../LN/common/utils/loginHelper';
import startPWASetup from '../../LN/common/utils/register';

export const GlobalContext = React.createContext();

const actionType = {
    ADD_TAGS_ARTICLES: (state = {}, action = {}) => {
        const tags = state.tagsHome;
        tags.push(action.article);
        return {
            ...state,
            tagsHome: tags
        };
    },
    SET_LOGIN: (state = {}, action = {}) => {
        const { logueado, loginData } = action.payload || {};
        return {
            ...state,
            ...(typeof logueado !== 'undefined' && { logueado }),
            loginData: {
                ...state.loginData,
                ...loginData
            }
        };
    },
    ADD_ADUNIT_DEFINITION: (state, action) => {
        const adUnits = state.bannersConfig.bannersToLoad || [];
        adUnits.push(action.payload);
        return {
            ...state,
            bannersConfig: { ...state.bannersConfig, bannersToLoad: adUnits }
        };
    },
    REMOVE_ITEM_FROM_SHALL_BE_EXLUDED_LIST: (state, action) => {
        const shallBeExcluded = state.bannersConfig.shallBeExcluded.filter(
            el => el !== action.payload.id
        );
        return {
            ...state,
            bannersConfig: {
                ...state.bannersConfig,
                shallBeExcluded
            }
        };
    },
    ADD_BANNER_IN_GRILLAS: (state, action) => {
        const adUnits = state.bannersConfig.bannersInGrillaNotas || [];
        adUnits.push(action.payload.id);
        return {
            ...state,
            bannersConfig: {
                ...state.bannersConfig,
                bannersInGrillaNotas: adUnits
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
    const {
        arcSite: website = 'la-nacion-ar',
        deployment = {}
    } = useAppContext();
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
                    site,
                    migration
                }
            `,
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
        bannersConfig: {
            bannersToLoad: [],
            bannersInGrillaNotas: [],
            shallBeExcluded: [
                'caja3_dsk',
                'caja4_dsk',
                'caja2_tab',
                'middle_1_tab',
                'middle_2_tab'
            ]
        },
        tagsHome: [],
        logueado: false,
        loginData: {
            subscription: false,
            userName: 'Sin nombre',
            goToLoginUrl: () => {
                location.href = LOGIN_URL + window.btoa(location.href);
            },
            loading: true
        }
    });

    useEffect(() => {
        loginSetup(dispatch);
        startPWASetup(deployment.value);
    }, [deployment]);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};
GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired
};
export default GlobalProvider;
