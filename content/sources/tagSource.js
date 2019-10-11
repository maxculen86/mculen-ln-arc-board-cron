import filter from '../filters/LN/acumulado/tag';

const resolve = key => {
    const { slug } = key;
    if (!slug) throw new Error('Debe definir un slug para obtener el tag');
    return `/tags/search?term="${slug}"`;
};

const transform = data => {
    if (!data.Payload.items.length) {
        const err = new Error('Tag no encontrado');
        err.statusCode = 404;
        throw err;
    }
    return data;
};

export default {
    resolve,
    transform,
    schemaName: 'tag-schema',
    params: {
        slug: 'text'
    },
    filter
};
