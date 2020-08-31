/* eslint-disable import/no-cycle */
import generico from './generico';

const infografia = {
    id: '2',
    nombre: 'Infografia',
    execute: (name, ...args) => {
        return (
            (infografia[name] && infografia[name](...args)) ||
            (generico[name] && generico[name](...args))
        );
    }
};

export default infografia;
