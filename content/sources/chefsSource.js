import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import getProperties from 'fusion:properties';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';
import { isEmptyString } from '../../components/private/common/utils/dataValidation';
import { resizeImgUrl } from '../../components/private/common/utils/image/resizer/v2/buildResizerUrls';

const resolve = key => {
    const { _id, website } = key;

    if (!_id) throw new Error('El id de chef es necesario. ');
    const arcSite = key['arc-site'];

    return `/author/v1/author-service?website=${website || arcSite}&_id=${_id}`;
};

const fetch = (query, { cachedCall } = {}) => {
    const queryResolved = resolve(query);
    const opt = {
        uri: `${CONTENT_BASE}${queryResolved}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
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

    const resolveData = async () => {
        try {
            const response = await request(opt);
            const image = get(response, 'image', '');
            let signingResponse = null;
            !isEmptyString(image) &&
                (signingResponse = await signingServiceCachedCall(
                    image,
                    cachedCall
                ));

            let imageUrl =
                get(response, 'image.url', '') || get(response, 'image', '');

            return {
                ...response,
                ...(imageUrl && {
                    image: {
                        url: resizeImgUrl({
                            arcImage: {
                                url: imageUrl,
                                auth: { 1: get(signingResponse, 'hash') },
                                type: 'image'
                            },
                            defaultResizeWithSmart: imagePreset
                        })
                    }
                })
            };
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/sources/chefsSource',
                    url: queryResolved
                },
                arcSite
            );
        }
    };
    return Promise.resolve(resolveData());
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
