import get from '../../../../common/utils/get';
import getAuthorsPhoto from '../../../../common/utils/getAuthorsPhoto';
import transformImageData from '../../../../common/LN-10/transformImageData';

const getCardConfig = (config, articleData) => {
    const { withMarquee, withMarqueeImg, withSubhead, withMedia } =
        config || {};
    const promoItems = get(articleData, 'promo_items.basic');
    const containsImage =
        get(articleData, 'promo_items.basic.type', '') === 'image';

    return {
        withImage: containsImage && withMedia,
        subhead:
            (!containsImage || withSubhead) &&
            get(articleData, 'subheadlines.basic'),
        marquee: withMarquee && get(articleData, 'marquesina', ''),
        marqueeImg:
            withMarqueeImg && get(getAuthorsPhoto(articleData), 'url', ''),
        cardSize: get(config, 'cardSize'),
        mediaData: transformImageData(articleData, promoItems),
        imagePosition: get(config, 'imagePosition')
    };
};

export default getCardConfig;
