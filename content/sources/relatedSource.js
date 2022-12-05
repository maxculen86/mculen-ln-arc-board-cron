import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import request from 'request-promise-native';

const resolve = (key, a) => {
    const { includedFields, id, notPublished = false } = key;

    const arcSite = key['arc-site'];
    const iFields = includedFields ? `&included_fields=${includedFields}` : '';

    const basePath = `/content/v4/stories/?website=${arcSite}${
        notPublished ? '&published=false' : ''
    }`;

    return `${basePath}&_id=${id}${iFields}`;
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

    return request(opt).then(resp => resp);
};

export default {
    fetch,
    params: {
        id: 'text',
        includeFields: 'text'
    },
    ttl: 600
};
