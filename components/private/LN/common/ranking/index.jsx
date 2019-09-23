import React from 'react';
import '../../../../../resources/dist/css/ln/components/ranking.css';
import withRankingArticlesData from '../hocs/WithRankingArticlesData';
import PropTypes from 'fusion:prop-types';
import TitleSection from '../titles/titleSection';
import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';

const Ranking = ({ title, articles, size }) => {
    const titleText = title ? `Más leídas de ${title}` : 'Más leídas';
    return (
        <div className="com-ranking">
            {/*hlp-none hlp-tablet-none*/}
            <TitleSection size="m" text={titleText} />
            <OrderedList>
                {articles.length > 0 &&
                    articles
                        .slice(0, size)
                        .map(article => (
                            <ArticleMain border articleData={article} />
                        ))}
            </OrderedList>
        </div>
    );
};

Ranking.propTypes = {
    articles: PropTypes.oneOfType([PropTypes.array]).isRequired,
    title: PropTypes.string
};

export default withRankingArticlesData(Ranking);
