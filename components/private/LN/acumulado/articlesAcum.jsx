import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from './articleAcum';
import ModRowGap from '../../common/mod-rowgap';

// const CLASS_W_100 = 'w-100-mobile';
const DATA_SECTION = 'CuerpoAcu';
const typeAcumRules = {
    Grilla: {
        withSubhead: false,
        titleSize: '--xs',
        withCategory: false,
        withTags: true
    },
    Listado: {
        withSubhead: true,
        titleSize: '--m',
        withCategory: true,
        withTags: true
    },
    Timeline: {
        withSubhead: false,
        titleSize: '--m',
        withCategory: true,
        withTags: true
    }
};

const ArticlesAcum = ({
    articles = [],
    getBanner,
    typeArticle,
    classCondition,
    outputType
}) => {
    return (
        <ModRowGap
            column="3"
            classCondition={classCondition}
            typeArticle={typeArticle}
        >
            {articles.map((art, i) => {
                const banner = getBanner(i);
                return (
                    <ArticleAcum
                        key={art._id}
                        dataSection={DATA_SECTION}
                        article={art}
                        typeArticle={typeArticle}
                        //titleSize={typeArticle === 'Listado' && '--m'}
                        titleSize={typeAcumRules[typeArticle].titleSize}
                        outputType={outputType}
                        withSubhead={typeAcumRules[typeArticle].withSubhead}
                        withCategory={typeAcumRules[typeArticle].withCategory}
                        withTags={typeAcumRules[typeArticle].withTags}
                    >
                        {banner}
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
    outputType: PropTypes.string.isRequired,
    classCondition: PropTypes.string
};

ArticlesAcum.defaultProps = {
    classCondition: ''
};

export default ArticlesAcum;
