import get from '../../../get';
import { getDefaultSize } from './resizerHelper';
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
        } else {
            resp[key] = promoItem;
        }
    });
    return resp;
};

export default { resizePromoItems };
