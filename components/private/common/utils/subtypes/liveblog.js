/* eslint-disable import/no-cycle */
import generico from './generico';

const liveblog = {
    id: '6',
    nombre: 'Liveblog',
    execute: (name, ...args) => {
        return (
            (liveblog[name] && liveblog[name](...args)) ||
            (generico[name] && generico[name](...args))
        );
    }
};

export default liveblog;
