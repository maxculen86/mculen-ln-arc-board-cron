import React from 'react';
import PropTypes from 'fusion:prop-types';

import withRankingArticlesData from '../hocs/WithRankingArticlesData';

import filter from '../../../../../content/filters/LN/nota/articleRanking';

import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';
import ComTitle from '../../../common/com-title';

import '../../../../../resources/dist/css/ln/components/ranking.css';

const Ranking = ({ ranking: { articles, dataSection, title } }) => {
    return (
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
};

Ranking.propTypes = {
    ranking: PropTypes.shape({
        articles: PropTypes.arrayOf(PropTypes.object),
        dataSection: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};

export default withRankingArticlesData(Ranking, filter, 'notaM');
