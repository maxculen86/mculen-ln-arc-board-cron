import React from 'react';
import PropTypes from 'fusion:prop-types';

import withRankingData from '../hocs/WithRankingData';
import WithRelatedImages from '../hocs/WithRelatedImages';

import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';
import HeaderSection from '../../../common/mod-headerSection';

import '../../../../../resources/dist/css/ln/components/ranking.css';

const Ranking = ({ articles, dataSection, title }) => {
    return articles && articles.length ? (
        <section
            className="com-ranking"
            data-is-block="true"
            data-block-name="n_ranking"
            data-diagramacion-id="0"
        >
            <HeaderSection title={title} />
            <OrderedList>
                {articles.map((article, index) => (
                    <ArticleMain
                        // border
                        articleData={article}
                        dataSection={dataSection}
                        position={index + 1}
                    />
                ))}
            </OrderedList>
        </section>
    ) : null;
};

Ranking.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object),
    dataSection: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

Ranking.defaultProps = {
    articles: []
};

export default withRankingData(WithRelatedImages(Ranking), 'm');
