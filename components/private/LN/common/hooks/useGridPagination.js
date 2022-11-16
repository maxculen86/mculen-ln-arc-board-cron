/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import useGridArticles from './useGridArticles';
import ArticlesAcum, {
    typeAcumRules,
    DATA_SECTION
} from '../../acumulado/articlesAcum';
import ArticleAcum from '../../acumulado/articleAcum';
import ModRowGap from '../../../common/mod-rowgap';
import get from '../../../common/utils/get';

const useGridPagination = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const [storedArticles, setStoredArticles] = useState({});
    const [loading, setLoading] = useState(false);

    const { outputType, getBanner, layout, acumuladoGeneral = {} } = props;
    const hasCollectionApertura = !!get(
        acumuladoGeneral,
        'id_collection_promo_items'
    );

    const { articles, moreArticles } = useGridArticles({
        ...props,
        page: currentPage,
        hasCollectionApertura
    });

    const { tipo_acumulado: accumulatedType = 'Grilla' } = acumuladoGeneral;

    const storedArticlesValues = Object.values(storedArticles);

    const goToNextPage = () => {
        setLoading(true);
        setCurrentPage(prev => prev + 1);
    };

    useEffect(() => {
        const verifyPrevious = values => {
            const firstArticleId = articles && articles[0] && articles[0]._id;
            const storedArticlesIds = [...values]
                .flat()
                .map(article => article._id);

            return storedArticlesIds.includes(firstArticleId);
        };

        const hasFirstArticleId = verifyPrevious(storedArticlesValues);

        if (
            (!hasFirstArticleId || !storedArticlesValues.length) &&
            articles.length
        ) {
            setStoredArticles(prev => ({
                ...prev,
                [currentPage]: articles
            }));

            setLoading(false);
        }
    }, [currentPage, articles, storedArticlesValues]);

    const typeArticle = layout || accumulatedType;

    const InitialGrid = (
        <ArticlesAcum
            getBanner={getBanner}
            outputType={outputType}
            typeArticle={typeArticle}
            articles={storedArticles[1] || articles}
        />
    );

    const NextResults = (
        <ModRowGap column="3" typeArticle={typeArticle}>
            {storedArticlesValues
                .filter((_, index) => index > 0)
                .map(page =>
                    page.map(article => (
                        <ArticleAcum
                            key={article._id}
                            dataSection={DATA_SECTION}
                            article={article}
                            typeArticle={typeArticle}
                            titleSize={typeAcumRules[typeArticle].titleSize}
                            outputType={outputType}
                            withSubhead={typeAcumRules[typeArticle].withSubhead}
                            withCategory={
                                typeAcumRules[typeArticle].withCategory
                            }
                            withTags={typeAcumRules[typeArticle].withTags}
                            isApertura={false}
                        />
                    ))
                )}
        </ModRowGap>
    );

    return {
        goToNextPage,
        loading,
        hasMoreArticles: moreArticles > 0,
        InitialGrid,
        NextResults
    };
};

export default useGridPagination;
