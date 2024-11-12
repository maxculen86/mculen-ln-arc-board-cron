import { getDefaultSize } from './v2/resizerHelper';
import {
    resizeContentElements,
    resizeCredits,
    resizePromoItems
} from './v2/resizerFactory';
import { isFotoAl100orStorytelling } from '../../subtypes/subtypeHelper';

export const addResizedUrls = (ansDoc, options) => {
    const {
        presets,
        presets: {
            promoItems: presetsPromoItems,
            contentElements: { sizes: presetsContentElements } = {},
            credits: presetsCredits,
            zoomSizes = []
        },
        presetsDefault,
        subtype,
        isInApertura,
        arcSite = 'lanacionar'
    } = options;

    const {
        promo_items: promoItems,
        content_elements: contentElements,
        credits
    } = ansDoc;

    if (!presets)
        throw new Error(
            'Debe proporcionar el resizerSecret, resizerUrl y presets'
        );

    const presetPromoOrDefault = presetsPromoItems || presetsDefault;
    const avatarWWW = !isFotoAl100orStorytelling(subtype);
    const { defaultResize } = getDefaultSize(subtype);

    return {
        ...ansDoc,
        ...(contentElements && {
            content_elements: contentElements.map(elem => {
                return resizeContentElements(
                    elem,
                    presetsContentElements || presetsDefault,
                    zoomSizes,
                    defaultResize,
                    arcSite
                );
            })
        }),
        ...(promoItems && {
            promo_items: resizePromoItems(
                presetPromoOrDefault,
                zoomSizes,
                subtype,
                promoItems,
                isInApertura,
                arcSite
            )
        }),
        ...(credits && {
            credits: resizeCredits({
                credits,
                resizeOptions: presetsCredits || presetsDefault,
                isInApertura: avatarWWW
            })
        })
    };
};
