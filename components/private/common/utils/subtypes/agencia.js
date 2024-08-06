/* eslint-disable import/no-cycle */
import generico from './generico';

const agencia = {
    id: '10',
    nombre: 'Agencia',
    execute: (name, ...args) => {
        return (
            (agencia[name] && agencia[name](...args)) ||
            (generico[name] && generico[name](...args))
        );
    }
};

export default agencia;
