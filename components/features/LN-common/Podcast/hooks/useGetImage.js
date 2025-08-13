import { useContent } from 'fusion:content';
import { checkForId } from '../../../LN-10/article/common/_helper-WebApi';
import { getImageSettings } from '../_helpers';
import {
    getShortestImage,
    getImagesToLoadWithPicture
} from '../../../../private/LN/common/utils/mediaHelper';
import get from '../../../../private/common/utils/get';

const useGetImage = ({ imageId, isFirstCard, parentLayout }) => {
    const imageData =
        useContent({
            source: checkForId(imageId) ? 'relatedImageSource' : null,
            query: {
                id: imageId,
                imageConfig: getImageSettings({
                    isFirstCard,
                    diagramation: parentLayout
                })
            }
        }) || {};

    const resizedImages = get(imageData, 'promo_items.basic.resized_urls', []);
    const { resizedUrl = '' } = getShortestImage(resizedImages) || {};
    return {
        resizedUrl,
        sources: getImagesToLoadWithPicture(false, resizedImages)
    };
};

export default useGetImage;
