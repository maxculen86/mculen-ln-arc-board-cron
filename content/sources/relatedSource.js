import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const resolve = (key, a) => {
    const { url, id, published } = key;

    const arcSite = key['arc-site'];
    let basePath = `/content/v4/stories/?website=${arcSite}`;

    if (published) basePath = `${basePath}&published=${published}`;

    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;

    throw new Error('Debe definir url o id para obtener la nota');
};

const fetch = query => {
    const url = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        url.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

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
    }
};
