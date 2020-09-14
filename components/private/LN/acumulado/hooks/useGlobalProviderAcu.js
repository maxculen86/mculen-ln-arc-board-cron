/* eslint-disable no-shadow */
import { useContext } from 'react';
import { GlobalContext } from '../context/globalContextAcu';

const useGlobalProviderAcu = () => {
    const [state, setState] = useContext(GlobalContext);

    function setArticlesInCollection(value) {
        setState(state => ({ ...state, articlesInCollection: value }));
    }

    return {
        acumuladoGeneral: state.acumuladoGeneral,
        acumuladoColor: state.acumuladoColor,
        articlesInCollection: state.articlesInCollection,
        setArticlesInCollection
    };
};

export default useGlobalProviderAcu;
