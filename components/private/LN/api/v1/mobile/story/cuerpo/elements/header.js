const isString = text => {
    if (typeof text === 'string' || text instanceof String) {
        return true;
    }
    return false;
};
const header = (nodo, dataNota) => {
    if (!nodo) return null;

    let valor = nodo.content;

    if (!valor) return null;
    if (!isString(valor)) valor = null;

    return {
        _t: 'header',
        nivel: nodo.level,
        valor
    };
};

export default header;
