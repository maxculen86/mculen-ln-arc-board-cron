import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import withRankingArticlesData from '../hocs/WithRankingArticlesData';
import TitleSection from '../titles/titleSection';
import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';

import '../../../../../resources/dist/css/ln/components/ranking.css';

const Ranking = ({ articles, size, globalContent }) => {
    const title =
        globalContent.node_type === 'section'
            ? globalContent.name
            : globalContent.taxonomy.primary_section.name;
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
    articles: PropTypes.array.isRequired
};

export default Consumer(withRankingArticlesData(Ranking));
