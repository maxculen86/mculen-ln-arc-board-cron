import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const resolve = key => {
    const { id, includedFields } = key;
    const arcSite = key['arc-site'];
    const iFields = includedFields ? `&included_fields=${includedFields}` : '';
    if (!id) throw Error('Id de galeria es requerido');

    return `/content/v4/galleries?website=${arcSite}&_id=${id}${iFields}`;
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
    fetch,
    params: {
        id: 'text',
        includeFields: 'text'
    },
    ttl: 600
};
