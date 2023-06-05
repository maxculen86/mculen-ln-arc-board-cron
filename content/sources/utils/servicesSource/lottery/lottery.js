import { LANACION_SERVICES_URL } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../../../../components/private/common/utils/logger';
import {
    transformLotteryHome,
    transformLotteryDetail,
    metaDataLotteryDetail
} from './lotteryHelper';
import { LOTERIES_IDS } from './_config';

const getUri = ({ service = '', serviceItem = '' }) => {
    if (service)
        return `${LANACION_SERVICES_URL}/api/v1/lotteries/`.concat(
            LOTERIES_IDS[serviceItem] || ''
        );

    throw new Error('Debe definir un servicio ó servicio e item.');
};

const lotteryRequest = ({ queryData, auth } = {}) => {
    const opt = {
        uri: getUri(queryData),
        json: true,
        ...auth
    };
    return request(opt).then(data => data);
};

const resolve = ({ response = {} }) => transform(response);

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'serviceSource', url: uri }, arcSite);
};

const transform = data => {
    const { serviceType, dataService, sectionSourceData } = data;

    return {
        serviceType,
        ...sectionSourceData,
        dataService: {
            ...(serviceType.includes('home')
                ? { ...transformLotteryHome(dataService.items) }
                : { ...transformLotteryDetail(dataService.items) })
        },
        ...(serviceType === 'detalle-loterias' && {
            metaData: metaDataLotteryDetail(dataService, serviceType)
        })
    };
};

const getTemplates = serviceItem => {
    return serviceItem ? 'detalle-loterias' : 'home-loterias';
};

export default {
    getUri,
    request: lotteryRequest,
    resolve,
    reject,
    transform,
    getTemplates
};
