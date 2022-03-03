import request from 'request-promise-native';
import logger from '../../../../../components/private/common/utils/logger';

const getUri = ({ service = '', serviceItem = '' }) => {
    if (service)
        return `https://arcservices.lanacion.com.ar/servicios/loterias/${service}/`.concat(
            serviceItem || ''
        );

    throw new Error('Debe definir un servicio ó servicio e item.');
};

const loteryRequest = ({ queryData, getUri: getApiUri, auth } = {}) =>
    request({
        uri: getApiUri(queryData),
        json: true,
        ...auth
    });

const resolve = ({ response = {} }) => response;

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'serviceSource', url: uri }, arcSite);
};

export default {
    getUri,
    request: loteryRequest,
    resolve,
    reject
};
