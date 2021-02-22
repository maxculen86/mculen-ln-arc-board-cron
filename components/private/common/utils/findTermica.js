import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';
import get from './get';

const findTermica = key => {
    const gc = useContext(GlobalContext);
    const termicas = get(gc, 'state.siteService.termicas', []);
    const element = termicas.find(ter => ter.key === key) || { value: 'true' };
    return element && element.value && element.value.toString() === 'true';
};

export default findTermica;
