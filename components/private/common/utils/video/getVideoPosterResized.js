import { useContent } from 'fusion:content';

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
            }
        }) || {}
    );
};

const getVideoPosterResized = (videoID, imageConfig, isInApertura, isAdmin) => {
    const { resizedUrl } =
        fetchVideo(videoID, imageConfig, isInApertura, isAdmin) || [];

    return (
        {
            promo_items: {
                basic: {
                    resized_urls: resizedUrl
                }
            }
        } || []
    );
};

export default getVideoPosterResized;
