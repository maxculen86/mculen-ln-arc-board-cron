import * as resizerV2 from './v2/resizerFactory';
import * as resizerV1 from '../resizer';
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
        isAdmin,
        shouldUseV2 = false,
        shouldUseV1,
        arcSite = 'lanacionar'
    } = options;

    const {
        promo_items: promoItems,
        content_elements: contentElements,
        credits,
        taxonomy: { primary_section: { _id: section = '' } = {} } = {}
    } = ansDoc;

    if (!presets)
        throw new Error(
            'Debe proporcionar el resizerSecret, resizerUrl y presets'
        );
    const presetsContentOrDefault = presetsContentElements || presetsDefault;
    const presetPromoOrDefault = presetsPromoItems || presetsDefault;

    const resizer = resizerV1.createResizer(isInApertura, isAdmin);
    const avatarWWW = !isFotoAl100orStorytelling(subtype);
    const resizerCreditsV1 = resizerV1.createResizer(avatarWWW, isAdmin);
    const { defaultResize } = resizerV1.getDefaultSize(subtype);

    return {
        ...ansDoc,
        ...(contentElements && {
            content_elements: contentElements.map(elem => {
                if (!shouldUseV1 || shouldUseV2) {
                    return resizerV2.resizeContentElements(
                        elem,
                        presetsContentElements || presetsDefault,
                        zoomSizes,
                        defaultResize
                    );
                }
                const { type } = elem;
                return (
                    (type === 'image' &&
                        resizerV1.resizeArcImage(
                            elem,
                            presetsContentOrDefault,
                            resizer,
                            zoomSizes,
                            true,
                            defaultResize
                        )) ||
                    (type === 'gallery' &&
                        resizerV1.resizeArcGallery(
                            elem,
                            presetsContentOrDefault,
                            resizer,
                            zoomSizes,
                            true
                        )) ||
                    (type === 'video' && {
                        ...elem,
                        promo_items: {
                            basic: {
                                ...resizerV1.resizeArcImage(
                                    elem.promo_items.basic,
                                    presetsContentOrDefault,
                                    resizer,
                                    zoomSizes,
                                    true,
                                    defaultResize
                                )
                            }
                        }
                    }) ||
                    elem
                );
            })
        }),
        ...(promoItems && {
            promo_items:
                !shouldUseV1 || shouldUseV2
                    ? resizerV2.resizePromoItems(
                          presetPromoOrDefault,
                          zoomSizes,
                          subtype,
                          promoItems,
                          isInApertura,
                          arcSite
                      )
                    : resizerV1.resizePromoItems(
                          promoItems,
                          presetPromoOrDefault,
                          resizer,
                          zoomSizes,
                          subtype
                      )
        }),
        ...(credits && {
            credits:
                !shouldUseV1 || shouldUseV2
                    ? resizerV2.resizeCredits({
                          credits,
                          resizeOptions: presetsCredits || presetsDefault,
                          isInApertura: avatarWWW
                      })
                    : resizerV1.resizeCredits({
                          credits,
                          resizeOptions: presetsCredits || presetsDefault,
                          resizer: resizerCreditsV1
                      })
        })
    };
};
