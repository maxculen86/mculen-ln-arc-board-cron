import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from '../articleAcum';

const CLASS_W_100 = 'w-100-mobile';
const DATA_SECTION = 'CuerpoAcu';

const ArticlesAcum = ({ articles, getBanner }) => {
    let articlesComponents = [];

    if (articles && articles.length) {
        articlesComponents = articles.map((a, i) => {
            const mobileBanner = getBanner('mobile', i);
            const tabletBanner = getBanner('tablet', i);

            return (
                <ArticleAcum
                    key={a._id}
                    dataSection={DATA_SECTION}
                    extraClasses={CLASS_W_100}
                    article={a}
                >
                    {mobileBanner}
                    {tabletBanner}
                </ArticleAcum>
            );
        });
    }

    return articlesComponents;
};

ArticlesAcum.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    getBanner: PropTypes.func.isRequired
};

export default ArticlesAcum;
