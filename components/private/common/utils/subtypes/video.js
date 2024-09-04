/* eslint-disable import/no-cycle */
import generico from './generico';

const video = {
    id: '5',
    nombre: 'Video',
    execute: (name, ...args) => {
        return (
            (video[name] && video[name](...args)) ||
            (generico[name] && generico[name](...args))
        );
    }
};

export default video;
