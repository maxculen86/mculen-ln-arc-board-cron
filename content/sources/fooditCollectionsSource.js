import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import {
    resolve,
    transform
} from './utils/fooditSources/fooditCollectionsSource/helper';

const fetch = (query, { cachedCall } = {}) => {
    const { url = '' } = query;
    const arcSite = query['arc-site'];
    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    return request(opt)
        .then(response => transform(response, query, cachedCall))
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/fooditCollectionSource', url },
                arcSite
            );
        });
};

export default {
    fetch,
    params: {
        id: 'text',
        size: 'text',
        from: 'text',
        imageConfig: 'text',
        website: 'text'
    },
    ttl: 120
};
