import {
    LANACION_SERVICES_URL,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import {
    getMonthNumber,
    transformHolidays,
    getHolidaysMetaData
} from './holidaysHelper';
import { getArgentinaYear } from '../../../../../components/private/common/utils/dateAndTimeUtil';
import { handleHttpError } from '../../../../../components/private/common/utils/handleHttpError';

const getUri = ({ service = '', serviceItem = '', serviceSubItem = '' }) => {
    if (serviceSubItem && serviceItem)
        return `${LANACION_SERVICES_URL}/api/v1/feriados/${serviceItem}/${getMonthNumber(
            serviceSubItem
        )}`;
    if (service)
        return `${LANACION_SERVICES_URL}/api/v1/feriados/${
            serviceItem || Number(getArgentinaYear())
        }`;

    throw new Error(
        'No está solicitado ningún feriado o el feriado que desea solicitar no existe.'
    );
};

const holidayRequest = async ({ queryData } = {}) => {
    const uri = getUri(queryData);

    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                Referer: API_ENV,
                'api-key': API_KEY_ARC_SERVICES
            }
        });
        handleHttpError(response);
        return await response.json();
    } catch (error) {
        logger.push(
            error,
            {
                source: 'content/sources/servicesSource',
                url: uri
            },
            queryData.arcSite
        );
        return {};
    }
};

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
            : Number(getArgentinaYear()),
        ...(serviceSubItem && { serviceSubItem }),
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
const resolve = ({ response = {} }) => transform(response);

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'servicesSource', url: uri }, arcSite);
};

const getTemplates = (serviceItem, serviceSubItem) =>
    serviceItem && serviceSubItem ? 'feriados-mes' : 'feriados-año';

export default {
    getUri,
    request: holidayRequest,
    resolve,
    transform,
    reject,
    getTemplates
};
