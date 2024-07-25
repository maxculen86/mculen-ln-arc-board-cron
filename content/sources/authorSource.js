import request from 'request-promise-native';
import getProperties from 'fusion:properties';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import filter from '../filters/LN/acumulado/author';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';
import { resizeImgUrl } from '../../components/private/common/utils/image/resizer/v2/resizerHelper';
import { isEmptyString } from '../../components/private/common/utils/dataValidation';
import logger from '../../components/private/common/utils/logger';

const resolve = key => {
    const { _id, website } = key;

    if (!_id) throw new Error('El id de autor es necesario. ');
    const arcSite = key['arc-site'];

    return `/author/v1/author-service?website=${website || arcSite}&_id=${_id}`;
};

const fetch = (query, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];

    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt)
        .then(async response => {
            const image = get(response, 'image', '');
            let signingResponse = null;
            !isEmptyString(image) &&
                (signingResponse = await signingServiceCachedCall(
                    image,
                    cachedCall
                ));
            return transform(response, query, get(signingResponse, 'hash'));
        })
        .catch(error => {
            logger.push(
                error,
                {
                    source: 'content/sources/authorSource',
                    url: resolve(query)
                },
                arcSite
            );
        });
};
const transform = (data, query, creditHash) => {
    const { meteringVariant, imageConfig = '' } = query || {};
    const arcSite = query['arc-site'];
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
    let imageUrl = get(data, 'image.url', '') || get(data, 'image', '');

    return {
        ...data,
        ...(imageUrl && {
            image: {
                url: resizeImgUrl({
                    arcImage: {
                        url: imageUrl,
                        auth: { 1: creditHash },
                        type: 'image'
                    },
                    defaultResizeWithSmart: imagePreset
                })
            }
        }),
        node_type: 'author',
        name: data.byline,
        canonical_url: encodeURI(`/autor/${data?._id || ''}/`),
        subscription: meteringVariant
    };
};

export default {
    fetch,
    params: {
        _id: 'text',
        website: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text'
    },
    filter,
    transform,
    ttl: 360
};
