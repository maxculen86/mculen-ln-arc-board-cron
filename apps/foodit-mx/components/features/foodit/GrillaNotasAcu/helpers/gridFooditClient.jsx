import React, { useState, useEffect } from 'react';
import { GridArticlesFoodit } from './gridArticles';
import { LoadMoreButton } from './loadMoreButton';
import useGridArticlesFoodit from '../hooks/useGridArticles';
import safeJSONParse from '../../../private-global/common/utils/safeJSONParse';

function GridFooditClient({ id = '', layout = '', maxArticles = 24 }) {
    const [loading, setLoading] = useState(false);
    const [bookmarkedArticlesIds, setBookmarkedArticlesIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientArticles, setClientArticles] = useState([]);
    const [pageLoaded, setPageLoaded] = useState({});
    const [totalArticlesLength, setTotalArticlesLength] = useState(0);

    useEffect(() => {
        const serverArticlesLength =
            document?.querySelectorAll('article.card').length;
        setTotalArticlesLength(serverArticlesLength);
    }, []);
    const { idArticleList, articles, count } = useGridArticlesFoodit({
        id,
        page: currentPage,
        layout,
        maxArticles
    });

    const articleListIsLoaded =
        !Object.values(pageLoaded).includes(idArticleList);

    useEffect(() => {
        if (articles.length > 0 && articleListIsLoaded) {
            const bookmarkedItems = safeJSONParse(
                localStorage?.getItem('bookmarkedItems')
            );
            setBookmarkedArticlesIds(
                bookmarkedItems.map(({ bookmarkTypeId = '' }) => bookmarkTypeId)
            );
            setPageLoaded(prev => ({ ...prev, [currentPage]: idArticleList }));
            setTotalArticlesLength(prev => prev + articles.length);
            setClientArticles(prev => [...prev, ...articles]);
            setLoading(false);
        }
    }, [articles, articleListIsLoaded]);

    const showButton =
        totalArticlesLength >= maxArticles && count !== maxArticles;
    const hasMoreArticles = clientArticles.length + maxArticles < count;

    const clickMoreArticle = () => {
        setLoading(true);
        setCurrentPage(current => current + 1);
    };

    return (
        <>
            {clientArticles.length > 0 && (
                <GridArticlesFoodit
                    articles={clientArticles}
                    bookmarkedArticlesIds={bookmarkedArticlesIds}
                />
            )}
            {showButton &&
                (currentPage === 1 || loading || hasMoreArticles) && (
                    <LoadMoreButton
                        clickMoreArticle={clickMoreArticle}
                        loading={loading}
                    />
                )}
        </>
    );
}

export default GridFooditClient;
