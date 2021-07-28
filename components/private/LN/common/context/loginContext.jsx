/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { LOGIN_URL } from 'fusion:environment';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const initialState = {
    logueado: false,
    loginData: {
        subscription: false,
        userName: 'Sin nombre',
        goToLoginUrl: () => {
            location.href = LOGIN_URL + window.btoa(location.href);
        },
        loading: true
    }
};

export const LoginStore = React.createContext();

const LoginProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <LoginStore.Provider value={value}>{children}</LoginStore.Provider>;
};

LoginProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default LoginProvider;
