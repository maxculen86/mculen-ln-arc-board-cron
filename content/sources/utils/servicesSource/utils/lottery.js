import request from 'request-promise-native';
import logger from '../../../../../components/private/common/utils/logger';

const getUri = ({ service = '', serviceItem = '' }) => {
    if (service)
        return `https://arcservices.lanacion.com.ar/servicios/${service}/`.concat(
            serviceItem || ''
        );

    throw new Error('Debe definir un servicio ó servicio e item.');
};

const lotteryRequest = ({ queryData, auth } = {}) =>
    request({
        uri: getUri(queryData),
        json: true,
        ...auth
    });

const resolve = ({ response = {} }) => response;

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'serviceSource', url: uri }, arcSite);
};

export default {
    getUri,
    request: lotteryRequest,
    resolve,
    reject
};
