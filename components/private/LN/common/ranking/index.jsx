import React from 'react';
import '../../../../../resources/dist/css/ln/components/ranking.css';
import withRankingArticlesData from '../hocs/WithRankingArticlesData';
import PropTypes from 'fusion:prop-types';
import TitleSection from '../titles/titleSection';
import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';

// mock array
//import articles from './mock';

const Ranking = ({ articles }) => {
    return (
        <div className="com-ranking">
            {/*hlp-none hlp-tablet-none*/}
            <TitleSection size="m" text="Recetas más leídas" />
            <OrderedList>
                {articles.length > 0 &&
                    articles
                        .filter((item, i) => i < 6)
                        .map(article => (
                            <ArticleMain border articleData={article} />
                        ))}
            </OrderedList>
        </div>
    );
};

/*Ranking.propTypes = {
    articles: PropTypes.oneOfType([PropTypes.array]).isRequired
};*/

export default withRankingArticlesData(Ranking);
