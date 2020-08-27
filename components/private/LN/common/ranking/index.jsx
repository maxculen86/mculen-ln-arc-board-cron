import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

import withRankingData from '../hocs/WithRankingData';

import filter from '../../../../../content/filters/LN/nota/articleRanking';

import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';
import ComTitle from '../../../common/com-title';

import '../../../../../resources/dist/css/ln/components/ranking.css';

const Ranking = ({ articles, title, dataSection }) =>
    articles &&
    articles.length && (
        <div className="com-ranking hlp-mobile-none">
            <ComTitle tag="h2" size="--m" content={title} />
            <OrderedList>
                {articles.length > 0 &&
                    articles.map(article => (
                        <ArticleMain
                            border
                            articleData={article}
                            dataSection={dataSection}
                        />
                    ))}
            </OrderedList>
        </div>
    );

Ranking.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object),
    dataSection: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

Ranking.defaultProps = {
    articles: []
};

export default Consumer(withRankingData(Ranking, filter, 'notaM'));
