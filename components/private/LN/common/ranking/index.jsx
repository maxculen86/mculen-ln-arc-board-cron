import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import withRankingArticlesData from '../hocs/WithRankingArticlesData';
import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';

import '../../../../../resources/dist/css/ln/components/ranking.css';
import ComTitle from '../../../common/com-title';

const getTitle = globalContent => {
    let title;
    if (globalContent.author_type) title = globalContent.byline;
    else if (globalContent.node_type === 'section') title = globalContent.name;
    else if (globalContent.taxonomy && globalContent.taxonomy.primary_section)
        title = globalContent.taxonomy.primary_section.name;
    else if (globalContent.Payload.items && globalContent.Payload.items.length)
        title = globalContent.Payload.items[0].name;

    return title ? `Más leídas de <strong>${title}</strong>` : `Más leídas`;
};

const Ranking = ({ articles, size, dataSection, globalContent }) => {
    const titleText = getTitle(globalContent);
    return (
        articles.length > 0 && (
            <div className="com-ranking hlp-mobile-none">
                <ComTitle tag="h2" size="--m" content={titleText} />
                <OrderedList>
                    {articles.length > 0 &&
                        articles
                            .slice(0, size)
                            .map(article => (
                                <ArticleMain
                                    border
                                    articleData={article}
                                    dataSection={dataSection}
                                />
                            ))}
                </OrderedList>
            </div>
        )
    );
};

Ranking.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    size: PropTypes.number,
    dataSection: PropTypes.string
};

// Ranking.defaultProps = {
//     size: 0,
//     dataSection: undefined
// };

export default Consumer(withRankingArticlesData(Ranking));
