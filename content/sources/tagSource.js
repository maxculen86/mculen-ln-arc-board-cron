import filter from '../filters/LN/acumulado/tag';

const resolve = key => {
    const { slug } = key;
    if (!slug) throw new Error('Debe definir un slug para obtener el tag');
    return `/tags/search?term="${slug}"`;
};

export default {
    resolve,
    schemaName: 'tag-schema',
    params: {
        slug: 'text'
    },
    filter
};
