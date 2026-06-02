import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import get from '../../components/private/common/utils/get';
import { getAllImagesAuth } from './utils/signingServiceSource/getImagesAuth';
import getPresets from './utils/presets';
import { resizeArcGallery } from '../../components/private/common/utils/image/resizer/v2/resizerHelper';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

const resolve = key => {
    const { id, includedFields } = key;
    const arcSite = key['arc-site'];
    const iFields = includedFields ? `&included_fields=${includedFields}` : '';
    if (!id) throw Error('Id de galería es requerido');

    return `/content/v4/galleries?website=${arcSite}&_id=${id}${iFields}`;
};

const transform = async (data, siteProps, cachedCall) => {
    const shouldResize = get(siteProps, 'resize', false);
    const isFotoAl100 = get(siteProps, 'isFotoAl100', false);
    const count = get(siteProps, 'count', 0);
    const startPosition = get(siteProps, 'startPosition', 1);
    const arcSite = get(siteProps, 'arc-site', 'lanacionar');

    if (!shouldResize) return data;

    const clonedData = { ...data };

    const elements = get(clonedData, 'content_elements', []);

    const startIndex = Math.max(0, startPosition - 1);
    const filteredContentElements = elements.slice(
        startIndex,
        startIndex + Number(count)
    );

    clonedData.content_elements = filteredContentElements;

    const authData = await getAllImagesAuth(clonedData, cachedCall);

    const mergedData = {
        ...clonedData,
        ...authData
    };

    const { presets } = getPresets(siteProps);
    const sizes = isFotoAl100
        ? get(presets, 'promo_items.fotoAl100.sizes', [])
        : get(presets, 'promo_items.sizes', []);

    const resizedData = resizeArcGallery(mergedData, sizes, [], false, arcSite);

    return {
        ...mergedData,
        ...resizedData
    };
};

const fetch = async (query, { cachedCall } = {}) => {
    const { id = '' } = query;
    const arcSite = query['arc-site'];
    const url = `${CONTENT_BASE}${resolve(query)}`;

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
        return await transform(data, query, cachedCall);
    } catch (error) {
        console.warn(
            `content/gallerySource Error: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        logger.push(
            error,
            { source: 'content/sources/gallerySource', id },
            arcSite
        );
        return {};
    }
};

export default {
    fetch,
    params: {
        id: 'text',
        includedFields: 'text',
        resize: 'bool',
        isFotoAl100: 'bool',
        imageConfig: 'text',
        count: 'number',
        startPosition: 'number'
    },
    ttl: 600
};
