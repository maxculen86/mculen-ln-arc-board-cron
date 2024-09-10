import { SITE_LANACION } from 'fusion:environment';
import nodeFetch from 'node-fetch';
import get from '../../../private/common/utils/get';
import { isFotoAl100orStorytelling } from '../../../../components/private/common/utils/subtypes/subtypeHelper';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';

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
