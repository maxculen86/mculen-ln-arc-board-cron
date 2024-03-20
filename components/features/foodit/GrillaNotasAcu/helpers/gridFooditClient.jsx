import React, { useState } from 'react';
import { GridArticlesFoodit } from './gridArticles';
import { LoadMoreButton } from './loadMoreButton';
import useGridArticlesFoodit from '../hooks/useGridArticles';

const GridFooditClient = ({
    id = '',
    layout = '',
    showButton = false,
    maxArticles = 24
}) => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState([]);
    const [pageLoaded, setPageLoaded] = useState({});

    const { idArticleList, articles, hasMoreArticle } = useGridArticlesFoodit({
        id,
        page: currentPage,
        layout,
        maxArticles
    });

    const articleListIsLoaded = !Object.values(pageLoaded).includes(
        idArticleList
    );

    if (articles.length > 0 && articleListIsLoaded) {
        setPageLoaded(prev => ({ ...prev, [currentPage]: idArticleList }));
        setTotalArticles(prev => [...prev, ...articles]);
        setLoading(false);
    }

    const clickMoreArticle = () => {
        setLoading(true);
        setCurrentPage(current => current + 1);
    };

    return (
        <>
            {totalArticles.length > 0 && (
                <GridArticlesFoodit articles={totalArticles} />
            )}
            {(currentPage === 1 || loading || hasMoreArticle) && showButton && (
                <LoadMoreButton
                    clickMoreArticle={clickMoreArticle}
                    loading={loading}
                />
            )}
        </>
    );
};

export default GridFooditClient;
