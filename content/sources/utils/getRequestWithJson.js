import request from 'request-promise-native';
import { STRAPI_API_KEY } from 'fusion:environment';

const getRequestWithJSON = query => {
    const opt = {
        uri: query.uri || '',
        json: true
    };

    if (STRAPI_API_KEY) {
        opt.auth = {
            bearer: STRAPI_API_KEY
        };
    }
    if (query.headers) {
        opt.headers = query.headers;
    }

    return request(opt).then(data => data);
};

export default getRequestWithJSON;
