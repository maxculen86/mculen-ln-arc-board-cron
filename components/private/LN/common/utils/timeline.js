import React from 'react';
import {
    hasFutureDisplayDate,
    isOlderThanXHoursAgo
} from '../../../common/utils/dateAndTimeUtil';
import { LIVEBLOG } from '../../../common/utils/subtypes/subtypeHelper';
import ComHour from '../../../common/com-hour';

export const tlSources = {
    byLastNews: 'Últimas Noticias',
    byTagSection: 'Seccíon o Tag',
    byCollection: 'Caja Collection'
};

export const setTLOrderClass = (timeline = {}) => {
    const isFirst = timeline.index === 0;
    return isFirst ? '--left-top' : '--right-bottom';
};

export const setTLDistribution = (tlFeatureId, children = []) => {
    let timeline = { articles: [] };

    if (!tlFeatureId) return null;

    children.forEach((child, index) => {
        const { articles } = timeline;
        const isTimeline = child.key === tlFeatureId;
        const missingArticles = articles.length < 4 && !isTimeline;

        timeline = {
            ...timeline,
            ...(missingArticles && {
                articles: [...articles, child]
            }),
            ...(isTimeline && { content: child, index })
        };
    });

    return timeline;
};

export const setTLQuantity = (size = 5, max = 7, min = 1, backup = 3) => {
    let articlesQuantity = size;

    if (size > max) articlesQuantity = max;
    if (size < min) articlesQuantity = min;

    return {
        articlesQuantity,
        articlesQuantityBackup: articlesQuantity + backup
    };
};

export const setTLArticles = (source, articles = []) => {
    const isCollection = source === 'byCollection';

    return articles.map((article, index) => {
        const {
            _id,
            headlines = {},
            display_date: displayDate,
            content_restrictions: contentRestrictions,
            subtype
        } = article;

        const isLiveblog = subtype === LIVEBLOG;
        const artPosition = `0${index + 1}`;
        const displayDateWithThreeHours = displayDate;

        return {
            artPosition,
            key: _id,
            titleText: headlines.basic,
            cardVariant: isLiveblog ? 'liveblog' : '',
            link: article.website_url,
            hour: !isCollection && (
                <ComHour
                    displayDate={displayDateWithThreeHours}
                    size="--fivexs"
                />
            ),
            originalDisplayDate: displayDate,
            articleData: {
                _id,
                content_restrictions: contentRestrictions
            },
            label: {
                ...(isLiveblog && {
                    text: 'En Vivo',
                    className: isCollection && '--withoutHour'
                })
            }
        };
    });
};

export const setTypeOfQuery = ({
    source,
    sectionTagType,
    sectionTagValue,
    sectionsIds
}) => {
    const options = {
        byTagSection: { [`${sectionTagType}Id`]: sectionTagValue },
        byLastNews: { sectionsIds }
    };

    return options[source] || {};
};

export const setTLValidationRules = ({
    articles = [],
    source,
    sectionTagValue,
    sections = [],
    collectionId
}) => {
    const emptyRules = {
        byLastNews: !sections.length,
        byTagSection: !sectionTagValue,
        byCollection: !collectionId
    };

    return [
        {
            validation: !source,
            message: 'Debe especificar una fuente de notas'
        },
        {
            validation: emptyRules[source],
            message: 'Debe especificar un tag, seccíon o id de collection'
        },
        {
            validation: !articles.length,
            message: 'No se encontraron notas'
        }
    ];
};

export const transformLastNewsContent = data => {
    if (data && data.content_elements) {
        return {
            content_elements: data.content_elements.reduce((acc, story) => {
                if (
                    !isOlderThanXHoursAgo(story.display_date, 24) &&
                    !hasFutureDisplayDate(story.display_date)
                ) {
                    acc.push({
                        ...story,
                        display_date: story.display_date,
                        website_url: story.canonical_url
                    });
                }
                return acc;
            }, [])
        };
    }
    return null;
};
