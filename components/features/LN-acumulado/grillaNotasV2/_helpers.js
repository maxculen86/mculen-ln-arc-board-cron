import React from 'react';
import transformImageData from '../../../private/common/LN-10/transformImageData';
import dateAndTimeUtil, {
    addHoursAndFormat
} from '../../../private/common/utils/dateAndTimeUtil';
import get from '../../../private/common/utils/get';
import unescapeHtml from '../../../private/common/utils/unescapeHtml';
import config from '../../../../properties/sites/la-nacion-ar';
import { formatText } from '../../../private/common/utils/sectionUtils';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import getNumericRatingValue from '../../../private/common/utils/getNumericRatingValue';
import RatingBadge from '../../LN/common/ratingBadge/default';

export const shouldStoreArticles = (articles, storedArticles) => {
    const firstArticleId = get(articles[0], '_id', '');
    if (!firstArticleId) return false;

    const storedIds = Object.values(storedArticles || {})
        .flat()
        .map(article => get(article, '_id', ''));

    return !storedIds.includes(firstArticleId);
};

export const formatDisplayDate = (rawDate, isUltimasNoticias = false) => {
    if (!rawDate) return null;

    const adjustedDate = isUltimasNoticias
        ? addHoursAndFormat(3, rawDate)
        : rawDate;

    const { date } = dateAndTimeUtil(adjustedDate);
    return date;
};

const imagePosition = {
    mobile: 'img-top',
    tablet: 'img-top',
    desktop: 'img-top'
};

export const getCardPropsFromArticle = (
    article,
    isUltimasNoticias = false,
    globalContent = {},
    pageBuilderLayout = ''
) => {
    const { layoutsName = {} } = config || {};
    const key = get(article, '_id', '');
    const headlines = get(article, 'headlines', {});
    const promoItems = get(article, 'promo_items.basic', {});
    const titleTextShort = get(headlines, 'mobile', '');
    const titleTextLong = unescapeHtml(get(headlines, 'basic', ''));
    const headlinesWeb = get(headlines, 'web', '');
    const lead = get(article, 'label.volanta.text', headlinesWeb);
    const rating = getNumericRatingValue(get(article, 'content_elements', []));
    const badgeText = get(article, 'label.chapita.text', '');
    const badgeTypes = badgeText && 'negative';
    const href = get(article, 'website_url', '');
    const rawDate = get(article, 'display_date', '');
    const displayDate = formatDisplayDate(rawDate, isUltimasNoticias);
    const tags = get(article, 'taxonomy.tags', []);
    const finalTags = isUltimasNoticias ? tags : tags?.slice(0, 1);
    const mediaData = transformImageData({
        articleData: article,
        imageData: promoItems
    });
    const { name = '' } = globalContent;
    const sectionName = formatText(
        pageBuilderLayout === layoutsName.Home ||
            pageBuilderLayout === layoutsName.HomeLN10
            ? ''
            : `${name}_`
    );
    const hasAuthors = sectionName !== 'SeguiLeyendo';
    const authors = hasAuthors && getAuthorsAsString(article);

    return {
        key,
        title: titleTextShort || titleTextLong,
        lead: titleTextShort && lead,
        badgeText,
        badgeTypes,
        ratingNode: rating ? (
            <RatingBadge size={16} ratingProps={{ defaultValue: rating }} />
        ) : null,
        href,
        displayDate,
        tags: finalTags,
        imagePosition,
        mediaData,
        authors
    };
};
