import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';
import BackendLnError from '../../components/private/LN/api/common/models/backendLnError';

export const resolve = (horoscopo, signo, anio) => {
    if (horoscopo !== 'horoscopo') {
        console.error(
            new BackendLnError(
                `Horoscopo fue llamado con los siguientes parametros: ${horoscopo} - signo: ${signo} - ${anio}`
            )
        );
    }

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
    ttl: 120
};
