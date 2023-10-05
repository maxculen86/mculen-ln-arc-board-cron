import { useContent } from 'fusion:content';
import filter from '../../../../content/filters/LN/home/imageFilter.js';
import get from '../utils/get';

const useGetLogoImage = (id, isHome) => {
    const relatedImage = useContent({
        source: (id && 'relatedImageSource') || null,
        query: {
            id,
            useDataSizes: true
        },
        filter,
        staticMode: isHome
    });
    return get(relatedImage, 'promo_items.basic');
};

export default useGetLogoImage;
