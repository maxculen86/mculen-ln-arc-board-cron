import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';

import get from '../../../common/utils/get';

const getSectionData = props => {
    const globalContent = get(props, 'globalContent', null);

    // Acumulados
    const isAcuSection = get(globalContent, 'node_type', null) === 'section';
    const acuSectionName = get(globalContent, 'name', null);
    const acuSectionId = get(globalContent, '_id', null);

    // Notas
    const primarySectionName = get(
        globalContent,
        'taxonomy.primary_section.name',
        null
    );
    const primarySectionId = get(
        globalContent,
        'taxonomy.primary_section._id',
        null
    );

    const title =
        (isAcuSection && acuSectionName) || primarySectionName || null;

    const sectionId =
        (isAcuSection && acuSectionId) ||
        (primarySectionName && primarySectionId) ||
        null;

    return {
        title: title ? `Más leídas de ${title}` : `Más leídas`,
        sectionId
    };
};

const getArticles = (index, props, sectionId, imageConfig, filter) => {
    const weeksAgo = get(props, `customFields.weeksAgo${index}`, 1);
    const daysAgo = get(props, `customFields.daysAgo${index}`, 1);
    const size = get(props, `customFields.size${index}`, 3);
    const website = get(props, 'website', null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const articlesData = useContent({
        source: 'rankingArticlesSource',
        query: {
            website,
            sectionId,
            weeksAgo,
            daysAgo,
            size,
            imageConfig
        },
        filter
    });

    const articles = get(articlesData, 'content_elements', null);
    return articles && articles.length >= size ? articles : null;
};

const WithRankingData = (WrappedComponent, filter, imageConfig) => props => {
    const { title, sectionId } = getSectionData(props);

    let articleList;
    // Por el momento se harán dos llamadas a lo sumo
    for (let i = 1; i <= 2; i += 1) {
        if (!articleList) {
            articleList = getArticles(i, props, sectionId, imageConfig, filter);
        }
    }

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
