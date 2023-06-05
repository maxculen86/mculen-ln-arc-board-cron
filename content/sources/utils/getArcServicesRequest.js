import request from 'request-promise-native';
import {
    ARC_ACCESS_TOKEN,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';

const getArcServicesRequest = query => {
    const opt = {
        uri: query,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    if (API_ENV && API_KEY_ARC_SERVICES) {
        opt.headers = {
            Referer: API_ENV,
            'api-key': API_KEY_ARC_SERVICES
        };
    }

    return request(opt).then(data => data);
};

export default getArcServicesRequest;
