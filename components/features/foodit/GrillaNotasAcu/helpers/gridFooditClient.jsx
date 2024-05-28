import React, { useState } from 'react';
import { GridArticlesFoodit } from './gridArticles';
import { LoadMoreButton } from './loadMoreButton';
import useGridArticlesFoodit from '../hooks/useGridArticles';
import isSSR from '../../../../private/LN/common/utils/isSSR';

const GridFooditClient = ({ id = '', layout = '', maxArticles = 24 }) => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState([]);
    const [pageLoaded, setPageLoaded] = useState({});

    const { idArticleList, articles, count } = useGridArticlesFoodit({
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
    //TODO: revisar posible mejora de logica para boton ver mas
    const showButton =
        !isSSR() &&
        document.getElementsByTagName('article').length >= maxArticles &&
        count !== maxArticles;

    const hasMoreArticles = totalArticles.length + maxArticles < count;

    const clickMoreArticle = () => {
        setLoading(true);
        setCurrentPage(current => current + 1);
    };

    return (
        <>
            {totalArticles.length > 0 && (
                <GridArticlesFoodit articles={totalArticles} />
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
};

export default GridFooditClient;
