import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import transformData from './utils/relatedContentSource/_helper';

const fetch = async (query, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];
    const { id = '', limit } = query;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const requestInit = {
        method: 'GET',
        ...(ARC_ACCESS_TOKEN && {
            headers: { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` }
        }),
        signal: controller.signal
    };

    const resolveData = async () => {
        try {
            const response = await global.fetch(
                `${CONTENT_BASE}/content/v4/related-content/stories/?website=${arcSite}&_id=${id}`,
                requestInit
            );
            handleHttpError(response);

            const data = await response.json();

            return await transformData(data, query, limit, cachedCall);
        } catch (error) {
            const isAbortError = error?.name === 'AbortError';

            console.warn(
                `content/relatedContentSource Error: ${JSON.stringify(
                    query
                )} - errorMsj:${error.message} - timeout:${isAbortError}`
            );
            logger.push(isAbortError ? { ...error, statusCode: 504 } : error, {
                source: 'content/sources/relatedContentSource',
                query
            });

            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: {
        url: 'text',
        id: 'text',
        limit: 'number',
        published: 'text',
        outputType: 'text',
        sourceInclude: 'text',
        imageConfig: 'text',
        isAdmin: 'bool'
    },
    ttl: 600
};
