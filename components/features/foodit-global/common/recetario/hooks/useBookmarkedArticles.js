import React, { useState, useEffect, useMemo, useCallback } from 'react';

import fetchDeleteBookmark from '../../bookmark/api/deleteBookmark';

import RecetarioArticle from '../components/RecetarioArticle';

const useBookmarkedArticles = (
    userBookmarks,
    selectedItemId,
    setUserBookmarks,
    setSelectedItem
) => {
    const [displayArticlesNum, setDisplayArticlesNum] = useState(24);

    useEffect(() => {
        setDisplayArticlesNum(24);
    }, [selectedItemId]);

    const handleDeleteBookmark = useCallback(
        (bookmarkId, bookmarkTypeId) => {
            fetchDeleteBookmark(
                [{ bookmarkId, bookmarkTypeId }],
                setUserBookmarks,
                setSelectedItem,
                userBookmarks.length
            );
        },
        [setUserBookmarks, setSelectedItem, userBookmarks.length]
    );

    const filteredAndSlicedBookmarks = useMemo(() => {
        const result = [];
        for (
            let i = 0;
            i < userBookmarks.length && result.length < displayArticlesNum;
            // eslint-disable-next-line no-plusplus
            i++
        ) {
            const article = userBookmarks[i];
            if (
                selectedItemId === 'Todas' ||
                article.bookmarkGroup === selectedItemId
            ) {
                result.push(
                    <RecetarioArticle
                        key={article.bookmarkId}
                        article={article}
                        handleDeleteBookmark={handleDeleteBookmark}
                        isFirst={i === 0}
                    />
                );
            }
        }
        return result;
    }, [
        userBookmarks,
        selectedItemId,
        displayArticlesNum,
        handleDeleteBookmark
    ]);

    return {
        displayArticlesNum,
        setDisplayArticlesNum,
        filteredAndSlicedBookmarks,
        handleDeleteBookmark
    };
};

export default useBookmarkedArticles;
