import { SITE_LANACION } from 'fusion:environment';
import getPresets from '../../../../content/sources/utils/presets';
import { getAllImagesAuth } from '../../../../content/sources/utils/signingServiceSource/getImagesAuth';
import get from '../../../private/common/utils/get';
import { addResizedUrls } from '../../../private/common/utils/image/resizer/addResizerUrls';
import { isFotoAl100orStorytelling } from '../../../private/common/utils/subtypes/subtypeHelper';
import { enumTypeError } from '../../../private/LN/api/common/enums/enumTypeError';
import { BackendLnError } from '../../../private/LN/api/common/models/backendLnError';
import { handleHttpError } from '../../../private/common/utils/handleHttpError';

const resolve = query => {
    const { imageId, arcSite } = query;
    const newArcSite = arcSite || 'la-nacion-ar';

    return `${SITE_LANACION}/api/signingServiceSource/${imageId}/?_website=${newArcSite}&outputType=json`;
};

const getAuthImage = async query => {
    try {
        const resp = await global.fetch(resolve(query));
        handleHttpError(resp);
        return resp.json();
    } catch (err) {
        console.error(
            new BackendLnError(
                `getAuthImage - msj: Error: ${err.message} - query: ${JSON.stringify(query || {})} - endpoint: ${resolve(query)}`,
                enumTypeError.featureError
            )
        );
        return null;
    }
};

export const setAuthCredits = async (
    credits = {},
    arcSite = 'la-nacion-ar'
) => {
    const objCredits = { ...credits };
    await Promise.all(
        (objCredits.by || []).map(async (credit, i) => {
            if (credit.image && !credit.image.auth) {
                const imageId = get(credit, 'image.url', null);
                const authImage =
                    (imageId || '').length > 0
                        ? await getAuthImage({ imageId, arcSite })
                        : null;
                if (authImage) {
                    objCredits.by[i].image = {
                        ...credit.image,
                        auth: {
                            1: authImage.hash
                        }
                    };
                } else {
                    objCredits.by[i].image = null;
                }
            }
        })
    );
};

export const setAuthPromoItem = async (promoItems, arcSite) => {
    const objPromoItems = promoItems;

    await Promise.all(
        Object.keys(promoItems || {}).map(async key => {
            if (
                promoItems[key] &&
                promoItems[key].type === 'image' &&
                !promoItems[key].auth
            ) {
                const imageId = get(promoItems[key], '_id', null);
                const authImage = await getAuthImage({ imageId, arcSite });

                if (authImage) {
                    objPromoItems[key] = {
                        ...objPromoItems[key],
                        auth: {
                            1: authImage.hash
                        }
                    };
                } else {
                    objPromoItems[key] = {};
                }
            }
        })
    );
};

export const setResizerv2 = (
    element,
    presets,
    isInApertura,
    presetsPromoItems,
    presetsDefault,
    arcSite
) => {
    const promoItems = get(element, 'promo_items', null);
    const subtype = get(element, 'subtype', null);
    const presetsCredits = get(presets, 'credits', null);
    const credits = get(element, 'credits', null);

    return {
        ...element,
        ...addResizedUrls(
            {
                ...(promoItems && { promo_items: promoItems }),
                ...(credits && { credits })
            },
            {
                presets: {
                    promoItems: presetsPromoItems,
                    ...(credits && { credits: presetsCredits }),
                    presetsDefault
                },
                // Se pasa el subtype para que las notas de foto al 100
                // y storytelling no sean excluidas de las validaciones del resizer
                // y pueda aplicarse 3:2, focal point o smartcrop
                subtype: isFotoAl100orStorytelling(subtype) ? '-1' : subtype,
                shouldUseV2: true,
                isInApertura,
                arcSite
            }
        )
    };
};

export const getNewAcuElements = async (
    newAcuArticlesSourceSection,
    oldAcuArticlesSourceSection,
    query,
    arcSite
) => {
    const { presets, presetsDefault } = getPresets(query);
    const presetsPromoItems = get(presets, 'promo_items', null);

    const newObjAcuArticlesSourceSection = newAcuArticlesSourceSection;
    newObjAcuArticlesSourceSection.content_elements = await Promise.all(
        oldAcuArticlesSourceSection.content_elements.map(async (elem, i) => {
            let isInApertura = false;
            if (!elem) {
                return elem;
            }
            if (i === 0) {
                isInApertura = true;
            }
            if (elem.promo_items) {
                await setAuthPromoItem(elem.promo_items, arcSite);
            }
            if (elem.credits) {
                await setAuthCredits(elem.credits, arcSite);
            }
            return setResizerv2(
                elem,
                presets,
                isInApertura,
                presetsPromoItems,
                presetsDefault,
                arcSite
            );
        })
    );
    return newAcuArticlesSourceSection;
};

export const getAcuElements = async (
    newAcuArticlesSourceSection,
    oldAcuArticlesSourceSection,
    query,
    arcSite
) => {
    const { presets, presetsDefault } = getPresets(query);
    const presetsPromoItems = get(presets, 'promo_items', null);

    const newObjAcuArticlesSourceSection = newAcuArticlesSourceSection;
    newObjAcuArticlesSourceSection.content_elements = await Promise.all(
        oldAcuArticlesSourceSection.content_elements.map(async (elem, i) => {
            let isInApertura = false;
            if (!elem) {
                return elem;
            }
            const newElem = await getAllImagesAuth(elem, {});
            if (i === 0) {
                isInApertura = true;
            }
            return setResizerv2(
                newElem,
                presets,
                isInApertura,
                presetsPromoItems,
                presetsDefault,
                arcSite
            );
        })
    );
    return newAcuArticlesSourceSection;
};
