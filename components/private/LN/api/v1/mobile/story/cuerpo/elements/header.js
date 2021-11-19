const header = (nodo, dataNota) => {
    if (!nodo) return null;

    const value = nodo.content;

    if (!value) return null;
    if (!(typeof value === 'string' || value instanceof String)) return null;

    return {
        _t: 'header',
        level: nodo.level,
        value
    };
};

export default header;
