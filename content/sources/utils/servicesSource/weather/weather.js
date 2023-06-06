import request from 'request-promise-native';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import {
    transformWeatherHome,
    transformWeatherDetail,
    getWeatherMetaData,
    extractTime
} from './weatherHelper';
import get from '../../../../../components/private/common/utils/get';

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
    const { created_date: createdDate = '' } = dataService;
    const { children = [], name = '' } = sectionSourceData;

    return {
        dataService: {
            ...(serviceType.includes('home')
                ? {
                      locations: [
                          ...transformWeatherHome(
                              get(dataService, 'locations', []),
                              children,
                              serviceItem
                          )
                      ],
                      updateTime: extractTime(createdDate)
                  }
                : {
                      forecast: [
                          ...transformWeatherDetail(
                              get(dataService, 'forecast', [])
                          )
                      ],
                      updateTime: extractTime(createdDate)
                  })
        },
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
    getUri,
    request: weatherRequest,
    resolve,
    reject,
    transform,
    getTemplates
};
