import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const useGlobal = () => {
    const [state, setState] = useContext(GlobalContext);

    function setLoggedIn(value) {
        setState(() => ({ ...state, authenticated: value }));
    }

    return {
        setLoggedIn,
        isLoggedIn: state.authenticated
    };
};

export default useGlobal;
