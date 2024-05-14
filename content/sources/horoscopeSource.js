import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';
import {
    LANACION_SERVICES_URL,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';

export const resolve = (horoscopo, signo, anio) => {
    const endpoint = {
        uri: `${LANACION_SERVICES_URL}/api/v2.0/${horoscopo}${
            anio ? `-${anio}` : ''
        }/`.concat(signo ? `${signo}` : ''),
        json: true,
        headers: {
            Referer: API_ENV,
            'api-key': API_KEY_ARC_SERVICES
        }
    };
    return endpoint;
};

const fetch = ({ arcSite, horoscope, sign, year }) => {
    const generatedEndpoint = resolve(horoscope, sign, year);

    if (!horoscope) throw new Error('El tipo de horoscopo es necesario.');

    const getData = async () => {
        try {
            const response = await request(generatedEndpoint);
            return {
                data: response
            };
        } catch (error) {
            return logger.push(
                error,
                {
                    source: 'content/sources/horoscopeSource',
                    url: generatedEndpoint
                },
                arcSite
            );
        }
    };
    return Promise.resolve(getData());
};

export default {
    fetch,
    params: {
        horoscope: 'text',
        sign: 'text',
        year: 'text'
    },
    ttl: 120
};
