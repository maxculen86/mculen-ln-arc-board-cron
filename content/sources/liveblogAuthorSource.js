import nodeFetch from 'node-fetch';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

const isEncoded = str => {
    try {
        return decodeURIComponent(str) !== str;
    } catch {
        return true;
    }
};

const fetch = query => {
    const { authorName = '' } = query;
    const safeAuthorName = isEncoded(authorName)
        ? authorName
        : encodeURIComponent(authorName);
    const url = `${CONTENT_BASE}/author/v2/author-service?byline=${safeAuthorName}&limit=10`;
    const opt = {
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    const resolveData = async () => {
        try {
            const response = await nodeFetch(url, opt);
            handleHttpError(response);
            return await response.json();
        } catch (error) {
            return logger.push(error, {
                source: 'content/sources/liveblogAuthorSource',
                url
            });
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: { authorName: 'text' },
    ttl: 120
};
