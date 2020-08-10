/* eslint-disable import/no-cycle */
import generico from './generico';

const fotoAl100 = {
    id: '8',
    nombre: 'Foto al 100',
    execute: (name, ...args) => {
        return (
            (fotoAl100[name] && fotoAl100[name](...args)) ||
            (generico[name] && generico[name](...args))
        );
    }
};

export default fotoAl100;
