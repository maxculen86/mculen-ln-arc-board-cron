import get from '../../../../../components/private/common/utils/get';
import { signingServiceCachedCall } from '../../signingServiceSource/getImagesAuth';

export const getHashImage = async (idImage, cachedCall) => {
    const { hash: basicHash = '' } = await signingServiceCachedCall(
        idImage,
        cachedCall
    );
    return basicHash;
};

export const getCategoryImageAuth = async (data, cachedCall) => {
    if (!get(data, 'auth.1')) {
        const id = get(data, '_id', null);
        const basicHash = await getHashImage(id, cachedCall);
        if (basicHash) {
            Object.assign(data, { auth: { 1: basicHash } });
        }
    }
    return data;
};

export const getImagesAuth = async (data, cachedCall) => {
    const promoItems = get(data, 'promo_items', {});

    if (
        get(promoItems, 'basic.type') === 'image' &&
        !get(promoItems, 'basic.auth.1')
    ) {
        const id = get(promoItems, 'basic._id', null);

        const basicHash = await getHashImage(id, cachedCall);

        if (basicHash) {
            Object.assign(data.promo_items.basic, {
                auth: { 1: basicHash }
            });
        }
    }
    return data;
};
