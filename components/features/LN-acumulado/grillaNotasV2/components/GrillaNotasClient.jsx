import React, { useEffect, useState } from 'react';
import useGridArticlesLN from '../hooks/useGridArticles';
import { shouldStoreArticles } from '../_helpers';
import ArticleCardsList from './ArticleCardList';

export function GrillaNotasClient({
    id,
    layout,
    isUltimasNoticias,
    globalContent,
    currentPage,
    setLoading
}) {
    const [storedArticles, setStoredArticles] = useState({});

    const { articles } = useGridArticlesLN({
        id,
        page: currentPage
    });

    const storedArticlesValues = Object.values(storedArticles);

    useEffect(() => {
        if (
            (shouldStoreArticles(articles, storedArticlesValues) ||
                !storedArticlesValues.length) &&
            articles.length
        ) {
            setStoredArticles(prev => ({
                ...prev,
                [currentPage]: articles
            }));
            setLoading(false);
        }
    }, [currentPage, articles, storedArticlesValues, setLoading]);

    const filteredArticles = storedArticlesValues
        .filter((_, index) => index > 0)
        .flat();

    return (
        <ArticleCardsList
            articles={filteredArticles}
            isUltimasNoticias={isUltimasNoticias}
            globalContent={globalContent}
            pageBuilderLayout={layout}
        />
    );
}
