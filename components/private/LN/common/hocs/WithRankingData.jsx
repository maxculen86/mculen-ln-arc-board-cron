import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent as getContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/nota/articleRanking';
import get from '../../../common/utils/get';
import addRelatedImage from '../utils/addRelatedImage';

const getSectionParent = (primarySection, sectionList, website) => {
    const navigationTreeSource = getContent({
        source: 'navigationTreeSource',
        query: {
            website
        }
    });
    const navigation =
        sectionList || (navigationTreeSource && navigationTreeSource.children);

    const sections = primarySection.split('/');
    const sectionParentId =
        sections && sections.length > 2 ? `/${sections[1]}` : null;
    const { name: titleSectionParent } =
        (sectionParentId &&
            navigation &&
            navigation.find(section => section._id === sectionParentId)) ||
        {};
    return {
        titleSectionParent,
        sectionParentId
    };
};

const getSectionData = props => {
    const globalContent = get(props, 'globalContent', null);
    const website = get(props, '_website', null);
    const arcSite = get(props, 'arcSite', null);

    // Acumulados
    const isAcuSection = get(globalContent, 'node_type', null) === 'section';
    const acuSectionName = get(globalContent, 'name', null);
    const acuSectionId = get(globalContent, '_id', null);

    // Notas
    const sectionList = get(globalContent, 'taxonomy.sections', null);
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

    const sectionId =
        (isAcuSection && acuSectionId) ||
        (primarySectionName && primarySectionId) ||
        null;

    const sectionParent =
        sectionId &&
        !sectionId.includes('/recetas') &&
        getSectionParent(sectionId, sectionList, website || arcSite);

    const { sectionParentId, titleSectionParent } = sectionParent || {};

    const title =
        titleSectionParent ||
        (isAcuSection && acuSectionName) ||
        primarySectionName ||
        null;

    return {
        title: title ? `Más leídas de ${title}` : `Más leídas`,
        sectionId: sectionParentId || sectionId
    };
};

const getRankingContent = (
    sectionId,
    size,
    imageConfig,
    daysAgo,
    weeksAgo,
    website
) => {
    const articles = getContent({
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

    return articles && articles.content_elements;
};

const getArticles = (index, props, sectionId, imageConfig) => {
    const weeksAgo = get(props, `customFields.weeksAgo${index}`, 1);
    const daysAgo = get(props, `customFields.daysAgo${index}`, 1);
    const size = get(props, `customFields.size${index}`, 3);
    const website = get(props, 'website', null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const articles = getRankingContent(
        sectionId,
        size,
        imageConfig,
        daysAgo,
        weeksAgo,
        website
    );

    return articles && articles.length >= size ? articles : null;
};

const WithRankingData = (WrappedComponent, imageConfig) => props => {
    const { title, sectionId } = getSectionData(props);

    let articleList;
    // Por el momento se harán dos llamadas a lo sumo
    for (let i = 1; i <= 2; i += 1) {
        if (!articleList) {
            articleList = getArticles(i, props, sectionId, imageConfig);
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
    imageConfig: PropTypes.string.isRequired
};

export default WithRankingData;
