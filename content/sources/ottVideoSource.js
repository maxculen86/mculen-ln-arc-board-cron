const resolve = key => {
    const { query } = key;
    const website = 'ott';
    if (!query)
        throw new Error(
            'Debe definir website y query para realizar la consulta'
        );
    return `/content/v4/search/published?website=${website}&${query}`;
};
export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        query: 'text'
    }
};
