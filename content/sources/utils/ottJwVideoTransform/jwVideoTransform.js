import slugify from 'slugify';
import get from '../../../../components/private/common/utils/get';

export const jwURLFormatter = ({ videoTitle = '', videoId = '' }) => {
    const slug = slugify(videoTitle, { lower: true });
    return `/video/${slug}-jwid${videoId}`;
};

export const transform = ({ data }) => {
    const videos = get(data, 'media', []);
    const page = get(data, 'page', '');
    const pageLength = get(data, 'page_length', '');
    const jwVideosformatted = videos.map(video => {
        const videoTitle = get(video, 'metadata.title', '');
        const videoId = get(video, 'id', '');
        const posterUrl = `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg?width=720`;

        return {
            _id: videoId,
            canonical_url: jwURLFormatter({ videoTitle, videoId }),
            first_publish_date: get(video, 'metadata.publish_start_date', ''),
            headlines: {
                basic: videoTitle
            },
            promo_items: {
                basic: {
                    url: posterUrl
                }
            },
            resized_url: posterUrl,
            website_url: jwURLFormatter({ videoTitle, videoId })
        };
    });

    return { jwVideosformatted, page, pageLength };
};
