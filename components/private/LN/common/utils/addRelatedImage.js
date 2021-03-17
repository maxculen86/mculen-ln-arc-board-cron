import { useContent as getContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/acumulado/promoItemsRelatedImage';
import get from '../../../common/utils/get';

const AddRelatedImage = article => {
    const relatedContent = get(article, 'related_content.basic', []);
    const { _id: id } =
        (relatedContent &&
            relatedContent.find(
                item =>
                    get(item, 'referent.type') === 'image' ||
                    get(item, 'type') === 'image'
            )) ||
        {};

    const withoutPromoItems =
        !get(article, 'promo_items.basic') ||
        get(article, 'promo_items.basic.type') !== 'image';

    const imageData =
        id &&
        withoutPromoItems &&
        getContent({
            source: 'relatedImageSource',
            query: {
                id,
                subtype: get(article, 'subtype'),
                imageConfig: 'm'
            },
            filter
        });

    return (
        (imageData && {
            ...article,
            promo_items: {
                ...imageData.promo_items
            }
        }) ||
        article
    );
};

export default AddRelatedImage;
