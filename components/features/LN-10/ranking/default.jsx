import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { Cajaranking } from '@ln/contenidos-ui-cajaranking';
import {
    getRankingProps,
    getSectionParentId,
    getDataContent,
    RANKING_LAYOUT,
    RANKING
} from './_helper';
import StaticContent from '../../../private/common/staticContent';
import checkHydrateOnly from '../../../private/LN/common/utils/checkHydrateOnly';
import articleBoxesTracker from '../../../private/common/utils/noteTracker/articleBoxesTracker';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import CommonCollection from '../../../private/LN10/home/components/CommonCollection/default';

const RankingFeature = ({ id: featureId }) => {
    const { website, arcSite, layout, globalContent = {} } = useAppContext();

    const { node_type: nodeType, type } = globalContent;

    const { title, sectionId, sectionName } = getRankingProps(
        layout,
        featureId,
        globalContent
    );
    const sectionParentId = getSectionParentId(sectionId);
    const hasHydrateOnly = checkHydrateOnly({ layout, nodeType });

    const { articles } =
        getDataContent(
            sectionId,
            sectionParentId,
            website || arcSite,
            hasHydrateOnly,
            layout
        ) || {};

    useEffect(() => {
        type === 'story' &&
            articleBoxesTracker({
                boxType: 'ranking'
            });
    }, [type]);

    const rules = diagramationRules(RANKING_LAYOUT) || [];

    const component = (
        <section data-section={sectionId}>
            <CommonCollection
                roofData={{ title }}
                rules={rules}
                position={sectionName === RANKING ? '0190' : '0191'}
                articles={articles}
                gridType={RANKING_LAYOUT}
                ContainerCards={Cajaranking}
            />
        </section>
    );

    const sectionRanking = component || <></>;

    return hasHydrateOnly ? (
        <StaticContent>{component}</StaticContent>
    ) : (
        sectionRanking
    );
};

RankingFeature.label = 'LN10 Ranking';

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
