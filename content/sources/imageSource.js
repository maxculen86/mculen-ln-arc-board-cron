const resolve = key => {
    const { id } = key;
    if (!id) throw new Error('Debe definir id para obtener la imagen');
    return `/photo/api/v2/photos/${id}`;
};

export default {
    resolve,
    schemaName: 'image-schema',
    params: {
        id: 'text'
    },
    ttl: 600
};
