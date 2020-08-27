import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import React from 'react';
import get from '../../../common/utils/get';

const getTitle = globalContent => {
    const authorType = get(globalContent, 'author_type', null);
    const byline = get(globalContent, 'byline', null);
    const nodeType = get(globalContent, 'node_type', null);
    const name = get(globalContent, 'name', null);
    const taxonomy = get(globalContent, 'taxonomy', null);
    const primarySection = get(taxonomy, 'primary_section', null);
    const primarySectionName = get(primarySection, 'name', null);
    const items = get(globalContent, 'Payload.items', null);

    let title;
    if (authorType) title = byline;
    else if (nodeType === 'section') title = name;
    else if (primarySectionName) title = primarySectionName;
    else if (items && items.length) title = items[0].name;
    return title ? `Más leídas de ${title}` : `Más leídas`;
};

const getQueryFromProps = (weeksAgo, daysAgo, props, sectionId) => {
    const website = get(props, 'website', null);
    const size = get(props, 'customFields.cantidadNotas', 1);
    return {
        website,
        sectionId,
        size,
        weeksAgo,
        daysAgo
    };
};

const getArticles = (query, imageConfig, filter) => {
    const size = get(query, 'size', 3);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const articlesData = useContent({
        source: 'rankingArticlesSource',
        query: {
            ...query,
            imageConfig
        },
        filter
    });
    const articles = get(articlesData, 'content_elements', null);
    return articles && articles.length >= size ? articles : null;
};

const WithRankingData = (WrappedComponent, filter, imageConfig) =>
    function Component(props) {
        const globalContent = get(props, 'globalContent', null);
        const dataSection = get(
            globalContent,
            'taxonomy.primary_section._id',
            null
        );
        const queryLastDay = getQueryFromProps(1, 1, props, dataSection);
        const queryLastWeek = getQueryFromProps(2, 5, props, dataSection);
        const queryTest = getQueryFromProps(40, 5, props, dataSection);

        const articleList =
            getArticles(queryLastDay, imageConfig, filter) ||
            getArticles(queryLastWeek, imageConfig, filter) ||
            getArticles(queryTest, imageConfig, filter);

        return (
            <WrappedComponent
                articles={articleList}
                title={getTitle(globalContent)}
                dataSection={dataSection}
            />
        );
    };

WithRankingData.propTypes = {
    WrappedComponent: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    imageConfig: PropTypes.string.isRequired
};

export default WithRankingData;
