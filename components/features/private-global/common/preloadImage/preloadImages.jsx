import { preload } from 'react-dom';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

function PreloadImages({ resizedUrls = [] }) {
    if (resizedUrls.length === 0) return null;
    const images = getImagesToLoadWithPicture(true, resizedUrls);
    images.forEach(({ mediaPreload, href } = {}) => {
        if (!href) return;
        preload(href, {
            as: 'image',
            fetchPriority: 'high',
            ...(mediaPreload && { media: mediaPreload })
        });
    });
    return null;
}

export default PreloadImages;
