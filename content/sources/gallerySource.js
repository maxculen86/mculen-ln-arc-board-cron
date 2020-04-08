import request from 'request-promise-native';
import { CONTENT_BASE } from 'fusion:environment';
import sourceSetting from './utils/sourceSetting';

const resolve = key => {
    const { id, includedFields } = key;
    const arcSite = key['arc-site'];
    if (!id) throw Error('Id de galeria es requerido');

    return `/content/v4/galleries?website=${arcSite}&_id=${id}${
        includedFields ? `&included_fields=${includedFields}` : ''
    }`;
};

const fetch = query => {
    const url = `${CONTENT_BASE}${resolve(query)}`;
    return request({
        uri: url,
        json: true
    });
};

export default {
    fetch,
    params: {
        id: 'text',
        includeFields: 'text'
    },
    ttl: sourceSetting.gallerySource.ttl
};
