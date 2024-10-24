import nodeFetch from 'node-fetch';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

import get from '../../components/private/common/utils/get';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls';
import logger from '../../components/private/common/utils/logger';

const transform = async (data, siteProps) => {
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

const fetch = (query, { cachedCall } = {}) => {
    const { id = '' } = query;

    const arcSite = query['arc-site'];

    const url = `${CONTENT_BASE}${resolve(query)}`;
    const opt = {
        method: 'GET',
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    return nodeFetch(url, opt)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(
                    `HTTP error! status: ${resp.status}, URL: ${url}`
                );
            }
            return resp.json();
        })
        .then(data => transform(data, query, cachedCall))
        .catch(err => {
            logger.push(
                err,
                {
                    source: 'content/sources/fooditCategoryImageSource',
                    id
                },
                arcSite
            );
        });
};

export default {
    fetch,
    params: {
        id: 'text',
        imageConfig: 'text'
    },
    ttl: 600
};
