import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';

import withRankingData from '../hocs/WithRankingData';

import OrderedList from '../lists/ordered';
import ArticleMain from '../articleTypes/articleMain';
import ComTitle from '../../../common/com-title';

import '../../../../../resources/dist/css/ln/components/ranking.css';

const Ranking = ({ articles: a, dataSection, title }) => {
    const [articles, setArticles] = useState(a);

    useEffect(() => {
        setArticles(a);
    }, [a]);

    return (
        (articles?.length && (
            <section
                className="com-ranking hlp-mobile-none"
                data-is-block="true"
                data-block-name="n_ranking"
                data-diagramacion-id="0"
            >
                <ComTitle tag="h2" size="--m" content={title} />
                <OrderedList>
                    {articles.length > 0 &&
                        articles.map((article, index) => (
                            <ArticleMain
                                // border
                                articleData={article}
                                dataSection={dataSection}
                                position={index + 1}
                            />
                        ))}
                </OrderedList>
            </section>
        )) ||
        null
    );
};

Ranking.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object),
    dataSection: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

Ranking.defaultProps = {
    articles: []
};

export default withRankingData(Ranking, 'm');
