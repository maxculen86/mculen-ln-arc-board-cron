import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const resolve = key => {
    const { website } = key;
    if (!website)
        throw new Error(
            'Debe definir un website para obtener el arbol de navigation'
        );
    return `/site/v3/navigation/${website}/`;
};

const fetch = query => {
    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt);
};

export default {
    cache: true,
    fetch,
    schemaName: 'navigation-tree-schema',
    params: {
        website: 'text'
    },
    ttl: 600
};
