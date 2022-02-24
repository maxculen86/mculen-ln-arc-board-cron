import { ARC_ACCESS_TOKEN, CONTENT_BASE } from 'fusion:environment';
import request from 'request-promise-native';
import { resolve as sectionSourceResolve } from './sectionSource';

const getRequest = query => {
    const opt = {
        uri: query,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt).then(data => data);
};

const fetch = async (query, { cachedCall }) => {
    const sectionSourceData = await cachedCall('sectionSource', getRequest, {
        query: `${CONTENT_BASE}${sectionSourceResolve(query)}`
    });

    return sectionSourceData;
};

export default {
    fetch,
    params: {
        id: 'text',
        website: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text'
    },
    ttl: 120
};
