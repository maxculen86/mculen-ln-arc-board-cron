import request from 'request-promise-native';
import logger from '../../../../../components/private/common/utils/logger';
import { transformLotteryHome, transformLotteryDetail } from './lotteryHelper';

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

const resolve = ({ response = {} }) => transform(response);

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'serviceSource', url: uri }, arcSite);
};

const transform = data => {
    const { serviceType, dataService } = data;
    return serviceType.includes('home')
        ? transformLotteryHome(dataService.items)
        : transformLotteryDetail(dataService.items);
};

export default {
    getUri,
    request: lotteryRequest,
    resolve,
    reject,
    transform
};
