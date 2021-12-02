import filter from '../filters/LN/acumulado/tag';
import force404AMP from './utils/force404AMP';
import logger from '../../components/private/common/utils/logger';
import NotFoundError from './utils/notFoundError';

const resolve = key => {
    const { slug, outputType } = key;

    if (!slug) throw new Error('Debe definir un slug para obtener el tag');
    force404AMP({ outputType });

    return `/tags/v2/search?prefix=${slug}`;
};

const transform = (data, query) => {
    const { uri, slug, meteringVariant } = query || {};

    try {
        if (data.Payload && data.Payload.items && data.Payload.items[0]) {
            if (data.Payload.items[0].slug !== slug) {
                throw new NotFoundError('Tag no encontrado');
            }
        }

        if (!data.Payload.items.length) {
            throw new NotFoundError('Tag no encontrado');
        }

        const newData = {
            ...data,
            node_type: 'tags',
            name: data.Payload.items[0].name,
            canonical_url: uri,
            subscription: meteringVariant
        };

        return newData;
    } catch (error) {
        logger.push(
            error,
            { source: 'content/source/tagSource', url: uri },
            query['arc-site']
        );
    }
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
