import { API_CONVIVENCIA_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';

export const fetch = query => {
    const { url, 'arc-site': arcSite } = query;
    const urlSearchIdJw = `https://videomapper.lanacion.com.ar${url}`;

    return global
        .fetch(urlSearchIdJw, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_CONVIVENCIA_TOKEN
            }
        })
        .then(resp => resp.json())
        .then(response => {
            const { video_id: idJw } = response;
            return { idJw };
        })
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/apiConvivenciaSource' },
                arcSite
            );
        });
};

export default {
    fetch,
    ttl: 900
};
