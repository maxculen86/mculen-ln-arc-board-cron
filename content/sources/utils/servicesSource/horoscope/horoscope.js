import {
    LANACION_SERVICES_URL,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../../../../components/private/common/utils/logger';

export const getUri = ({ service = '', serviceItem = '' }) => {
    return `${LANACION_SERVICES_URL}/api/v2.0/${service}/`.concat(
        serviceItem ? `${serviceItem}` : ''
    );
};

const horoscopeRequest = ({ queryData = {} }) => {
    const opt = {
        uri: getUri(queryData),
        json: true,
        headers: {
            Referer: API_ENV,
            'api-key': API_KEY_ARC_SERVICES
        }
    };

    if (!queryData.service)
        throw new Error('El tipo de horoscopo es necesario.');

    return request(opt).then(data => data);
};

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'serviceSource', url: uri }, arcSite);
};
const resolve = ({ response = {} }) => response;

const getTemplates = serviceItem => {
    return serviceItem ? 'detalle-horoscopo' : 'home-horoscopo';
};
export default {
    request: horoscopeRequest,
    resolve,
    reject,
    getTemplates,
    getUri
};
