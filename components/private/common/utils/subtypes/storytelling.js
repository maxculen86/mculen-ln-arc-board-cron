/* eslint-disable import/no-cycle */
import generico from './generico';

const storytelling = {
    id: '5',
    nombre: 'Storytelling',
    execute: (name, ...args) => {
        return (
            (storytelling[name] && storytelling[name](...args)) ||
            (generico[name] && generico[name](...args))
        );
    }
};

export default storytelling;
