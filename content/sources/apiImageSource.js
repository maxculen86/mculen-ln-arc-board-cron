import { ARC_ACCESS_TOKEN, CONTENT_BASE } from 'fusion:environment';
import { enumTypeError } from '../../components/private/LN/api/common/enums/enumTypeError';
import { BackendLnError } from '../../components/private/LN/api/common/models/backendLnError';
import get from '../../components/private/common/utils/get';
import filter from '../filters/LN/imagesByKeywords';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

const MAX_LIMIT = 100;
const resolve = query => {
    const keywords = get(query, 'keywords', null);
    const offset = get(query, 'offset', 0);
    const sort = get(query, 'sort', '-created_date');

    if (!keywords) {
        throw new Error('keywords is required.');
    }

    const params = new URLSearchParams();

    if (keywords) params.append('keywords', decodeURIComponent(keywords));
    if (sort) params.append('sort', sort);
    if (offset) params.append('offset', offset);
    params.append('limit', MAX_LIMIT);

    return `${CONTENT_BASE}/photo/api/v2/photos/?${params.toString()}`;
};

const fetch = async query => {
    try {
        const opt = {
            method: 'GET'
        };

        if (ARC_ACCESS_TOKEN)
            opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };

        const response = await global.fetch(resolve(query), opt);

        handleHttpError(response);

        return await response.json();
    } catch (error) {
        console.error(
            new BackendLnError(
                `Error content/apiImageSourceError : ${JSON.stringify(
                    query
                )} - errorMsj:${error.message}`,
                enumTypeError.apiImageSourceError
            )
        );
        return [];
    }
};

export default {
    fetch,
    filter,
    params: {
        keywords: 'text',
        offset: 'number'
    },
    ttl: 120
};
