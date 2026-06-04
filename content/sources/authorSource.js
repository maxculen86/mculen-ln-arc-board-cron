import getProperties from 'fusion:properties';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import filter from '../filters/LN/acumulado/author';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';
import { resizeImgUrl } from '../../components/private/common/utils/image/resizer/v2/resizerHelper';
import { isEmptyString } from '../../components/private/common/utils/dataValidation';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import logger from '../../components/private/common/utils/logger';

const resolve = key => {
    const { _id, website } = key;

    if (!_id) throw new Error('El id de autor es necesario. ');
    const arcSite = key['arc-site'];

    return `/author/v1/author-service?website=${website || arcSite}&_id=${_id}`;
};

const transform = (authorsData, query, creditHash) => {
    const { meteringVariant, imageConfig = '' } = query || {};
    const arcSite = query['arc-site'];
    const { _id: authorId = '' } = authorsData || '';
    const properties = getProperties(arcSite);
    const imagePreset = get(
        properties,
        `imageConfig.resize.${imageConfig}.credits.sizes`,
        {
            width: 280,
            height: 280,
            media: '(min-width: 320px)',
            class: '',
            type: 'image'
        }
    );
    const imageUrl =
        get(authorsData, 'image.url', '') || get(authorsData, 'image', '');

    const finalImageUrl = imageUrl
        ? resizeImgUrl({
              arcImage: {
                  url: imageUrl,
                  auth: { 1: creditHash },
                  type: 'image'
              },
              defaultResizeWithSmart: imagePreset,
              arcSite
          })
        : null;

    return {
        ...authorsData,
        ...(finalImageUrl && {
            image: {
                url: finalImageUrl
            }
        }),
        node_type: 'author',
        name: authorsData.byline,
        firstName: authorsData.firstName,
        lastName: authorsData.lastName,
        role: authorsData.role,
        canonical_url: encodeURI(`/autor/${authorId}/`),
        subscription: meteringVariant
    };
};

const fetch = async (query, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];

    const opt = {
        method: 'GET'
    };
    try {
        if (ARC_ACCESS_TOKEN)
            opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };

        const response = await global.fetch(
            `${CONTENT_BASE}${resolve(query)}`,
            opt
        );

        handleHttpError(response);

        const authorsData = await response.json();
        const image = get(authorsData, 'image', '');

        let signingResponse = null;

        if (!isEmptyString(image))
            signingResponse = await signingServiceCachedCall(image, cachedCall);

        return transform(authorsData, query, get(signingResponse, 'hash'));
    } catch (error) {
        logger.push(
            error,
            {
                source: 'content/sources/authorSource',
                url: resolve(query)
            },
            arcSite
        );

        return {};
    }
};

export default {
    fetch,
    params: {
        _id: 'text',
        website: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text',
        imageConfig: 'text'
    },
    filter,
    transform,
    ttl: 360
};
