const header = (nodo, dataNota) => {
    if (!nodo) return null;

    const valor = nodo.content;

    if (!valor) return null;
    if (!(typeof valor === 'string' || valor instanceof String)) return null;

    return {
        _t: 'header',
        nivel: nodo.level,
        valor
    };
};

export default header;
