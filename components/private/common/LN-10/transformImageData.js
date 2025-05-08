import get from '../utils/get';
import {
    getSourceSet,
    getShortestImage,
    getImagesToLoadWithPicture
} from '../../LN/common/utils/mediaHelper';

const transformImageData = ({
    articleData,
    imageData,
    isEager = false,
    isLoadWithPicture = false
}) => {
    const { height, width } = imageData || {};
    const resizedUrls = get(imageData, 'resized_urls', []);
    const sources = resizedUrls.filter(v => !!v.option);
    const { resizedUrl } = getShortestImage(sources);

    return {
        height,
        width,
        alt: get(articleData, 'headlines.basic'),
        src: resizedUrl,
        srcset: getSourceSet(false, imageData, sources),
        loading: isEager ? 'eager' : 'lazy',
        fetchPriority: isEager ? 'high' : 'low',
        type: isLoadWithPicture ? 'picture' : 'image',
        sources: isLoadWithPicture
            ? getImagesToLoadWithPicture(false, sources)
            : []
    };
};

export default transformImageData;
