// import request from 'request-promise-native';
import logger from '../../../../../components/private/common/utils/logger';
import weatherData from './_config';
import {
    transformWeatherHome,
    transformWeatherDetail,
    getWeatherMetaData
} from './weatherHelper';
import get from '../../../../../components/private/common/utils/get';

const weatherRequest = ({ queryData, auth, sectionChildrens } = {}) => {
    const { serviceItem = '', serviceSubItem = '' } = queryData;

    if (serviceSubItem) {
        return Promise.resolve(weatherData.ciudad);
    }
    if (serviceItem) {
        return sectionChildrens.length > 0
            ? Promise.resolve(weatherData['provincia-ciudad'])
            : Promise.resolve(weatherData.provincia);
    }
    // const opt = {
    //     uri: getUri(queryData),
    //     json: true,
    //     ...auth
    // };
    return Promise.resolve(weatherData['home-clima']);
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
    const { created_date: createdDate } = dataService;
    const { children = [], name = '' } = sectionSourceData;

    return {
        dataService: {
            created_date: createdDate,
            ...(serviceType.includes('home')
                ? {
                      locations: [
                          ...transformWeatherHome(
                              get(dataService, 'locations', [])
                          )
                      ]
                  }
                : {
                      forecast: [
                          ...transformWeatherDetail(
                              get(dataService, 'forecast', [])
                          )
                      ]
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
    request: weatherRequest,
    resolve,
    reject,
    getTemplates
};
