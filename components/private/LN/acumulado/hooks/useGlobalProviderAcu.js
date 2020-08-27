/* eslint-disable no-shadow */
import { useContext } from 'react';
import { GlobalContext } from '../context/globalContextAcu';

const useGlobalProviderAcu = () => {
    const [state, setState] = useContext(GlobalContext);

    return {
        acumuladoGeneral: state.acumuladoGeneral,
        acumuladoColor: state.acumuladoColor
    };
};

export default useGlobalProviderAcu;
