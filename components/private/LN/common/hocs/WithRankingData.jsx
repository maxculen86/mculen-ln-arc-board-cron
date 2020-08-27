import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import React from 'react';
import get from '../../../common/utils/get';

const getSectionData = globalContent => {
    const nodeType = get(globalContent, 'node_type', null);
    const primarySection = get(globalContent, 'taxonomy.primary_section', null);
    const primarySectionName = get(
        globalContent,
        'taxonomy.primary_section.name',
        null
    );

    let title;
    let sectionId;
    if (nodeType === 'section') {
        title = get(globalContent, 'name', null);
        sectionId = get(globalContent, '_id', null);
    } else if (primarySectionName) {
        title = primarySectionName;
        sectionId = get(primarySection, '_id', null);
    }

    return {
        title: title ? `Más leídas de ${title}` : `Más leídas`,
        sectionId
    };
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

const WithRankingData = (WrappedComponent, filter, imageConfig) => props => {
    const globalContent = get(props, 'globalContent', null);
    const { title, sectionId } = getSectionData(globalContent);

    const querys = [
        getQueryFromProps(1, 1, props, sectionId),
        getQueryFromProps(2, 5, props, sectionId),
        getQueryFromProps(40, 5, props, sectionId)
    ];

    let articleList;

    querys.forEach((query, index) => {
        if (!articleList) {
            articleList = getArticles(query, imageConfig, filter);
        }
    });

    return (
        <WrappedComponent
            articles={articleList}
            title={title}
            dataSection={sectionId}
        />
    );
};

WithRankingData.propTypes = {
    WrappedComponent: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    imageConfig: PropTypes.string.isRequired
};

export default WithRankingData;
