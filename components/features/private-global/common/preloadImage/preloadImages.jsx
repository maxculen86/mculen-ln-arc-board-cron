import { preload } from 'react-dom';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

function PreloadImages({ resizedUrls = [] }) {
    if (resizedUrls.length > 0) {
        const images = getImagesToLoadWithPicture(true, resizedUrls);
        images
            .filter(({ href }) => href)
            .forEach(({ mediaPreload, href }) => {
                preload(href, {
                    as: 'image',
                    fetchPriority: 'high',
                    ...(mediaPreload && { media: mediaPreload })
                });
            });
    }
    return null;
}

export default PreloadImages;
