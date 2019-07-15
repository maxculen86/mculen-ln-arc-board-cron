const resolve = key => {
    const { ids, website, published } = key;

    if (!ids || !website || !published)
        throw new Error(
            'Debe definir website y query para realizar la consulta'
        );
    return `/content/v4/ids?website=${website}&ids=${ids.join(
        ','
    )}&published=${published}`;
};
export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        ids: 'text',
        website: 'text',
        published: 'bool'
    }
};
