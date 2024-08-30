import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import NotFoundError from './utils/notFoundError';

const resolve = key => {
    const { website, slug } = key;

    if (!slug)
        throw new Error('Debe definir un slug para obtener el distributor');
    if (!website)
        throw new Error(
            'Debe definir un website para obtener el arbol de navigation'
        );

    return `/site/v3/navigation/${website}/`;
};

const fetch = query => {
    const { uri = '', slug = '' } = query;
    const arcSite = query['arc-site'];
    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt)
        .then(response => response?.site?.distributor_name)
        .then(distributor => {
            if (!distributor[slug])
                throw new NotFoundError(
                    `El slug ${slug} no corresponde a un distribuidor definido en Site Service.`
                );

            return transform(distributor, query);
        })
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/distributorSource', uri },
                arcSite
            );
        });
};

const transform = (data, query) => {
    const { uri, slug, meteringVariant } = query || {};
    const name = data[slug];

    return {
        distributorId: name,
        name,
        byline: name,
        node_type: 'distributor',
        canonical_url: uri,
        subscription: meteringVariant
    };
};

export default {
    fetch,
    schemaName: 'distributor-schema',
    params: {
        slug: 'text',
        website: 'text',
        meteringVariant: 'text'
    },
    ttl: 120
};
