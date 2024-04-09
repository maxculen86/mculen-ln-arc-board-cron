/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import { LOGIN_URL } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import { loginSetup } from '../../LN/common/utils/loginHelper';
import startPWASetup from '../../LN/common/utils/register';
import setContextDatadog from '../utils/setContextDatadog';

export const GlobalContext = React.createContext();

const actionType = {
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
    const {
        arcSite: website = 'la-nacion-ar',
        deployment = {}
    } = useAppContext();
    const [state, dispatch] = React.useReducer(reducer, {
        logueado: false,
        showModal: {
            typeModal: '',
            typeAlert: '',
            open: false,
            origin: '',
            data: undefined
        },
        loginData: {
            subscription: false,
            userName: 'Sin nombre',
            goToLoginUrl: () => {
                location.href = LOGIN_URL + window.btoa(location.href);
            },
            loading: true
        }
    });
    setContextDatadog();

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
