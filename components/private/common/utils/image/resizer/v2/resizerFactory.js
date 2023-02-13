import get from '../../../get';
import { getDefaultSize, resizeArcGallery } from './resizerHelper';
import { resizeArcImage } from './buildResizerUrls';

export const resizePromoItems = (
    resizeOptions,
    zoomSizes,
    subtype,
    promoItems = {}
) => {
    const resp = {};

    const { defaultResize, shouldExcludeCrop } = getDefaultSize(subtype);

    const optionsFinal = get(resizeOptions, 'sizes', [defaultResize]);
    Object.keys(promoItems).forEach(key => {
        const promoItem = promoItems[key];

        if (promoItem.type === 'image') {
            resp[key] = resizeArcImage(
                promoItem,
                optionsFinal,
                zoomSizes,
                shouldExcludeCrop,
                defaultResize
            );
        } else if (promoItem.type === 'video') {
            resp[key] = {
                ...promoItem,
                promo_items: {
                    basic: {
                        ...resizeArcImage(
                            promoItem.promo_items.basic,
                            optionsFinal,
                            zoomSizes,
                            shouldExcludeCrop,
                            defaultResize
                        )
                    }
                }
            };
        } else {
            resp[key] = promoItem;
        }
    });
    return resp;
};

export const resizeContentElements = (
    elem,
    presetsContentOrDefault,
    zoomSizes,
    defaultResize
) => {
    const { type } = elem;
    return (
        (type === 'image' &&
            resizeArcImage(
                elem,
                presetsContentOrDefault,
                zoomSizes,
                true,
                defaultResize
            )) ||
        (type === 'gallery' &&
            resizeArcGallery(elem, presetsContentOrDefault, zoomSizes, true)) ||
        (type === 'video' && {
            ...elem,
            promo_items: {
                basic: {
                    ...resizeArcImage(
                        elem.promo_items.basic,
                        presetsContentOrDefault,
                        zoomSizes,
                        true,
                        defaultResize
                    )
                }
            }
        }) ||
        elem
    );
};
