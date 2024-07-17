import { useContext } from 'react';
import { GlobalContext } from '../../../common/context/globalContext';

export const getLoginData = () => {
    const { state } = useContext(GlobalContext);
    const { loginData = {} } = state || {};
    return loginData;
};

export const isSubscribed = () => {
    const { state } = useContext(GlobalContext);
    const { loginData = {} } = state || {};
    const { subscription = false } = loginData;
    return subscription;
};

export const isLoggedIn = () => {
    const { state } = useContext(GlobalContext);
    const { logueado = false } = state || {};
    return logueado;
};
