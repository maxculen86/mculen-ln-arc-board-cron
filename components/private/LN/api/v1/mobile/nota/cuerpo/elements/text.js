const text = (nodo, dataNota) => {
    if (!nodo) return null;

    const value = nodo.content;
    if (!value) return null;
    return {
        _t: 'text',
        value
    };
};

text.type = 'text';

export default text;
