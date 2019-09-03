const resolve = key => {
    const { website } = key;
    if (!website)
        throw new Error(
            'Debe definir un website para obtener el arbol de navigation'
        );
    return `/site/v3/navigation/${website}/`;
};

export default {
    resolve,
    schemaName: 'navigation-tree-schema',
    params: {
        website: 'text'
    }
};
