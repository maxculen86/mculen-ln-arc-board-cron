const text = (nodo, dataNota) => {
    if (!nodo) return null;

    const valor = nodo.content;
    if (!valor) return null;
    return {
        _t: 'text',
        valor
    };
};

text.type = 'text';

export default text;
