import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';

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
    const { uri = '' } = query;
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
        .then(response => {
            return transform(response, query);
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
    const { site } = data || {};
    const { distributor_name: distributor = {} } = site || {};
    const name = distributor[slug];

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
