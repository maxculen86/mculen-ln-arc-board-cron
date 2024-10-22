import { useContent } from 'fusion:content';
import filter from '../../../../../content/filters/foodit/home/fooditCategoryImageSource';
import get from '../../../../private/common/utils/get';

export const useGetImage = idImage => {
    const relatedImage = useContent({
        source: (idImage && 'fooditCategoryImageSource') || null,
        query: {
            id: idImage,
            imageConfig: 'category',
            website: 'foodit'
        },
        filter,
        staticMode: false
    });

    return get(relatedImage, 'promo_items.basic');
};
