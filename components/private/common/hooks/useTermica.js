import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';
import get from '../utils/get';

const useTermica = (key, value) => {
    const gc = useContext(GlobalContext);
    const termicas = get(gc, 'state.siteService.termicas', []);
    const element = termicas.find(ter => ter.key === key) || { value: 'true' };
    const result = element.value && element.value.toString() === 'true';

    if (!key || !result) return undefined;
    if (!value) return result;

    return value;
};

export default useTermica;
