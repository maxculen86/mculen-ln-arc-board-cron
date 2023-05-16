/* eslint-disable prefer-destructuring */
import {
    LANACION_SERVICES_URL,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import getRequest from './utils/getRequest';

const resolve = query => {
    const { slug = '' } = query;
    return `${LANACION_SERVICES_URL}/api/v1/tags/${slug}`;
};

const fetch = query => {
    const { uri = '', 'arc-site': arcSite = 'la-nacion-ar' } = query;
    const requestQuery = {
        headers: {
            Referer: API_ENV,
            'api-key': API_KEY_ARC_SERVICES
        },
        ...query
    };

    return getRequest(resolve(requestQuery))
        .then(response => response)
        .catch(error => {
            logger.push(error, { source: 'wikiTagSource', url: uri }, arcSite);
        });
};

export default {
    fetch,
    resolve,
    params: {
        slug: 'text',
        imageId: 'text',
        imageConfig: 'text'
    },
    ttl: 120
};
