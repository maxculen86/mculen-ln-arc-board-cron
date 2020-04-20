import getProperties from 'fusion:properties';

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

const ttlValue = () => {
    const properties = getProperties('la-nacion-ar');
    const value = properties.ttlConfig.videoSearchSource.ttl;
    return value;
};

export default {
    resolve,
    schemaName: 'videos-schema',
    params: {
        query: 'text'
    },
    ttl: ttlValue()
};
