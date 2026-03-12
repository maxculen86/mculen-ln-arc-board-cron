import React from 'react';
import ArticleAcum from './articleAcum';
import ModRowGap from '../../common/mod-rowgap';
import checkIsApertura from '../common/utils/checkIsApertura';

export const DATA_SECTION = 'CuerpoAcu';
export const typeAcumRules = {
    Grilla: {
        withSubhead: false,
        titleSize: '--l',
        withCategory: false,
        withTags: true
    },
    Listado: {
        withSubhead: true,
        titleSize: '--l',
        titleWeight: '--font-medium',
        withCategory: false,
        withTags: false
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

function ArticlesAcum({
    articles = [],
    getBanner,
    typeArticle,
    classCondition,
    outputType,
    nodeType = '',
    articlesInCollection = [],
    hasCollectionApertura = false,
    hasChainBeforeGrid = false,
    isWiki = false,
    requestUri,
    hideSubheaderText,
    openBarrier
}) {
    return (
        <ModRowGap
            column="3"
            classCondition={classCondition}
            typeArticle={typeArticle}
        >
            {articles.map((art, index) => {
                const banner = getBanner ? getBanner(index) : null;
                const isApertura = checkIsApertura({
                    hasCollectionApertura,
                    hasChainBeforeGrid,
                    nodeType,
                    articleIndex: index,
                    articlesInCollection,
                    isWiki,
                    requestUri
                });

                return (
                    <ArticleAcum
                        key={art._id}
                        dataSection={DATA_SECTION}
                        article={art}
                        typeArticle={typeArticle}
                        titleSize={typeAcumRules[typeArticle].titleSize}
                        titleWeight={typeAcumRules[typeArticle].titleWeight}
                        outputType={outputType}
                        withSubhead={
                            typeAcumRules[typeArticle].withSubhead &&
                            !hideSubheaderText
                        }
                        withCategory={typeAcumRules[typeArticle].withCategory}
                        withTags={typeAcumRules[typeArticle].withTags}
                        isApertura={isApertura}
                        openBarrier={openBarrier}
                    >
                        {banner}
                    </ArticleAcum>
                );
            })}
        </ModRowGap>
    );
}

export default ArticlesAcum;
