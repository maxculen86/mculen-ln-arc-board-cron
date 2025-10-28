import {
    SITE_LANACION,
    CONTENT_BASE,
    LANACION_SERVICES_URL,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';
import getRequest from './utils/getRequest';
import filter from '../filters/LN/services/dolar';
import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import { linkDictionary } from './utils/dolarSource/constants';

const transform = data => {
    const [termicas = [], datos = {}] = data;
    const baseUrl = `${SITE_LANACION || 'https://www.lanacion.com.ar'}`;

    return {
        data:
            Array.isArray(datos.data) &&
            datos.data
                .filter(dolar => termicas.includes(dolar.sourceName))
                .sort((dolar, prevDolar) =>
                    termicas.indexOf(dolar.sourceName) >
                    termicas.indexOf(prevDolar.sourceName)
                        ? 1
                        : -1
                )
                .map((dolar = {}) => {
                    const {
                        compra = '-',
                        venta = '-',
                        sourceName,
                        title
                    } = dolar;
                    return {
                        compra,
                        venta,
                        ...(sourceName && { sourceName }),
                        ...(title && { titleMobile: title }),
                        ...(linkDictionary[sourceName] && {
                            link: baseUrl + linkDictionary[sourceName]
                        })
                    };
                })
    };
};

const fetch = async ({ 'arc-site': arcSite } = {}, { cachedCall } = {}) => {
    const endpoint = {
        uri: `${LANACION_SERVICES_URL}/api/v1/quotations`,
        headers: {
            Referer: API_ENV,
            'api-key': API_KEY_ARC_SERVICES
        }
    };

    const promiseTermicasDolar = await cachedCall(
        'navigationTreeSource',
        getRequest,
        {
            query: `${CONTENT_BASE}/site/v3/navigation/${arcSite}/`,
            independent: true
        }
    )
        .then(data => {
            const { Termicas: { dolares = [] } = {} } = data;
            return dolares;
        })
        .catch(error => {
            logger.push(
                error,
                {
                    source: 'content/sources/dolarSource',
                    data: 'navigationTreeSource cachedCall'
                },
                arcSite
            );
        });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const opt = {
        method: 'GET',
        headers: endpoint.headers,
        signal: controller.signal
    };

    const promiseDolarData = global
        .fetch(endpoint.uri, opt)
        .then(response => {
            handleHttpError(response);
            return response.json();
        })
        .then(response => ({
            ...response,
            sourceName: 'dolarSource',
            endpoint: endpoint.uri
        }))
        .catch(error => {
            const isAbortError = error?.name === 'AbortError';

            logger.push(
                isAbortError ? { ...error, statusCode: 504 } : error,
                {
                    source: 'content/sources/dolarSource',
                    url: endpoint.uri
                },
                arcSite
            );
        })
        .finally(() => {
            clearTimeout(timeoutId);
        });

    return Promise.all([promiseTermicasDolar, promiseDolarData]).then(resp =>
        transform(resp)
    );
};

export default {
    fetch,
    filter,
    ttl: 120
};
