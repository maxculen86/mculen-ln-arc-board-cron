import get from '../../../../components/private/common/utils/get';
import signingServiceSource from '../../signingServiceSource';

const getImagesAuth = async (promoItems, cachedCall) => {
    const id = get(promoItems, 'basic._id', null);
    const storyTellingImgId = get(promoItems, 'storytelling_mobile._id', null);

    const result = {};
    if (
        get(promoItems, 'basic.type') === 'image' &&
        !get(promoItems, 'basic.auth.1')
    ) {
        const { hash: basicHash = '' } = await cachedCall(
            'signingServiceSource Token',
            signingServiceSource.fetch, // The fetch method imported from the resizer content source
            {
                query: { imageId: id },
                ttl: 31536000,
                independent: true
            }
        );
        Object.assign(result, { basicHash });
    }

    if (
        get(promoItems, 'storytelling_mobile.type') === 'image' &&
        !get(promoItems, 'storytelling_mobile.auth.1')
    ) {
        const { hash: storytellingHash = '' } = await cachedCall(
            'signingServiceSource Token',
            signingServiceSource.fetch, // The fetch method imported from the resizer content source
            {
                query: { imageId: storyTellingImgId },
                ttl: 31536000,
                independent: true
            }
        );
        Object.assign(result, {
            storytellingHash
        });
    }

    return result;
};

export default getImagesAuth;
