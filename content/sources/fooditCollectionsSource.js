import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import {
    resolve,
    transform
} from './utils/fooditSources/fooditCollectionsSource/helper';

const fetch = (query, { cachedCall } = {}) => {
    const { url = '' } = query;
    const arcSite = query['arc-site'];
    const uri = `${CONTENT_BASE}${resolve(query)}`;

    const headers = {
        'Content-Type': 'application/json'
    };

    if (ARC_ACCESS_TOKEN) {
        headers.Authorization = `Bearer ${ARC_ACCESS_TOKEN}`;
    }

    const resolveData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await global.fetch(uri, {
                method: 'GET',
                headers,
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status} - ${response.statusText}`
                );
            }

            const data = await response.json();
            return transform(data, query, cachedCall);
        } catch (error) {
            if (error.name === 'AbortError') {
                logger.push(
                    'Request timed out',
                    { source: 'content/source/fooditCollectionSource', url },
                    arcSite
                );
            } else {
                logger.push(
                    error,
                    { source: 'content/source/fooditCollectionSource', url },
                    arcSite
                );
            }
            return {};
        } finally {
            clearTimeout(timeoutId);
        }
    };

    return Promise.resolve(resolveData());
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
