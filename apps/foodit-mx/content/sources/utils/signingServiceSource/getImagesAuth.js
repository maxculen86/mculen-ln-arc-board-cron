/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// TODO: Quitar eslint-disable y refactorizar para que devuelva las promesas y sea en paralelo su uso.
import get from '../../../../components/private/common/utils/get';
import signingServiceSource from '../../signingServiceSource';
import logger from '../../../../components/private/common/utils/logger';
import {
    isValidString,
    isEmptyString
} from '../../../../components/private/common/utils/dataValidation';
import {
    missingPromoItemImgAuth,
    missingContentElementImgAuth,
    missingCreditsImgAuth
} from '../signingImageAuth';

export const signingServiceCachedCall = async (id, cachedCall) => {
    if (!isValidString(id) || typeof cachedCall !== 'function') return {};
    try {
        return await cachedCall(
            'signingServiceSource Token',
            signingServiceSource.fetch,
            {
                query: { imageId: id },
                ttl: 31536000,
                independent: true
            }
        );
    } catch (error) {
        return logger.push(
            error,
            {
                source: 'content/source/signingServiceSource/getImagesAuth',
                url: id
            },
            undefined,
            true
        );
    }
};

export const getPromoItemsAuth = async (promoItems, cachedCall) => {
    const id = get(promoItems, 'basic._id', null);
    const storyTellingMobileImgId = get(
        promoItems,
        'storytelling_mobile._id',
        null
    );

    const aperturaMultimediaId = get(
        promoItems,
        'apertura_multimedia.promo_items.basic.url'
    );

    const aperturaVideoBasic = get(promoItems, 'basic.promo_items.basic.url');

    const imageVideoJw = get(
        promoItems,
        'video_jw.embed.config.videoJw.playlist[0].image'
    );

    const result = {};

    if (
        get(promoItems, 'basic.type') === 'image' &&
        !get(promoItems, 'basic.auth.1')
    ) {
        const { hash: basicHash = '' } = await signingServiceCachedCall(
            id,
            cachedCall
        );

        Object.assign(result, { basicHash });
    }

    if (
        get(promoItems, 'storytelling.type') === 'video' &&
        !get(promoItems, 'storytelling.promo_items.basic.auth.1')
    ) {
        const { hash: storytellingHash = '' } = await signingServiceCachedCall(
            get(promoItems, 'storytelling.promo_items.basic.url', ''),
            cachedCall
        );

        Object.assign(result, {
            storytellingHash
        });
    }

    if (
        get(promoItems, 'storytelling_mobile.type') === 'image' &&
        !get(promoItems, 'storytelling_mobile.auth.1')
    ) {
        const { hash: storytellingMobileHash = '' } =
            await signingServiceCachedCall(storyTellingMobileImgId, cachedCall);

        Object.assign(result, {
            storytellingMobileHash
        });
    }

    if (
        get(promoItems, 'apertura_multimedia.type') === 'video' &&
        !get(promoItems, 'apertura_multimedia.promo_items.basic.auth.1')
    ) {
        const { hash: videoHash = '' } = await signingServiceCachedCall(
            aperturaMultimediaId,
            cachedCall
        );

        Object.assign(result, { videoHash });
    }

    if (
        get(promoItems, 'basic.type') === 'video' &&
        !get(promoItems, 'basic.promo_items.basic.auth.1')
    ) {
        const { hash: videoBasicHash = '' } = await signingServiceCachedCall(
            aperturaVideoBasic,
            cachedCall
        );

        Object.assign(result, { videoBasicHash });
    }

    if (
        get(promoItems, 'video_jw.subtype') === 'video_jw' &&
        !get(promoItems, 'video_jw.auth.1')
    ) {
        const { hash: videoJwHash = '' } = await signingServiceCachedCall(
            imageVideoJw,
            cachedCall
        );
        Object.assign(result, { videoJwHash });
    }

    return result;
};

const processImageElement = async (element, index, data, cachedCall) => {
    const { hash } = await signingServiceCachedCall(
        get(element, '_id'),
        cachedCall
    );
    if (hash) {
        Object.assign(data.content_elements[index], {
            auth: { 1: hash }
        });
    }
};

const processVideoElement = async (element, index, data, cachedCall) => {
    const { hash: videoHash } = await signingServiceCachedCall(
        get(element, 'promo_items.basic.url'),
        cachedCall
    );
    if (videoHash) {
        Object.assign(data.content_elements[index].promo_items.basic, {
            auth: { 1: videoHash }
        });
    }
};

const processGalleryImages = async (
    galleryElements,
    elementIndex,
    data,
    cachedCall
) => {
    for (const [galleryIndex, galleryElement] of galleryElements.entries()) {
        if (
            get(galleryElement, 'type') === 'image' &&
            !get(galleryElement, 'auth.1')
        ) {
            const { hash: imageGalleryHash } = await signingServiceCachedCall(
                get(galleryElement, '_id'),
                cachedCall
            );

            if (imageGalleryHash) {
                Object.assign(
                    data.content_elements[elementIndex].content_elements[
                        galleryIndex
                    ],
                    {
                        auth: { 1: imageGalleryHash }
                    }
                );
            }
        }
    }
};

