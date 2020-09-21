/* eslint-disable no-shadow */
import { useContext } from 'react';
import { GlobalContext } from '../context/globalContextAcu';

const useGlobalProviderAcu = () => {
    const [state, setState] = useContext(GlobalContext);

    function setArticlesInCollection(value) {
        console.log('setArticlesInCollection -> value', value);
        setState({ ...state, articlesInCollection: value });
        console.log('****** FUERA DeL SETSTATE -> state', state);
    }

    return {
        acumuladoGeneral: state.acumuladoGeneral,
        acumuladoColor: state.acumuladoColor,
        articlesInCollection: state.articlesInCollection,
        setArticlesInCollection
    };
};

export default useGlobalProviderAcu;
