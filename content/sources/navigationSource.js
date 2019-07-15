const resolve = key => {
    const { website, hierarchy } = key;
    if (!website)
        throw new Error('Debe definir un website para obtener los navigation');
    if (!hierarchy) throw new Error('Debe indicar el nombre de la jerarquía');
    return `/site/v3/navigation/${website}/?hierarchy=${hierarchy}`;
};

export default {
    resolve,
    schemaName: 'navigation-schema',
    params: {
        website: 'text',
        hierarchy: 'text'
    }
};
