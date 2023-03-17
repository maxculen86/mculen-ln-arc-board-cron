/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { Cajaranking } from '@ln/contenidos-ui-cajaranking';
import {
    getRankingProps,
    getSectionParentId,
    getDataContent,
    RANKING_LAYOUT
} from './_helper';
import StaticContent from '../../../private/common/staticContent';
import checkHydrateOnly from '../../../private/LN/common/utils/checkHydrateOnly';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import CommonCollection from '../../../private/LN10/home/components/CommonCollection/default';
import { getMarkupForDatalayer } from '../../../private/LN/common/utils/cajaTemasHelper';
import { replaceUrlsByEnvironment } from '../../../private/common/utils/replaceProductiveImgDomain';

// TODO: agregar test al feature

const RankingFeature = ({ id: featureId }) => {
    const { website, arcSite, layout, globalContent = {} } = useAppContext();

    const { node_type: nodeType } = globalContent;

    const { title, sectionId, rankingLayout } = getRankingProps(
        layout,
        featureId,
        globalContent
    );

    const sectionParentId = getSectionParentId(sectionId);
    const hasHydrateOnly = checkHydrateOnly({ layout, nodeType });

    const { articles = [] } =
        getDataContent(
            sectionId,
            sectionParentId,
            website || arcSite,
            hasHydrateOnly,
            layout
        ) || {};

    const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
        rankingLayout,
        '',
        '',
        '',
        ''
    );

    const rules = diagramationRules(RANKING_LAYOUT) || [];

    const component = (
        <div {...extraOptsDiv}>
            <section {...extraOpts}>
                <CommonCollection
                    roofData={{ title }}
                    rules={rules}
                    position="0190"
                    articles={replaceUrlsByEnvironment(articles)}
                    gridType={RANKING_LAYOUT}
                    ContainerCards={Cajaranking}
                />
            </section>
        </div>
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
