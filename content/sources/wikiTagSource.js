import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import getRequest from './utils/getRequest';
import wikiTypes from './utils/servicesSource/wiki/_config';

const resolve = query => {
    const { slug = '' } = query;

    return '';
};

const fetch = query => {
    const {
        id = '',
        uri = '',
        slug = '',
        type = '',
        arcSite = 'la-nacion-ar'
    } = query;

    // return getRequest(resolve(query))
    //     .then(response => response)
    //     .catch(error => {
    //         logger.push(error, { source: 'wikiTagSource', url: uri }, arcSite);
    //     });

    return Promise.resolve(wikiTypes[type]);
};

export default {
    fetch,
    params: {
        type: 'text'
    },
    ttl: 120
};
