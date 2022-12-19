const htmlRaw = nodo => {
    if (!nodo || !nodo.content) return null;

    return nodo.content;
};

export default htmlRaw;
