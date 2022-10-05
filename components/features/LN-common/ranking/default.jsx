import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useContent as getContent } from 'fusion:content';
import StaticValidation from '../../../private/common/staticValidation';
import CajaTema from '../../../private/LN/common/cajaTema';
import { getRankingProps, getSectionParentId, hasArticles } from './_helper';
import StaticContent from '../../../private/common/staticContent';
import '../../../../resources/dist/css/ln/components/ranking.css';
import { productClickFromClient } from '../../../private/common/utils/viewability';

const getDataContent = (
    sectionId,
    sectionParentId,
    website,
    isHome = false
) => {
    const getRankingData = section =>
        getContent({
            source: 'rankingArticlesSource',
            query: {
                sectionId: section,
                imageConfig: 'boxArticles',
                website
            },
            staticMode: isHome
        });

    const data = getRankingData(sectionId);

    if (!sectionId || !sectionParentId) return data || {};

    return (hasArticles(data) && data) || getRankingData(sectionParentId);
};

const RankingFeature = ({ id: featureId }) => {
    const {
        outputType,
        website,
        arcSite,
        layout,
        globalContent
    } = useAppContext();

    const {
        title,
        sectionName,
        sectionId,
        isHome,
        notesQuantity,
        classCondition,
        rankingLayout
    } = getRankingProps(layout, featureId, globalContent);

    const sectionParentId = getSectionParentId(sectionId);
    const { name, articles } =
        getDataContent(
            sectionId,
            sectionParentId,
            website || arcSite,
            isHome
        ) || {};

    const customTitle = name ? `Más leídas de ${name}` : 'Más leídas';

    const component = articles && articles.length && (
        <CajaTema
            title={title || customTitle}
            notesQuantity={notesQuantity}
            sectionName={sectionName}
            articles={articles}
            position="toi"
            dataSection={sectionId}
            outputType={outputType}
            classCondition={classCondition}
            titleSize="--xs"
            withVolanta
            layout={rankingLayout}
            isHome={isHome}
            handleClick={productClickFromClient}
        />
    );

    const sectionRanking = (component && (
        <StaticValidation id={featureId}>{component}</StaticValidation>
    )) || <></>;

    return isHome ? <StaticContent>{component}</StaticContent> : sectionRanking;
};

RankingFeature.label = 'LN-Common-Ranking';

RankingFeature.propTypes = {
    id: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        node_type: PropTypes.string,
        type: PropTypes.string,
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                _id: PropTypes.string
            })
        })
    }).isRequired
};

export default RankingFeature;
