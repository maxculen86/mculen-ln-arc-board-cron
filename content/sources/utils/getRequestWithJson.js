import request from 'request-promise-native';
import { ARC_ACCESS_TOKEN } from 'fusion:environment';

const getRequestWithJSON = query => {
    const opt = {
        uri: query.uri || '',
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    if (query.headers) {
        opt.headers = query.headers;
    }

    return request(opt).then(data => data);
};

export default getRequestWithJSON;
