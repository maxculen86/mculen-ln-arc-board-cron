/* eslint-disable import/no-cycle */
import generico from './generico';

const htmlLibre = {
    id: '9',
    nombre: 'Html Libre',
    execute: (name, ...args) => {
        return (
            (htmlLibre[name] && htmlLibre[name](...args)) ||
            (generico[name] && generico[name](...args))
        );
    }
};

export default htmlLibre;
