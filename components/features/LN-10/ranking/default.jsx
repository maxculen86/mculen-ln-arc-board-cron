/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { Cajaranking } from '@ln/contenidos-ui-cajaranking';
import { getDataContent } from './_helper';
import {
    getRankingProps,
    getSectionParentId,
    RANKING_LAYOUT
} from './common/_helper-WebApi';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import CommonCollection from '../../../private/LN10/home/components/CommonCollection/default';
import { getMarkupForDatalayer } from '../../../private/LN/common/utils/cajaTemasHelper';
import { replaceUrlsByEnvironment } from '../../../private/common/utils/replaceProductiveImgDomain';
import isSSR from '../../../private/LN/common/utils/isSSR';

const RankingFeature = ({ id: featureId }) => {
    const { website, arcSite, layout, globalContent = {} } = useAppContext();

    const { title, sectionId, rankingLayout } = getRankingProps(
        layout,
        featureId,
        globalContent
    );

    const sectionParentId = getSectionParentId(sectionId);

    const { articles = [] } =
        getDataContent(
            sectionId,
            sectionParentId,
            website || arcSite,
            isSSR(),
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

    const component = articles.length ? (
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
    ) : (
        <></>
    );

    return (
        <Static id={featureId} htmlOnly>
            {component}
        </Static>
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
