/* eslint-disable prefer-destructuring */
import { STRAPI_API_URL, API_ENV } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import getRequestWithJSON from './utils/getRequestWithJson';

const resolve = query => {
    const { slug = '' } = query;
    return `${STRAPI_API_URL}/api/v1/tags/${slug}`;
};

const fetch = query => {
    const { uri = '', 'arc-site': arcSite = 'la-nacion-ar' } = query;
    return getRequestWithJSON({
        uri: resolve(query),
        headers: {
            Referer: API_ENV
        }
    })
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
