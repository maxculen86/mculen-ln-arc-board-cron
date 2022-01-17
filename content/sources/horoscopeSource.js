/* eslint-disable consistent-return */
import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';

export const resolve = (horoscopo, signo, anio) => {
    return `https://api-contenidos.lanacion.com.ar/json/v2/${horoscopo}`
        .concat(anio ? `-${anio}` : '')
        .concat(signo ? `/${signo}` : '');
};

const fetch = ({ arcSite, horoscope, sign, year }) => {
    const generatedEndpoint = resolve(horoscope, sign, year);

    if (!horoscope) throw new Error('El tipo de horoscopo es necesario.');

    const getData = async () => {
        try {
            const response = await request({
                json: true,
                uri: generatedEndpoint
            });
            return {
                data: response
            };
        } catch (error) {
            logger.push(
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
    ttl: 120
};
