import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import { isEmptyString } from '../../components/private/common/utils/dataValidation';
import { resizeImgUrl } from '../../components/private/common/utils/image/resizer/v2/resizerHelper';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';
import get from '../../components/private/common/utils/get';

const isEncoded = str => {
    try {
        return decodeURIComponent(str) !== str;
    } catch {
        return true;
    }
};

export const transform = async ({ data = {}, cachedCall }) => {
    const authors = get(data, 'authors', []);
    return Promise.all(
        authors.map(async author => {
            const image = get(author, 'image', '');
            let signingResponse = null;

            if (!isEmptyString(image)) {
                signingResponse = await signingServiceCachedCall(
                    image,
                    cachedCall
                );
            }

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
        })
    );
};

const fetch = async (query, { cachedCall } = {}) => {
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

    try {
        const response = await global.fetch(url, opt);
        handleHttpError(response);
        const data = await response.json();
        return transform({ data, cachedCall });
    } catch (error) {
        logger.push(
            error,
            { source: 'content/sources/liveblogAuthorSource', url },
            query['arc-site']
        );
        return [];
    }
};

export default {
    fetch,
    params: { authorName: 'text' },
    ttl: 120
};
