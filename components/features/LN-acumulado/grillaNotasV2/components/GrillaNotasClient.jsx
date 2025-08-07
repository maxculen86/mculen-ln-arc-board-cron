import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGridArticlesLN from '../hooks/useGridArticles';
import { shouldStoreArticles } from '../_helpers';
import { LoadMoreButton } from './LoadMoreButton';
import ArticleCardsList from './ArticleCardList';

export function GrillaNotasClient({
    id,
    layout,
    name,
    isUltimasNoticias,
    globalContent
}) {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [storedArticles, setStoredArticles] = useState({});

    const { articles, totalCount, hasMoreArticles } = useGridArticlesLN({
        id,
        page: currentPage
    });

    const storedArticlesValues = Object.values(storedArticles);

    const clickMoreArticle = () => {
        setLoading(true);
        setCurrentPage(current => current + 1);
    };

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
    }, [currentPage, articles, storedArticlesValues]);

    const showButton = totalCount > 30 && hasMoreArticles;

    const filteredArticles = storedArticlesValues
        .filter((_, index) => index > 0)
        .flat();

    return (
        <>
            <ArticleCardsList
                articles={filteredArticles}
                isUltimasNoticias={isUltimasNoticias}
                globalContent={globalContent}
                pageBuilderLayout={layout}
            />
            {showButton && (
                <LoadMoreButton
                    clickMoreArticle={clickMoreArticle}
                    loading={loading}
                    name={name}
                />
            )}
        </>
    );
}

GrillaNotasClient.propTypes = {
    id: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isUltimasNoticias: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired
};
