import {
    LANACION_SERVICES_URL,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import {
    transformWeatherHome,
    transformWeatherDetail,
    getWeatherMetaData,
    extractTime
} from './weatherHelper';
import get from '../../../../../components/private/common/utils/get';
import { handleHttpError } from '../../../../../components/private/common/utils/handleHttpError';

const getUri = ({ service = '', serviceItem = '', serviceSubItem = '' }) => {
    if (serviceSubItem)
        return `${LANACION_SERVICES_URL}/api/v1/forecast/${serviceItem}/${serviceSubItem}`;

    if (service)
        return `${LANACION_SERVICES_URL}/api/v1/forecast/`.concat(serviceItem);

    throw new Error(
        'No esta solicitado ningun clima o el clima que desea solicitar no existe.'
    );
};
const weatherRequest = async ({ queryData } = {}) => {
    const TIMEOUT_MS = 5000;
    const uri = getUri(queryData);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await global.fetch(uri, {
            method: 'GET',
            headers: {
                Referer: API_ENV,
                'api-key': API_KEY_ARC_SERVICES
            },
            signal: controller.signal
        });
        handleHttpError(response);
        return await response.json();
    } catch (error) {
        if (error?.name === 'AbortError') {
            const abortError = new Error(
                `Weather request to ${uri} aborted after ${TIMEOUT_MS}ms`
            );

            abortError.name = error?.name || 'AbortError';
            abortError.statusCode = 504;
            throw abortError;
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};

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
const resolve = ({ response = {} }) => transform(response);

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'servicesSource', url: uri }, arcSite);
};

const getTemplates = (serviceItem, serviceSubItem, sectionChildrens = []) =>
    serviceItem && (!sectionChildrens.length || serviceSubItem)
        ? 'detalle-clima'
        : 'home-clima';

export default {
    getUri,
    request: weatherRequest,
    resolve,
    reject,
    transform,
    getTemplates
};
