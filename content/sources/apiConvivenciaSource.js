import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';
import { API_CONVIVENCIA_TOKEN } from 'fusion:environment';

export const fetch = query => {
    const { uri, sectionId = '' } = query;
    const urlSearchIdJw = `https://videomapper.lanacion.com.ar${uri}`;
    const arcSite = 'la-nacion-ar';

    return request(urlSearchIdJw, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_CONVIVENCIA_TOKEN
        }
    })
        .then(response => {
            const { video_id: idJw } = JSON.parse(response);
            return { idJw };
        })
        .catch(error => {
            logger.push(
                error,
                {
                    source: 'content/source/apiConvivenciaSource',
                    sectionId
                },
                arcSite
            );
        });
};

export default {
    fetch,
    ttl: 900
};
