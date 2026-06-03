import get from '../../../../common/utils/get';
import { extractDataFromPromoItems } from '../../../common/utils/extractDataFromPromoItems';
import replaceUrlResizerToWWW from '../../../../../../content/sources/utils/replaceUrlResizerToWWW';

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
