import { useContent } from 'fusion:content';
import videoFilter from '../../../../../content/filters/LN/home/videoFilter';
import isSSR from '../../../LN/common/utils/isSSR';

export const fetchVideo = (videoID, imageConfig, isInApertura, isAdmin) => {
    return (
        useContent({
            source: (videoID && videoID.trim() && 'videoSource') || null,
            query: {
                id: videoID && videoID.trim(),
                website: 'la-nacion-ar',
                imageConfig,
                isInApertura,
                isAdmin
            },
            staticMode: isSSR(),
            filter: videoFilter
        }) || {}
    );
};

const getVideoPosterResized = (videoID, imageConfig, isInApertura, isAdmin) => {
    const { resizedUrl = [] } = fetchVideo(
        videoID,
        imageConfig,
        isInApertura,
        isAdmin
    );

    return {
        promo_items: {
            basic: {
                resized_urls: resizedUrl
            }
        }
    };
};

export default getVideoPosterResized;
