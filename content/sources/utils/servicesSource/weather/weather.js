import request from 'request-promise-native';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import weatherData from './_config';
import getWeatherMetaData from './weatherHelper';

const getUri = ({ service = '', serviceItem = '', serviceSubItem = '' }) => {
    if (serviceSubItem)
        return `${LANACION_SERVICES_URL}/api/v1/forecast/${serviceItem}/${serviceSubItem}`;

    if (service)
        return `${LANACION_SERVICES_URL}/api/v1/forecast/`.concat(serviceItem);

    throw new Error(
        'No esta solicitado ningun clima o el clima que desea solicitar no existe.'
    );
};
const weatherRequest = ({ queryData, auth } = {}) => {
    const opt = {
        uri: getUri(queryData),
        json: true,
        ...auth
    };
    return request(opt).then(data => data);
};
const resolve = ({ response = {} }) => transform(response);

const transform = data => {
    const {
        dataService = {},
        sectionSourceData = {},
        serviceItem = '',
        serviceSubItem = '',
        serviceType = ''
    } = data;
    const { children = [], name = '' } = sectionSourceData;

    return {
        dataService,
        ...sectionSourceData,
        metaData: getWeatherMetaData(serviceItem, serviceSubItem)(
            name,
            children
        ),
        serviceType
    };
};

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'servicesSource', url: uri }, arcSite);
};

const getTemplates = (serviceItem, serviceSubItem, sectionChildrens = []) => {
    return serviceItem && (!sectionChildrens.length || serviceSubItem)
        ? 'detalle-clima'
        : 'home-clima';
};

export default {
    request: weatherRequest,
    resolve,
    reject,
    getTemplates
};
