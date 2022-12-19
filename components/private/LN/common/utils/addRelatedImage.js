import { useContent as getContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/acumulado/promoItemsRelatedImage';
import get from '../../../common/utils/get';

const AddRelatedImage = (article = {}) => {
    const relatedContent = get(article, 'related_content.basic', []);
    const canonicalUrl = get(article, 'canonical_url', '');
    const articleId = get(article, '_id', '');
    const { _id: id } =
        (relatedContent &&
            relatedContent.find(
                item =>
                    get(item, 'referent.type', '') === 'image' ||
                    get(item, 'type', '') === 'image'
            )) ||
        {};

    const withoutPromoItems =
        !get(article, 'promo_items.basic') ||
        get(article, 'promo_items.basic.type', null) !== 'image';

    const imageData =
        id &&
        withoutPromoItems &&
        id.trim() &&
        getContent({
            source: 'relatedImageSource',
            query: {
                id: id.trim(),
                subtype: get(article, 'subtype'),
                imageConfig: 'm',
                nid: `articleId: ${articleId}, canonical Url: ${canonicalUrl}`,
                boxType: 'AddRelatedImage'
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
