import nodeFetch from 'node-fetch';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import logger from '../../components/private/common/utils/logger';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';
import get from '../../components/private/common/utils/get';
import { isEmptyString } from '../../components/private/common/utils/dataValidation';
import { resizeImgUrl } from '../../components/private/common/utils/image/resizer/v2/resizerHelper';
import filter from '../filters/foodit/embedCardFilter';

const isEncoded = str => {
    try {
        return decodeURIComponent(str) !== str;
    } catch {
        return true;
    }
};

const transformImages = async (data, cachedCall) => {
    if (!data || !cachedCall) return data;

    const imagePreset = {
        width: 400,
        height: 300,
        media: '(min-width: 320px)',
        class: '',
        type: 'image'
    };

    const resizeImage = async imageUrl => {
        if (!imageUrl || isEmptyString(imageUrl)) return imageUrl;

        try {
            const signingResponse = await signingServiceCachedCall(
                imageUrl,
                cachedCall
            );

            const resizedUrl = resizeImgUrl({
                arcImage: {
                    url: imageUrl,
                    auth: { 1: get(signingResponse, 'hash') },
                    type: 'image'
                },
                defaultResizeWithSmart: imagePreset
            });

            return resizedUrl;
        } catch (error) {
            logger.push(error, {
                source: 'content/sources/embedCardSource.js - transformImages',
                imageUrl,
                errorDetails: error.message
            });
            return imageUrl;
        }
    };

    const processImageObject = async imageObj => {
        if (!imageObj || !imageObj.url) return imageObj;

        const resizedUrl = await resizeImage(imageObj.url);
        return {
            ...imageObj,
            url: resizedUrl
        };
    };

    const transformedData = { ...data };

    if (transformedData.promo_items?.basic) {
        transformedData.promo_items.basic = await processImageObject(
            transformedData.promo_items.basic
        );
    }

    return transformedData;
};

const fetch = (query, { cachedCall } = {}) => {
    const { noteId = '' } = query;

    if (!noteId || !noteId.trim()) {
        throw new Error('noteId is required and cannot be empty');
    }

    const safeNoteId = isEncoded(noteId) ? noteId : encodeURIComponent(noteId);
    const url = `${CONTENT_BASE}/content/v4/stories/?website=foodit&_id=${safeNoteId}&published=true`;

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
            const data = await response.json();

            if (!data || !data.headlines?.basic) {
                return {
                    error: true,
                    message: `No data found for noteId: ${noteId}`,
                    noteId
                };
            }

            return await transformImages(data, cachedCall);
        } catch (error) {
            logger.push(error, {
                source: 'content/sources/embedCardSource.js',
                url,
                noteId
            });

            return {
                error: true,
                message: error.message,
                noteId
            };
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: { noteId: 'text' },
    filter,
    ttl: 120
};
