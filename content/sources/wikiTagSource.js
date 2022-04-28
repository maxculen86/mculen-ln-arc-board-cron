import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import getRequest from './utils/getRequest';
import wikiTypes from './utils/servicesSource/wiki/_config';
const resolve = query => {
    const { slug = '' } = query;

    return '';
};

const fetch = async (query, { cachedCall }) => {
    const {
        id = '',
        uri = '',
        slug = '',
        type = '',
        arcSite = 'la-nacion-ar',
        imageId
    } = query;

    const imageSource = !!imageId
        ? await cachedCall('imageSource', getRequest, {
              query: `${CONTENT_BASE}/photo/api/v2/photos/${imageId}`
          })
        : {};
    // return getRequest(resolve(query))
    //     .then(response => response)
    //     .catch(error => {
    //         logger.push(error, { source: 'wikiTagSource', url: uri }, arcSite);
    //     });

    return {
        ...wikiTypes[type],
        image: imageSource
    };
};

export default {
    fetch,
    params: {
        type: 'text'
    },
    ttl: 120
};
