import get from '../../../../common/utils/get';
import { extractDataFromPromoItems } from '../../../common/utils/extractDataFromPromoItems';
import { replaceUrlResizerToWWW } from '../../../../common/utils/image/resizer/v2/resizerHelper';

export const getSchemaImages = ({ promoItems = {} }) => {
    const promoItemsWithWWW = {
        ...promoItems,
        ...(get(promoItems, 'basic.type') === 'image' && {
            basic: replaceUrlResizerToWWW(get(promoItems, 'basic', {}))
        })
    };
    const { image } = extractDataFromPromoItems(promoItemsWithWWW);
    return image;
};
