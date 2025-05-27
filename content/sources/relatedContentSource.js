import nodeFetch from 'node-fetch';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import transformData from './utils/relatedContentSource/_helper';

const RELATED_CARDS_LIMIT = 2;

const fetch = async (query, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];
    const { id = '' } = query;

    const opt = {
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    const resolveData = async () => {
        try {
            const response = await nodeFetch(
                `${CONTENT_BASE}/content/v4/related-content/stories/?website=${arcSite}&_id=${id}`,
                opt
            );
            handleHttpError(response);

            const data = await response.json();

            return await transformData(
                data,
                query,
                RELATED_CARDS_LIMIT,
                cachedCall
            );
        } catch (error) {
            console.warn(
                `content/relatedContentSource Error: ${JSON.stringify(
                    query
                )} - errorMsj:${error.message}`
            );
            logger.push(error, {
                source: 'content/sources/relatedContentSource',
                query
            });

            return {};
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: {
        url: 'text',
        id: 'text',
        published: 'text',
        outputType: 'text',
        sourceInclude: 'text',
        imageConfig: 'text',
        isAdmin: 'bool'
    },
    ttl: 600
};
