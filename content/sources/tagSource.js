import filter from '../filters/LN/acumulado/tag';
import force404AMP from './utils/force404AMP';

const resolve = key => {
    const { slug, outputType } = key;

    if (!slug) throw new Error('Debe definir un slug para obtener el tag');
    force404AMP({ outputType });

    return `/tags/v2/search?prefix=${slug}`;
};

const transform = (data, query) => {
    const { uri, slug, meteringVariant } = query || {};
    if (data.Payload && data.Payload.items && data.Payload.items[0]) {
        if (data.Payload.items[0].slug !== slug) {
            const err = new Error('Tag no encontrado');
            err.statusCode = 404;
            throw err;
        }
    }

    if (!data.Payload.items.length) {
        const err = new Error('Tag no encontrado');
        err.statusCode = 404;
        throw err;
    }
    const newData = {
        ...data,
        node_type: 'tags',
        name: data.Payload.items[0].name,
        canonical_url: uri,
        subscription: meteringVariant
    };

    return newData;
};

export default {
    resolve,
    transform,
    schemaName: 'tag-schema',
    params: {
        slug: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text'
    },
    filter,
    ttl: 900
};
