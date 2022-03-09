import request from 'request-promise-native';
import { ARC_ACCESS_TOKEN } from 'fusion:environment';

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

export default getRequest;
