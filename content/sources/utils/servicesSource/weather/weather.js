// import request from 'request-promise-native';
import logger from '../../../../../components/private/common/utils/logger';
import weatherData from './_config';

const weatherRequest = ({ queryData, auth } = {}) => {
    const { serviceItem = '', serviceSubItem = '' } = queryData;

    if (serviceSubItem) {
        return Promise.resolve(weatherData.ciudad);
    }
    if (serviceItem) {
        return Promise.resolve(weatherData['provincia-ciudad']);
    }
    // const opt = {
    //     uri: getUri(queryData),
    //     json: true,
    //     ...auth
    // };
    return Promise.resolve(weatherData['home-clima']);
};

const resolve = ({ response }) => {
    const {
        sectionSourceData = {},
        dataService = {},
        serviceType = ''
    } = response;
    return { dataService, serviceType, ...sectionSourceData };
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
