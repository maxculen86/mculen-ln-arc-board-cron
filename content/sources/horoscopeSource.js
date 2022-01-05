import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';

const fetch = ({ arcSite, horoscope, sign, year }) => {
    const baseUrl = 'https://dp-api-contenidos.lanacion.com.ar/json/v2';

    if (!horoscope) throw new Error('El tipo de horoscopo es necesario. ');

    const endpoint = {
        json: true,
        ...(!sign && !year && { uri: `${baseUrl}/${horoscope}` }),
        ...(!sign && year && { uri: `${baseUrl}/${horoscope}-${year}` }),
        ...(sign && !year && { uri: `${baseUrl}/${horoscope}/${sign}` }),
        ...(sign && year && { uri: `${baseUrl}/${horoscope}-${year}/${sign}` })
    };

    const getData = async () => {
        try {
            const response = await request(endpoint);
            return {
                data: response,
                sourceName: endpoint.uri,
                source: endpoint.uri
            };
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/sources/horoscopeSource',
                    url: endpoint.uri
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
