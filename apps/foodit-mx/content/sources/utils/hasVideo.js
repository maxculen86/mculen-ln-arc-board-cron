import get from '../../../components/private/common/utils/get';

export const hasVideo = articleData => {
    const contentElementArticle = get(articleData, 'content_elements', []);

    const videoContentElement = contentElementArticle.find(
        content => content?.subtype === 'video_jw'
    );

    const videoPromoItems = get(articleData, 'promo_items.video_jw');

    return Boolean(videoContentElement) || Boolean(videoPromoItems);
};
