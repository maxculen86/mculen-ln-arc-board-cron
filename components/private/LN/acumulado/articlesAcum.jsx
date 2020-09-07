import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from './articleAcum';
import ModRowGap from '../../common/mod-rowgap';

// const CLASS_W_100 = 'w-100-mobile';
const DATA_SECTION = 'CuerpoAcu';

const ArticlesAcum = ({
    articles = [],
    getBanner,
    typeArticle,
    classCondition
}) => {
    return (
        <ModRowGap
            column="3"
            classCondition={classCondition}
            typeArticle={typeArticle}
        >
            {articles.map((art, i) => {
                const mobileBanner = getBanner('mobile', i);
                const tabletBanner = getBanner('tablet', i);
                return (
                    <ArticleAcum
                        key={art._id}
                        dataSection={DATA_SECTION}
                        article={art}
                        typeArticle={typeArticle}
                    >
                        {mobileBanner}
                        {tabletBanner}
                    </ArticleAcum>
                );
            })}
        </ModRowGap>
    );
};

ArticlesAcum.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    getBanner: PropTypes.func.isRequired,
    typeArticle: PropTypes.string.isRequired,
    classCondition: PropTypes.string
};

export default ArticlesAcum;

/*
   if (articles && articles.length) {
        articlesComponents = articles.map((a, i) => {
            const banner = getBanner(i);

            return (
                <ArticleAcum
                    key={a._id}
                    dataSection={DATA_SECTION}
                    extraClasses={CLASS_W_100}
                    article={a}
                    typeArticle={typeArticle}
                >
                    {banner}
                </ArticleAcum>
            );
        });
    }

    return articlesComponents;
*/
