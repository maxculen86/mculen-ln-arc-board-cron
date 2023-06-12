/* eslint-disable prefer-destructuring */
import { LANACION_SERVICES_URL } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import getRequest from './utils/getRequest';

const resolve = query => {
    const { slug = '' } = query;
    return `${LANACION_SERVICES_URL}/api/v1/tags/${slug}`;
};

const fetch = query => {
    const { uri = '', 'arc-site': arcSite = 'la-nacion-ar' } = query;
    return getRequest(resolve(query))
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
