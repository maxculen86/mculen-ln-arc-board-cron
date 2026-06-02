import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import getProperties from 'fusion:properties';
import logger from '../../components/private/common/utils/logger';
import get from '../../components/private/common/utils/get';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';
import { isEmptyString } from '../../components/private/common/utils/dataValidation';
import { resizeImgUrl } from '../../components/private/common/utils/image/resizer/v2/resizerHelper';

const resolve = key => {
    const { _id, website } = key;

    if (!_id) throw new Error('El id de chef es necesario. ');
    const arcSite = key['arc-site'];

    return `/author/v1/author-service?website=${website || arcSite}&_id=${_id}`;
};

const fetch = async (query, { cachedCall } = {}) => {
    const queryResolved = resolve(query);
    const url = `${CONTENT_BASE}${queryResolved}`;

    const headers = {
        'Content-Type': 'application/json'
    };

    if (ARC_ACCESS_TOKEN) {
        headers.Authorization = `Bearer ${ARC_ACCESS_TOKEN}`;
    }

    const properties = getProperties('foodit');
    const imagePreset = get(
        properties,
        `imageConfig.resize.chefs.credits.sizes`,
        {
            width: 280,
            height: 280,
            media: '(min-width: 320px)',
            class: '',
            type: 'image'
        }
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await global.fetch(url, {
            method: 'GET',
            headers,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status} - ${response.statusText}`
            );
        }

        const data = await response.json();

        const image = get(data, 'image', '');
        let signingResponse = null;

        if (!isEmptyString(image)) {
            signingResponse = await signingServiceCachedCall(image, cachedCall);
        }

        const imageUrl = get(data, 'image.url', '') || get(data, 'image', '');
        return {
            ...data,
            ...(imageUrl && {
                image: {
                    url: resizeImgUrl({
                        arcImage: {
                            url: imageUrl,
                            auth: { 1: get(signingResponse, 'hash') },
                            type: 'image'
                        },
                        defaultResizeWithSmart: imagePreset,
                        arcSite: 'foodit'
                    })
                }
            })
        };
    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            const timeoutError = new Error('Request timeout after 5 seconds');
            logger.push(
                timeoutError,
                {
                    source: 'content/sources/chefsSource',
                    url: queryResolved
                },
                'foodit'
            );
        } else {
            logger.push(
                error,
                {
                    source: 'content/sources/chefsSource',
                    url: queryResolved
                },
                'foodit'
            );
        }
        return {};
    }
};

export default {
    fetch,
    params: {
        _id: 'text',
        website: 'text',
        outputType: 'text'
    },
    ttl: 360
};
