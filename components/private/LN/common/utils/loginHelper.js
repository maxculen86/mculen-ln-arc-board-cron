import { useContext as getContext } from 'react';
import { LoginStore } from '../context/loginContext';

const getLoginData = () => {
    const { state } = getContext(LoginStore);
    const { loginData = {} } = state || {};
    return loginData;
};

const isSubscribed = () => {
    const { state } = getContext(LoginStore);
    const { loginData = {} } = state || {};
    const { subscription = false } = loginData;
    return subscription;
};

const isLoggedIn = () => {
    const { state } = getContext(LoginStore);
    const { logueado = false } = state || {};
    return logueado;
};

export default {
    getLoginData,
    isSubscribed,
    isLoggedIn
};
