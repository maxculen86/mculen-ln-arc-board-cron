import { useContent as getContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/acumulado/promoItemsRelatedImage';
import get from '../../../common/utils/get';

const AddRelatedImage = article => {
    const relatedContent = get(article, 'related_content.basic', []);
    if (article._id === '46P7NCPKIZAE5CY2LULAHCIMFQ')
        console.log('relatedContent', relatedContent);
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

    //console.log("withoutPromoItems", withoutPromoItems);
    //console.log("id", id);

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
            filter,
            staticMode: true
        });

    if (id && id === '46P7NCPKIZAE5CY2LULAHCIMFQ')
        console.log('imageData', imageData);

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
