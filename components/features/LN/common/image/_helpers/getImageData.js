import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../../private/LN/common/utils/mediaHelper';

export const getImageData = data => {
    if (!data?.url) return null;

    const {
        alt_text: altText,
        caption,
        titleText,
        width,
        height,
        url,
        resized_urls: resizedUrls
    } = data;

    const alt = altText || caption || titleText || '';

    const sources = resizedUrls?.filter(item => item.option) || [];

    const { resizedUrl } = getShortestImage(sources);

    const pictureSources = getImagesToLoadWithPicture(false, sources);

    return {
        src: resizedUrl || url,
        width,
        height,
        alt,
        pictureSources
    };
};
