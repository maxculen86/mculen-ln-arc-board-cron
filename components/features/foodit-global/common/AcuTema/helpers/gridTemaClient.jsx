import React, { useEffect, useState } from 'react';
import { createArticleListTema } from '.';
import { LoadMoreButton } from '../../../../foodit/GrillaNotasAcu/helpers/loadMoreButton';
import useGridTemaFoodit from '../hooks/useGridTema';
import isSSR from '../../../../../private/LN/common/utils/isSSR';
import safeJSONParse from '../../../../private-global/common/utils/safeJSONParse';

function GridTemaClient({ globalContent }) {
    const { total, query } = globalContent;
    const [loading, setLoading] = useState(false);
    const [bookmarkedArticlesIds, setBookmarkedArticlesIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [clientArticles, setClientArticles] = useState([]);

    const maxArticles = 24;

    const { articles } = useGridTemaFoodit({
        query,
        skipArticles: maxArticles + maxArticles * currentPage,
        isStatic: isSSR()
    });

    const clickMoreArticle = () => {
        setLoading(true);
        setCurrentPage(current => current + 1);
    };

    useEffect(() => {
        const bookmarkedItems = safeJSONParse(
            localStorage?.getItem('bookmarkedItems')
        );
        setBookmarkedArticlesIds(
            bookmarkedItems.map(({ bookmarkTypeId = '' }) => bookmarkTypeId)
        );
        setClientArticles(prev => [...prev, ...articles]);
        setLoading(false);
    }, [currentPage]);

    const firstShowValidation = total > maxArticles;
    const lastShowValidation = total > clientArticles.length + maxArticles;

    const showLoadMore = firstShowValidation && lastShowValidation;

    return (
        <>
            {clientArticles.length > 0 && (
                <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
                    {createArticleListTema({
                        articles: clientArticles,
                        bookmarkedArticlesIds
                    })}
                </div>
            )}
            {showLoadMore && (
                <LoadMoreButton
                    clickMoreArticle={clickMoreArticle}
                    loading={loading}
                />
            )}
        </>
    );
}

export default GridTemaClient;
