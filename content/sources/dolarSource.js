import request from 'request-promise-native';
import {
    SITE_LANACION,
    CONTENT_BASE,
    LANACION_SERVICES_URL,
    RESIZER_KEY,
    RESIZER_URL
} from 'fusion:environment';
import getRequest from './utils/getRequest';
import filter from '../filters/LN/services/dolar';
import logger from '../../components/private/common/utils/logger';
import { createResizer } from '../../components/private/common/utils/image/resizer';

const fetch = async ({ 'arc-site': arcSite } = {}, { cachedCall } = {}) => {
    const endpoint = {
        uri: `${LANACION_SERVICES_URL}/api/v1/quotations`,
        json: true
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

    const promiseDolarData = request(endpoint)
        .then(response => ({
            ...response,
            sourceName: 'dolarSource',
            endpoint: endpoint.uri
        }))
        .catch(error => {
            logger.push(
                error,
                {
                    source: 'content/sources/dolarSource',
                    url: endpoint.uri
                },
                arcSite
            );
        });

    return Promise.all([promiseTermicasDolar, promiseDolarData]).then(resp =>
        transform(resp)
    );
};

const transform = data => {
    const [termicas = [], datos = {}] = data;
    const baseUrl = `${SITE_LANACION || 'https://www.lanacion.com.ar'}`;
    const linkDictionary = {
        dbna: '/dolar-hoy/',
        dblue: '/tema/dolar-blue-tid67294/',
        dtarjeta: '/tema/dolar-tarjeta-tid50462/',
        dturista: '/tema/dolar-turista-tid67475/',
        dccl: '/tema/dolar-ccl/',
        euro: '/tema/euro-hoy-tid66142/'
    };
    const imageUrl = createResizer(RESIZER_KEY, RESIZER_URL).resizeUrl({
        originalUrl: 'https://especialess3.lanacion.com.ar/LN/svg/logo-iol.svg',
        originalWidth: 49,
        originalHeight: 60,
        resizeOptions: {
            height: 76,
            width: 314
        }
    });

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
                }),
        imageUrl
    };
};

export default {
    fetch,
    filter,
    ttl: 120
};
