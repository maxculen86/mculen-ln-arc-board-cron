/* eslint-disable no-shadow */

import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';

const useGlobal = () => {
    const [state, setState] = useContext(GlobalContext);

    function setAuth(value) {
        setState(state => ({ ...state, authenticated: value }));
    }

    function setCommentsEnabled(value) {
        setState(state => ({ ...state, commentsEnabled: value }));
    }

    function setCommentsEnabledAndCount(enabled, count) {
        setState(state => ({
            ...state,
            commentsEnabled: enabled,
            commentsCount: count
        }));
    }

    return {
        commentsCount: state.commentsCount,
        setCommentsEnabledAndCount,
        setCommentsEnabled,
        commentsAllowed: state.commentsEnabled,
        setAuth,
        isAuth: state.authenticated
    };
};

export default useGlobal;
