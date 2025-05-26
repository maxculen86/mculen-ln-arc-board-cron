import generico from './generico';

const liveblogEditorial = {
    id: '11',
    nombre: 'Liveblog-Editorial',
    execute: (name, ...args) =>
        (liveblogEditorial[name] && liveblogEditorial[name](...args)) ||
        (generico[name] && generico[name](...args))
};

export default liveblogEditorial;
