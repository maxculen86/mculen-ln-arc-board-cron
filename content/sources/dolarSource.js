import request from 'request-promise-native';
import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from '../../components/private/common/utils/image/resizer';
import logger from '../../components/private/common/utils/logger';

const fetch = ({ arcSite }) => {
    const baseUrl = 'https://api-contenidos.lanacion.com.ar/json/V3/economia';

    const endpoints = [
        {
            uri: `${baseUrl}/cotizacion/DBNA`,
            json: true
        },
        {
            uri: `${baseUrl}/cotizacionblue/DBLUE`,
            json: true
        },
        {
            uri: `${baseUrl}/cotizacionblue/DCCL`,
            json: true
        }
    ];
    const promiseArr = endpoints.map(endpoint =>
        request(endpoint)
            .then(response => ({
                ...response,
                sourceName: endpoint.uri
                    .split('/')
                    .pop()
                    .toLowerCase(),
                source: endpoint.uri
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
            })
    );

    return Promise.all(promiseArr).then(resp => transform(resp));
};

const transform = data => {
    const imageUrl = createResizer(RESIZER_KEY, RESIZER_URL).resizeUrl(
        'https://especialess3.lanacion.com.ar/LN/svg/logo-iol.svg',
        249,
        60,
        {
            height: 76,
            width: 314
        }
    );

    const titles = {
        dbna: 'Dólar Banco Nación',
        dblue: 'Dólar Blue',
        dccl: 'Dólar Contado con Liqui'
    };
    return {
        data: data.map(item => {
            const { sourceName } = item;
            return {
                ...item,
                title: titles[sourceName]
            };
        }),
        imageUrl
    };
};

export default {
    fetch,
    ttl: 120
};
