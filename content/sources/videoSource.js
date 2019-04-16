const resolve = key => {
    const { id, website } = key;
    if (!id) throw new Error('Debe definir un id para realizar la consulta');
    return `/content/v4/videos?website=${website}&_id=${id}`;
};
export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        id: 'text',
        website: 'text'
    }
};
