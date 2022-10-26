/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from './articleAcum';
import ModRowGap from '../../common/mod-rowgap';
import checkIsApertura from '../common/utils/checkIsApertura';

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
    },
    Bookmark: {
        withSubhead: false,
        titleSize: '--m',
        withCategory: true,
        withTags: false
    }
};

const ArticlesAcum = ({
    articles = [],
    getBanner,
    typeArticle,
    classCondition,
    outputType,
    nodeType = '',
    articlesInCollection = []
}) => {
    return (
        <ModRowGap
            column="3"
            classCondition={classCondition}
            typeArticle={typeArticle}
        >
            {articles.map((art, index) => {
                const banner = getBanner ? getBanner(index) : <></>;
                const isApertura = checkIsApertura(
                    nodeType,
                    index,
                    articlesInCollection
                );

                return (
                    <ArticleAcum
                        key={art._id}
                        dataSection={DATA_SECTION}
                        article={art}
                        typeArticle={typeArticle}
                        titleSize={typeAcumRules[typeArticle].titleSize}
                        outputType={outputType}
                        withSubhead={typeAcumRules[typeArticle].withSubhead}
                        withCategory={typeAcumRules[typeArticle].withCategory}
                        withTags={typeAcumRules[typeArticle].withTags}
                        isApertura={isApertura}
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
    outputType: PropTypes.string,
    classCondition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    nodeType: PropTypes.string,
    articlesInCollection: PropTypes.arrayOf(PropTypes.object)
};

ArticlesAcum.defaultProps = {
    classCondition: '',
    outputType: 'default'
};

export default ArticlesAcum;
