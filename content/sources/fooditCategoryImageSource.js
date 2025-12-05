import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

import get from '../../components/private/common/utils/get';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls';
import logger from '../../components/private/common/utils/logger';
import { getCategoryImageAuth } from './utils/fooditSources/utils/authImage';

const transform = async (data, siteProps, cachedCall) => {
    const newData = await getCategoryImageAuth(data, cachedCall);
    Object.assign(data, newData);

    const { presets } = getPresets(siteProps);

    const presetsPromoItems = get(presets, 'promo_items', null);

    return {
        ...addResizedUrls(
            { promo_items: { basic: { ...data } } },
            {
                presets: {
                    promoItems: presetsPromoItems
                }
            }
        )
    };
};

const resolve = key => {
    const { id, imageConfig } = key;
    if (!id)
        throw new Error('Debe definir id para obtener la imagen', {
            id,
            imageConfig
        });
    return `/photo/api/v2/photos/${id}`;
};

const fetch = async (query, { cachedCall } = {}) => {
    const { id = '' } = query;
    const arcSite = query['arc-site'];

    const url = `${CONTENT_BASE}${resolve(query)}`;

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000);

    const opt = {
        method: 'GET',
        signal: abortController.signal
    };

    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    try {
        const resp = await global.fetch(url, opt);

        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}, URL: ${url}`);
        }

        const data = await resp.json();
        return await transform(data, query, cachedCall);
    } catch (err) {
        if (err.name === 'AbortError') {
            logger.push(
                'Request timed out',
                {
                    source: 'content/sources/fooditCategoryImageSource',
                    id
                },
                arcSite
            );
        } else {
            logger.push(
                err,
                {
                    source: 'content/sources/fooditCategoryImageSource',
                    id
                },
                arcSite
            );
        }
        return {};
    } finally {
        clearTimeout(timeoutId);
    }
};

export default {
    fetch,
    params: {
        id: 'text',
        imageConfig: 'text'
    },
    ttl: 600
};
