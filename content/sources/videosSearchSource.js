const resolve = key => {
    const { query, published, website } = key;
    if (!query || !website)
        throw new Error(
            'Debe definir website y query para realizar la consulta'
        );

    let qryPublished;
    if (published) qryPublished = '/published';
    else qryPublished = '';

    return `/content/v4/search${qryPublished}?website=${website}&${query}`;
};
export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        query: 'text'
    }
};
