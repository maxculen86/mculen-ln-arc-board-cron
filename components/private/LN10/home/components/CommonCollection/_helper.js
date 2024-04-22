/* eslint-disable no-underscore-dangle */
import get from '../../../../common/utils/get';
import getAuthorsPhoto from '../../../../common/utils/getAuthorsPhoto';
import transformImageData from '../../../../common/LN-10/transformImageData';
import { CHAIN_STYLE } from '../../../../../chains/utils/common/_helpers-WebApi';
import { LIVEBLOG } from '../../../../common/utils/subtypes/subtypeHelper';

const getCardConfig = (config, articleData) => {
    const {
        withMarquee,
        withMarqueeImg,
        withSubhead,
        withMedia,
        withSection,
        isLoadWithPicture,
        href = ''
    } = config || {};
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
        mediaData: transformImageData({
            articleData,
            imageData: promoItems,
            isLoadWithPicture
        }),
        imagePosition: get(config, 'imagePosition'),
        className: get(config, 'className'),
        withSection,
        href
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
    const authorName = get(author, 'name', '');
    return authorName.trim() ? authorName : null;
};

export const setFinalClassName = (
    index,
    chainStyle,
    className,
    newClass = ' text-center_m'
) => {
    return index === 0 && chainStyle === CHAIN_STYLE.SUB_EXCLUSIVE
        ? className.concat(newClass)
        : className;
};

export const getBadge = ({ article, isExclusiveSub, isFoodit }) => {
    if (
        get(article, 'content_restrictions.content_code') === 'cerrada' &&
        !isExclusiveSub &&
        !isFoodit
    ) {
        return {
            badgeStyle: 'exclusive-ln',
            badgeText: 'Exclusivo suscriptores'
        };
    }

    if (
        get(article, 'content_restrictions.content_code') === 'cerrada' &&
        isFoodit &&
        !isExclusiveSub
    ) {
        return {
            badgeStyle: 'none',
            badgeText: ''
        };
    }

    if (get(article, 'subtype') === LIVEBLOG) {
        return {
            badgeStyle: 'live',
            badgeText: 'vivo'
        };
    }

    if (get(article, 'owner.sponsored')) {
        return {
            badgeStyle: 'contentlab',
            badgeText: 'CONTENT LAB'
        };
    }

    return {
        badgeStyle: 'negative',
        badgeText: get(article, 'label.chapita.text')
    };
};

export default getCardConfig;
