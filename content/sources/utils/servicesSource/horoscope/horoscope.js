import {
    LANACION_SERVICES_URL,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import { handleHttpError } from '../../../../../components/private/common/utils/handleHttpError';

export const getUri = ({ service = '', serviceItem = '' }) =>
    `${LANACION_SERVICES_URL}/api/v2.0/${service}/`.concat(
        serviceItem ? `${serviceItem}` : ''
    );

const horoscopeRequest = async ({ queryData = {} }) => {
    const { service } = queryData || {};
    if (!service) throw new Error('El tipo de horoscopo es necesario.');

    const uri = getUri(queryData);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

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
            const abortError = new Error(error?.message || 'Request aborted');
            abortError.name = error?.name || 'AbortError';
            abortError.statusCode = 504;
            throw abortError;
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'serviceSource', url: uri }, arcSite);
};
const resolve = ({ response = {} }) => response;

const getTemplates = serviceItem =>
    serviceItem ? 'detalle-horoscopo' : 'home-horoscopo';

export default {
    request: horoscopeRequest,
    resolve,
    reject,
    getTemplates,
    getUri
};
