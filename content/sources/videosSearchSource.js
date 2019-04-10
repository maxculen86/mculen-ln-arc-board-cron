import getQuery from '../queries/videosSearchSource';

const resolve = key => {
    const { queryName, published, website } = key;
    if (!queryName || !website)
        throw new Error(
            'Debe definir website y query para realizar la consulta'
        );

    const query = getQuery(queryName);
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
