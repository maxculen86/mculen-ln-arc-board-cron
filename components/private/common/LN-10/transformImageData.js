import get from '../utils/get';
import {
    getSourceSet,
    getShortestImage
} from '../../LN/common/utils/mediaHelper';

const transformImageData = (articleData, imageData) => {
    const { height, width } = imageData || {};
    const resizedUrls = get(imageData, 'resized_urls', []);
    const sources = resizedUrls.filter(v => !!v.option);
    const { resizedUrl } = getShortestImage(sources);

    return {
        height,
        width,
        alt: get(articleData, 'headlines.basic'),
        src: resizedUrl,
        srcset: getSourceSet(false, imageData, sources)
    };
};

export default transformImageData;
