import get from '../utils/get';
import {
    getSourceSet,
    getShortestImage,
    getImagesToLoadWithPicture
} from '../../LN/common/utils/mediaHelper';
import { replaceUrlResizerToWWW } from '../utils/image/resizer/v2/resizerHelper';

const transformImageData = ({
    articleData,
    imageData,
    isEager = false,
    isLoadWithPicture = false
}) => {
    const imageDataWithWWW = replaceUrlResizerToWWW(imageData || {});
    const { height, width } = imageDataWithWWW || {};
    const resizedUrls = get(imageDataWithWWW, 'resized_urls', []);
    const sources = resizedUrls.filter(v => !!v.option);
    const { resizedUrl } = getShortestImage(sources);

    return {
        height,
        width,
        alt: get(articleData, 'headlines.basic'),
        src: resizedUrl,
        srcset: getSourceSet(false, imageDataWithWWW, sources),
        loading: isEager ? 'eager' : 'lazy',
        fetchPriority: isEager ? 'high' : 'low',
        type: isLoadWithPicture ? 'picture' : 'image',
        sources: isLoadWithPicture
            ? getImagesToLoadWithPicture(false, sources)
            : []
    };
};

export default transformImageData;
