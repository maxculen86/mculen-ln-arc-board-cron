/* eslint-disable no-shadow */
import { useContext } from 'react';
import { GlobalContext } from '../context/globalContextAcu';

const useGlobalProviderAcu = () => {
    const [state] = useContext(GlobalContext);

    return {
        acumuladoGeneral: state ? state.acumuladoGeneral : {},
        acumuladoColor: state ? state.acumuladoColor : {},
        articlesInCollection: state ? state.articlesInCollection : [],
        collectionsInPage: state ? state.collectionsInPage : []
    };
};

export default useGlobalProviderAcu;
