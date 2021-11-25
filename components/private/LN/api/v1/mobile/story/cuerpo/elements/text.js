const text = (nodo, dataNota) => {
    if (!nodo) return null;

    const value = nodo.content;
    if (!value) return null;
    return {
        _t: 'text',
        value
    };
};

export default text;
