import React, { useState } from 'react';
import { GridArticlesFoodit } from './gridArticles';
import { LoadMoreButton } from './loadMoreButton';
import useGridArticlesFoodit from '../hooks/useGridArticles';

const GridFooditClient = ({ idSection = '' }) => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState([]);
    const [pageLoaded, setPageLoaded] = useState({});

    const { idArticleList, articles, hasMoreArticle } = useGridArticlesFoodit({
        id: idSection,
        page: currentPage
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
            {(currentPage === 1 || loading || hasMoreArticle) && (
                <LoadMoreButton
                    clickMoreArticle={clickMoreArticle}
                    loading={loading}
                />
            )}
        </>
    );
};

export default GridFooditClient;
