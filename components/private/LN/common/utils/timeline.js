import React from 'react';
import { addHours } from '../../../common/utils/dateAndTimeUtil';
import { LIVEBLOG } from '../../../common/utils/subtypes/subtypeHelper';
import ComHour from '../../../common/com-hour';
import pageBuilderValidator from '../../../common/utils/pageBuilderValidator';

export const getTLFeature = (features, children, layoutName) => {
    const lowerLayout = layoutName.toLowerCase();
    const featureKeys = children.map(c => c.key);
    const tlFeature =
        features.find(
            feature =>
                feature.type.includes(lowerLayout) &&
                featureKeys.includes(feature.props.id)
        ) || {};

    return {
        tlFeature,
        id: tlFeature.props && tlFeature.props.id
    };
};

export const setTLOrderClass = timeline => {
    const isLast = timeline.index === timeline.articles.length;
    return isLast ? '--right-bottom' : '--left-top';
};

export const setTLDistribution = (children, tlFeatureId) => {
    let timeline = { articles: [] };

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

export const setTLQuantity = size => {
    const BACKUP_ARTICLES = 3;
    const MIN_ARTICLES = 1;
    const MAX_ARTICLES = 7;

    let articlesQuantity = size;

    if (size > MAX_ARTICLES) articlesQuantity = MAX_ARTICLES;
    if (size < MIN_ARTICLES) articlesQuantity = MAX_ARTICLES;

    return {
        articlesQuantity,
        articlesQuantityBackup: articlesQuantity + BACKUP_ARTICLES
    };
};

export const setTLArticles = (articles = []) => {
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
            hour: (
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
            label: { ...(isLiveblog && { text: 'En Vivo' }) }
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

const setTLValidationRules = ({
    articles,
    source,
    sectionTagValue,
    sections
}) => {
    const isTagSection = source === 'byTagSection';
    const isLastNews = source === 'byLastNews';

    const hasArticles = articles.length;
    const hasSections = sections.length;

    const emptySectionTag = isTagSection && !sectionTagValue;
    const emptyLastNews = isLastNews && !hasSections;

    return [
        {
            validation: emptySectionTag || emptyLastNews,
            message: 'Debe especificar un tag, seccíon o id de collection'
        },
        {
            validation: !hasArticles,
            message: 'No se encontraron notas'
        }
    ];
};

export const validateTL = options => {
    const rules = setTLValidationRules(options);
    return pageBuilderValidator(rules);
};
