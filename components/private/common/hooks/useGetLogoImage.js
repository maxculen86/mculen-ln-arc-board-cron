import { useContent } from 'fusion:content';
import filter from '../../../../content/filters/LN/home/imageFilter';
import get from '../utils/get';

const useGetLogoImage = (id, staticMode = false) => {
    const relatedImage = useContent({
        source: (id && 'relatedImageSource') || null,
        query: {
            id,
            useDataSizes: true
        },
        filter,
        staticMode
    });
    return get(relatedImage, 'promo_items.basic');
};

export default useGetLogoImage;
