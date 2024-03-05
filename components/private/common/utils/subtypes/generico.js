const generico = {
    id: '0',
    nombre: 'Default',
    execute: (name, ...args) => {
        return generico[name] && generico[name](...args);
    }
};

export default generico;
