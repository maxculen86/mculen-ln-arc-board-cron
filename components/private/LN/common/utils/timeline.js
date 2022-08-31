import React from 'react';
import { addHours } from '../../../common/utils/dateAndTimeUtil';
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

export const setTLArticles = (articles = [], source) => {
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
        const displayDateWithThreeHours = addHours(3, displayDate);

        return {
            artPosition,
            key: _id,
            titleText: headlines.basic,
            hour: !isCollection && (
                <ComHour
                    display_date={displayDateWithThreeHours}
                    size="--fivexs"
                />
            ),
            link: article.website_url,
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
