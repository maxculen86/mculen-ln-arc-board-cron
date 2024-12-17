/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useContent as getContent } from 'fusion:content';
import Static from 'fusion:static';
import CajaTema from '../../../private/LN/common/cajaTema';
import {
    getRankingProps,
    getSectionParentId,
    hasArticles,
    RANKING
} from './_helper';
import '../../../../resources/dist/css/ln/components/ranking.css';
import { articleBoxesTracker } from '../../../private/common/utils/noteTracker/articleBoxesTracker';

const getDataContent = (
    sectionId,
    sectionParentId,
    website,
    isStatic = false
) => {
    const getRankingData = section =>
        getContent({
            source: 'rankingArticlesSource',
            query: {
                sectionId: section,
                imageConfig: 'boxArticles',
                website
            },
            staticMode: isStatic
        });

    const data = getRankingData(sectionId);

    if (!sectionId || !sectionParentId) return data || {};

    return (hasArticles(data) && data) || getRankingData(sectionParentId);
};

function RankingFeature({ id: featureId }) {
    const {
        outputType,
        website,
        arcSite,
        layout,
        globalContent = {}
    } = useAppContext();

    const { type } = globalContent;

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
        getDataContent(sectionId, sectionParentId, website || arcSite, true) ||
        {};

    const customTitle = name ? `Más leídas de ${name}` : 'Más leídas';
    useEffect(() => {
        if (type === 'story') {
            articleBoxesTracker({
                boxType: 'ranking'
            });
        }
    }, [type]);

    const component =
        articles && articles.length ? (
            <CajaTema
                title={title || customTitle}
                notesQuantity={notesQuantity}
                sectionName={sectionName}
                articles={articles}
                position={sectionName === RANKING ? '0190' : '0191'}
                dataSection={sectionId}
                outputType={outputType}
                classCondition={classCondition}
                titleSize="--xs"
                withVolanta
                layout={rankingLayout}
                isHome={isHome}
            />
        ) : (
            <></>
        );
    return (
        <Static id={`common-ranking-${featureId}`} htmlOnly>
            {component}
        </Static>
    );
}

RankingFeature.label = 'LN-Common-Ranking';

RankingFeature.propTypes = {
    id: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        type: PropTypes.string,
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                _id: PropTypes.string
            })
        })
    }).isRequired
};

export default RankingFeature;
