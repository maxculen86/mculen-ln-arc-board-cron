import { SITE_LANACION } from 'fusion:environment';
import nodeFetch from 'node-fetch';
import get from '../../../private/common/utils/get';
import { isFotoAl100orStorytelling } from '../../../../components/private/common/utils/subtypes/subtypeHelper';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import getPresets from '../../../../content/sources/utils/presets';

const resolve = query => {
    const { imageId, arcSite, ticksCache, versionDeploy } = query;
    const newArcSite = arcSite || 'la-nacion-ar';
    return `${SITE_LANACION}/pf/api/v3/content/fetch/signingServiceSource?query={"imageId":"${imageId}"}&_website=${newArcSite}`;
};

const getAuthImage = async query => {
    const opt = {
        method: 'GET'
    };

    const resp = await nodeFetch(resolve(query), opt);
    return resp.json();
};

export const setAuthCredits = async (credits = {}, arcSite) => {
    await Promise.all(
        credits.by.map(async credit => {
            if (credit.image && !credit.image.auth) {
                const imageId = get(credit, 'image.url', null);
                const authImage =
                    (imageId || '').length > 0
                        ? await getAuthImage({ imageId, arcSite })
                        : null;
                if (authImage) {
                    credit.image = {
                        ...credit.image,
                        auth: {
                            1: authImage.hash
                        }
                    };
                }
            }
        })
    );
};

export const setAuthPromoItem = async (promoItems, arcSite) => {
    await Promise.all(
        Object.keys(promoItems || {}).map(async key => {
            if (promoItems[key].type === 'image' && !promoItems[key].auth) {
                const imageId = get(promoItems[key], '_id', null);
                const authImage = await getAuthImage({ imageId, arcSite });
                if (authImage) {
                    promoItems[key] = {
                        ...promoItems[key],
                        auth: {
                            1: authImage.hash
                        }
                    };
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

    newAcuArticlesSourceSection.content_elements = await Promise.all(
        oldAcuArticlesSourceSection.content_elements.map(async (elem, i) => {
            let isInApertura = false;
            if (i === 0) {
                const imageId = get(elem.promo_items.basic, '_id');
                elem.promo_items.basic.auth = null;
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
