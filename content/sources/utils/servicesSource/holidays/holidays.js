import request from 'request-promise-native';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import {
    getMonthNumber,
    transformHolidays,
    getHolidaysMetaData
} from './holidaysHelper';

const getUri = ({ service = '', serviceItem = '', serviceSubItem = '' }) => {
    if (serviceSubItem && serviceItem)
        return `${LANACION_SERVICES_URL}/api/v1/feriados/${serviceItem}/${getMonthNumber(
            serviceSubItem
        )}`;
    if (service)
        return `${LANACION_SERVICES_URL}/api/v1/feriados/${serviceItem ||
            new Date().getFullYear()}`;

    throw new Error(
        'No está solicitado ningún feriado o el feriado que desea solicitar no existe.'
    );
};

const holidayRequest = ({ queryData, auth } = {}) => {
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
        serviceType,
        dataService,
        sectionSourceData,
        serviceItem,
        serviceSubItem
    } = data;
    return {
        serviceType,
        serviceItem: serviceItem
            ? Number(serviceItem)
            : new Date().getFullYear(),
        ...sectionSourceData,
        dataService: transformHolidays(
            dataService,
            serviceType,
            serviceItem,
            serviceSubItem
        ),
        metaData: getHolidaysMetaData(serviceSubItem)(
            serviceItem,
            serviceSubItem
        )
    };
};

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'servicesSource', url: uri }, arcSite);
};

const getTemplates = (serviceItem, serviceSubItem) => {
    return serviceItem && serviceSubItem ? 'feriados-mes' : 'feriados-año';
};

export default {
    getUri,
    request: holidayRequest,
    resolve,
    transform,
    reject,
    getTemplates
};
