import get from '../../../../common/utils/get';
import getAuthorsPhoto from '../../../../common/utils/getAuthorsPhoto';
import transformImageData from '../../../../common/LN-10/transformImageData';

const getCardConfig = (config, articleData) => {
    const { withMarquee, withMarqueeImg, withSubhead, withMedia, withSection } =
        config || {};
    const promoItems = get(articleData, 'promo_items.basic');
    const containsImage =
        get(articleData, 'promo_items.basic.type', '') === 'image';

    const dataAuthor = getDataAuthorCollection(articleData);
    return {
        withImage: containsImage && withMedia,
        subhead:
            (!containsImage || withSubhead) &&
            get(articleData, 'subheadlines.basic'),
        marquee: withMarquee && dataAuthor,
        marqueeImg:
            withMarqueeImg && get(getAuthorsPhoto(articleData), 'url', ''),
        cardSize: get(config, 'cardSize'),
        mediaData: transformImageData(articleData, promoItems),
        imagePosition: get(config, 'imagePosition'),
        className: get(config, 'className'),
        withSection
    };
};

export const getTitleAndLeadForHome = (
    article = {},
    requireTitleLong = false
) => {
    const titleTextShort = get(article, 'headlines.mobile', '');
    const titleTextLong = get(article, 'headlines.basic', '');
    const lead = get(article, 'label.volanta.text', '');

    if (requireTitleLong) {
        return { lead: '', title: titleTextLong || titleTextShort };
    }

    return {
        lead: titleTextShort !== '' ? lead : '',
        title: titleTextShort !== '' ? titleTextShort : titleTextLong
    };
};

export const getDataAuthorCollection = article => {
    const authors = get(article, 'credits.by', []);
    const [author] = authors;
    return get(author, 'name', null);
};

export default getCardConfig;
