/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { Cajaranking } from '@ln/contenidos-ui-cajaranking';
import { useRankingArticles } from './_helper';
import { getRankingProps, RANKING_LAYOUT } from './common/_helper-WebApi';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import CommonCollection from '../../../private/LN10/home/components/CommonCollection/default';
import { getMarkupForDatalayer } from '../../../private/LN/common/utils/cajaTemasHelper';
import { replaceUrlsByEnvironment } from '../../../private/common/utils/replaceProductiveImgDomain';

function RankingFeature({ id: featureId }) {
    const {
        website,
        arcSite,
        layout,
        globalContent = {},
        isAdmin
    } = useAppContext();
    const {
        title = '',
        sectionId,
        rankingLayout,
        isHome
    } = getRankingProps(layout, featureId, globalContent);

    const { articles = [] } =
        useRankingArticles(
            sectionId,
            website || arcSite,
            layout,
            '',
            'rankingArticlesSource',
            isHome
        ) || {};

    const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
        rankingLayout,
        '',
        '',
        '',
        ''
    );

    const rules = diagramationRules(RANKING_LAYOUT) || [];

    if (!articles?.length && !isHome) return null;

    return (
        <Static id={featureId} htmlOnly>
            <div {...extraOptsDiv}>
                <section {...extraOpts}>
                    <CommonCollection
                        roofData={{ title, isAdmin }}
                        rules={rules}
                        position="0196"
                        articles={replaceUrlsByEnvironment(articles)}
                        gridType={RANKING_LAYOUT}
                        ContainerCards={Cajaranking}
                    />
                </section>
            </div>
        </Static>
    );
}

RankingFeature.label = 'LN10 Ranking';

export default RankingFeature;
