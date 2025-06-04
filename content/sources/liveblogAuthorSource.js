import nodeFetch from 'node-fetch';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import { isEmptyString } from '../../components/private/common/utils/dataValidation';
import { resizeImgUrl } from '../../components/private/common/utils/image/resizer/v2/resizerHelper';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';
import logger from '../../components/private/common/utils/logger';
import get from '../../components/private/common/utils/get';

const isEncoded = str => {
    try {
        return decodeURIComponent(str) !== str;
    } catch {
        return true;
    }
};

const transform = (cachedCall, authorsData = []) => {
    const transformedAuthors = authorsData.map(async author => {
        const image = get(author, 'image', '');
        let signingResponse = null;
        if (!isEmptyString(image))
            signingResponse = await signingServiceCachedCall(image, cachedCall);
        const imagePreset = {
            width: 280,
            height: 280,
            media: '(min-width: 320px)',
            class: '',
            type: 'image'
        };

        return {
            ...author,
            ...(image && {
                image: resizeImgUrl({
                    arcImage: {
                        url: image,
                        auth: { 1: get(signingResponse, 'hash') },
                        type: 'image'
                    },
                    defaultResizeWithSmart: imagePreset
                })
            })
        };
    });

    return Promise.all(transformedAuthors);
};

const fetch = (query, { cachedCall } = {}) => {
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
            const authorsData = await response.json();
            return await transform(cachedCall, get(authorsData, 'authors', []));
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
