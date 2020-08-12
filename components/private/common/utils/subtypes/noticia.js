/* eslint-disable import/no-cycle */
import generico from './generico';

const noticia = {
    id: '1',
    nombre: 'Noticia',
    execute: (name, ...args) => {
        return (
            (noticia[name] && noticia[name](...args)) ||
            (generico[name] && generico[name](...args))
        );
    }
};

export default noticia;
