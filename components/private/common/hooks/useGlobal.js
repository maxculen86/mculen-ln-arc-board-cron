/* eslint-disable no-shadow */

import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';

const useGlobal = () => {
    const [state, setState] = useContext(GlobalContext);

    function setAuth(value) {
        setState(_state => ({ ..._state, authenticated: value }));
    }

    return {
        setAuth,
        isAuth: state.authenticated,
        navigationTreeSource: state.navigationTreeSource
    };
};

export default useGlobal;
