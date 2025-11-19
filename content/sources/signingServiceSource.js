import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

const params = { imageId: 'text' };

const SOURCE_NAME = 'content/sources/signingServiceSource';

const API_TIMEOUT_MS = 5000;

const BASE_HEADERS = {
    'Content-Type': 'application/json',
    'User-Agent': 'arc-xp-client',
    Accept: 'application/json'
};

const buildAuthHeaders = authToken => {
    const headers = { ...BASE_HEADERS };
    if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
    }
    return headers;
};

const fetchWithTimeout = async (
    url,
    options = {},
    timeoutMs = API_TIMEOUT_MS
) => {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

    try {
        const response = await global.fetch(url, {
            ...options,
            signal: abortController.signal
        });

        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeoutMs}ms`);
        }
        throw error;
    }
};

const fetch = async ({ imageId }) => {
    const arcSite = 'la-nacion-ar';
    const url = `${CONTENT_BASE}/signing-service/v2/sign/resizer/1?value=${encodeURIComponent(
        imageId
    )}`;

    const headers = buildAuthHeaders(ARC_ACCESS_TOKEN);

    try {
        const response = await fetchWithTimeout(url, {
            method: 'GET',
            headers
        });

        handleHttpError(response);

        const data = await response.json();
        return data;
    } catch (error) {
        logger.push(
            error,
            {
                source: SOURCE_NAME,
                imageId
            },
            arcSite
        );
        return {};
    }
};

export default {
    fetch,
    params,
    // 365 day ttl
    ttl: 31536000
};