const processGalleryElement = async (element, index, data, cachedCall) => {
    const {
        basicHash: basicGalleryHash,
        storytellingHash: storytellingGalleryHash
    } = await getPromoItemsAuth(get(element, 'promo_items'), cachedCall);

    if (basicGalleryHash) {
        Object.assign(data.content_elements[index].promo_items.basic, {
            auth: { 1: basicGalleryHash }
        });
    }

    if (storytellingGalleryHash) {
        Object.assign(
            data.content_elements[index].promo_items.storytelling_mobile,
            {
                auth: { 1: storytellingGalleryHash }
            }
        );
    }

    const galleryElements = get(element, 'content_elements', []);
    await processGalleryImages(galleryElements, index, data, cachedCall);
};

const processVideoJwElement = async (element, index, data, cachedCall) => {
    const image = get(element, 'embed.config.videoJw.playlist[0].image');
    const { hash: videoJwHash } = await signingServiceCachedCall(
        image,
        cachedCall
    );
    if (videoJwHash) {
        Object.assign(data.content_elements[index], {
            auth: { 1: videoJwHash }
        });
    }
};

const processContentElement = async (element, index, data, cachedCall) => {
    const elementType = get(element, 'type');
    const elementSubtype = get(element, 'subtype');

    if (elementType === 'image' && !get(element, 'auth.1')) {
        await processImageElement(element, index, data, cachedCall);
    }

    if (elementType === 'video' && !get(element, 'promo_items.basic.auth.1')) {
        await processVideoElement(element, index, data, cachedCall);
    }

    if (elementType === 'gallery') {
        await processGalleryElement(element, index, data, cachedCall);
    }

    if (elementSubtype === 'video_jw' && !get(element, 'auth.1')) {
        await processVideoJwElement(element, index, data, cachedCall);
    }
};

const processContentElements = async (data, cachedCall) => {
    const contentElements = get(data, 'content_elements', []);

    if (
        !missingContentElementImgAuth({ dataContentElements: contentElements })
    ) {
        return;
    }

    for (const [index, element] of contentElements.entries()) {
        await processContentElement(element, index, data, cachedCall);
    }
};

const processCredits = async (data, cachedCall) => {
    const credits = get(data, 'credits.by', []);

    if (!missingCreditsImgAuth({ dataCredits: credits })) {
        return;
    }

    for (const [index, credit] of credits.entries()) {
        const creditImageUrl = get(credit, 'image.url', '');
        if (!isEmptyString(creditImageUrl) && !get(credit, 'image.auth.1')) {
            const { hash: creditHash } = await signingServiceCachedCall(
                creditImageUrl,
                cachedCall
            );

            if (creditHash) {
                Object.assign(data.credits.by[index].image, {
                    auth: { 1: creditHash }
                });
            }
        }
    }
};

const assignPromoItemsHashes = (data, hashes) => {
    const {
        basicHash,
        storytellingMobileHash,
        storytellingHash,
        videoHash,
        videoBasicHash,
        videoJwHash
    } = hashes;

    if (basicHash) {
        Object.assign(data.promo_items.basic, { auth: { 1: basicHash } });
    }
    if (storytellingMobileHash) {
        Object.assign(data.promo_items.storytelling_mobile, {
            auth: { 1: storytellingMobileHash }
        });
    }
    if (storytellingHash) {
        Object.assign(data.promo_items.storytelling.promo_items.basic, {
            auth: { 1: storytellingHash }
        });
    }
    if (videoHash) {
        Object.assign(data.promo_items.apertura_multimedia.promo_items.basic, {
            auth: { 1: videoHash }
        });
    }
    if (videoBasicHash) {
        Object.assign(data.promo_items.basic.promo_items.basic, {
            auth: { 1: videoBasicHash }
        });
    }
    if (videoJwHash) {
        Object.assign(data.promo_items.video_jw, { auth: { 1: videoJwHash } });
    }
};

const processPromoItems = async (data, cachedCall) => {
    const promoItems = get(data, 'promo_items', {});
    if (missingPromoItemImgAuth({ dataPromoItem: promoItems })) {
        const hashes = await getPromoItemsAuth(promoItems, cachedCall);
        assignPromoItemsHashes(data, hashes);
    }
};

const processRootImageAuth = async (data, cachedCall) => {
    if (
        get(data, '_id') &&
        get(data, 'type') === 'image' &&
        !get(data, 'promo_items.basic.auth.1')
    ) {
        const { hash } = await signingServiceCachedCall(
            get(data, '_id'),
            cachedCall
        );
        if (hash) {
            Object.assign(data, { auth: { 1: hash } });
        }
    }
};

export const getAllImagesAuth = async (data, cachedCall) => {
    await processPromoItems(data, cachedCall);
    await processContentElements(data, cachedCall);
    await processCredits(data, cachedCall);
    await processRootImageAuth(data, cachedCall);

    return data;
};
