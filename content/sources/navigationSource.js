const resolve = key => {
    const { website, hierarchy } = key;
    const finalWebsite = website || key['arc-site'];
    if (!hierarchy) throw new Error('Debe indicar el nombre de la jerarquía');
    return `/site/v3/navigation/${finalWebsite}/?hierarchy=${hierarchy}`;
};

export default {
    resolve,
    schemaName: 'navigation-schema',
    params: {
        website: 'text',
        hierarchy: 'text'
    },
    ttl: 300
};
