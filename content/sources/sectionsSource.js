const resolve = key => {
    const { website } = key;
    if (!website) throw new Error('Debe indicar el website - Section Source');
    return `/site/v3/website/${website}/section/`;
};

export default {
    resolve,
    schemaName: 'sections-schema',
    params: {
        website: 'text'
    },
    ttl: 900
};
