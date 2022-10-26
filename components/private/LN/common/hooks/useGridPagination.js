/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import useGridArticles from './useGridArticles';
import ArticlesAcum from '../../acumulado/articlesAcum';

const useGridPagination = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const [storedArticles, setStoredArticles] = useState({});
    const [loading, setLoading] = useState(false);

    const { outputType, getBanner, articlesInCollection = [] } = props;

    const { articles, moreArticles } = useGridArticles({
        ...props,
        page: currentPage,
        hasCollectionApertura: articlesInCollection.length
    });

    const {
        tipo_acumulado: accumulatedType = 'Grilla'
    } = props.acumuladoGeneral;

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
            console.log('effect');
            console.log({ articles });
            console.log({ storedArticles });

            setStoredArticles(prev => ({
                ...prev,
                [currentPage]: articles
            }));

            setLoading(false);
        }
    }, [currentPage, articles, storedArticlesValues]);

    const genericProps = {
        getBanner,
        outputType,
        typeArticle: accumulatedType
    };

    const InitialGrid = <ArticlesAcum {...genericProps} articles={articles} />;

    const NextResults = storedArticlesValues
        .filter((_, index) => index > 0)
        .map(page => <ArticlesAcum {...genericProps} articles={page} />);

    return {
        goToNextPage,
        loading,
        hasMoreArticles: moreArticles > 0,
        InitialGrid,
        NextResults
    };
};

export default useGridPagination;
