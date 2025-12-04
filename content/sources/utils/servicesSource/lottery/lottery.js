import {
    LANACION_SERVICES_URL,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import { handleHttpError } from '../../../../../components/private/common/utils/handleHttpError';
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

const lotteryRequest = async ({ queryData } = {}) => {
    const uri = getUri(queryData);
    const response = await global.fetch(uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Referer: API_ENV,
            'api-key': API_KEY_ARC_SERVICES
        }
    });

    handleHttpError(response);
    return response.json();
};

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
const resolve = ({ response = {} }) => transform(response);

const getTemplates = serviceItem =>
    serviceItem ? 'detalle-loterias' : 'home-loterias';

export default {
    getUri,
    request: lotteryRequest,
    resolve,
    reject,
    transform,
    getTemplates
};
