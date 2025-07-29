import React, { useState, useEffect, useMemo, useCallback } from 'react';
import fetchDeleteBookmark from '../../bookmark/api/deleteBookmark';
import RecetarioArticle from '../components/RecetarioArticle';
import { findBookmarkById } from '../../Modals/RemoveIngredients/helpers/findByBookmarkId';
import moveBookmark from '../../bookmark/api/moveBookmark';

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

    const isValidBookmarkId = useCallback(
        bookmarkId =>
            bookmarkId &&
            typeof bookmarkId === 'string' &&
            bookmarkId.trim().length > 0 &&
            userBookmarks.some(bookmark => bookmark.bookmarkId === bookmarkId),
        [userBookmarks]
    );

    const updateSelectedItemAfterChange = useCallback(
        updatedBookmarks => {
            if (selectedItemId === 'Todas') return;

            const remainingInCurrentCollection = updatedBookmarks.filter(
                bookmark => bookmark.bookmarkGroup === selectedItemId
            );

            if (remainingInCurrentCollection.length === 0) {
                setSelectedItem({
                    id: 'Todas',
                    quantity: updatedBookmarks.length
                });
            } else {
                setSelectedItem(prevSelected => ({
                    ...prevSelected,
                    quantity: remainingInCurrentCollection.length
                }));
            }
        },
        [selectedItemId, setSelectedItem]
    );

    const executeDeleteBookmark = useCallback(
        async (bookmarkId, bookmarkTypeId) => {
            try {
                if (!isValidBookmarkId(bookmarkId)) {
                    return false;
                }

                const bookmarkInfo = findBookmarkById(
                    userBookmarks,
                    bookmarkId
                );

                if (!bookmarkInfo) {
                    return false;
                }

                const fullBookmark = userBookmarks.find(
                    bookmark => bookmark.bookmarkId === bookmarkId
                );
                const bookmarkCollection = fullBookmark?.bookmarkGroup;

                const result = await fetchDeleteBookmark(
                    [{ bookmarkId, bookmarkTypeId }],
                    setUserBookmarks,
                    setSelectedItem,
                    userBookmarks.length,
                    bookmarkInfo,
                    userBookmarks
                );

                if (result && selectedItemId === bookmarkCollection) {
                    const updatedBookmarks = userBookmarks.filter(
                        bookmark => bookmark.bookmarkId !== bookmarkId
                    );
                    updateSelectedItemAfterChange(updatedBookmarks);
                }

                return result;
            } catch (error) {
                console.error('Error in executeDeleteBookmark:', error);
                return false;
            }
        },
        [
            isValidBookmarkId,
            setUserBookmarks,
            setSelectedItem,
            userBookmarks,
            selectedItemId,
            updateSelectedItemAfterChange
        ]
    );

    const executeMoveBookmark = useCallback(
        async ({
            bookmarkId,
            bookmarkTypeId,
            targetCollectionId,
            targetCollectionName,
            bookmarkContent,
            bookmarkParent
        }) => {
            try {
                if (!isValidBookmarkId(bookmarkId)) {
                    return false;
                }

                const targetCollection =
                    targetCollectionName || targetCollectionId;
                if (!targetCollection) {
                    return false;
                }

                const currentBookmark = userBookmarks.find(
                    bookmark => bookmark.bookmarkId === bookmarkId
                );

                if (
                    currentBookmark &&
                    currentBookmark.bookmarkGroup === targetCollection
                ) {
                    return true;
                }

                const result = await moveBookmark({
                    bookmarkId,
                    bookmarkTypeId,
                    targetCollectionId,
                    targetCollectionName,
                    bookmarkContent,
                    bookmarkParent
                });

                if (result?.success) {
                    setUserBookmarks(prevBookmarks => {
                        const updatedBookmarks = prevBookmarks.map(bookmark => {
                            if (bookmark.bookmarkId === bookmarkId) {
                                return {
                                    ...bookmark,
                                    bookmarkGroup: targetCollection,
                                    ...(result.bookmarkId && {
                                        bookmarkId: result.bookmarkId
                                    }),
                                    ...(result.updatedDate && {
                                        updatedDate: result.updatedDate
                                    })
                                };
                            }
                            return bookmark;
                        });

                        updateSelectedItemAfterChange(updatedBookmarks);
                        return updatedBookmarks;
                    });

                    return true;
                }
                return false;
            } catch (error) {
                console.error('Error in executeMoveBookmark:', error);
                return false;
            }
        },
        [
            isValidBookmarkId,
            setUserBookmarks,
            updateSelectedItemAfterChange,
            userBookmarks
        ]
    );

    const filteredAndSlicedBookmarks = useMemo(() => {
        const result = [];
        for (
            let i = 0;
            i < userBookmarks.length && result.length < displayArticlesNum;
            i += 1
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
                        executeDeleteBookmark={executeDeleteBookmark}
                        executeMoveBookmark={executeMoveBookmark}
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
        executeDeleteBookmark,
        executeMoveBookmark
    ]);

    return {
        displayArticlesNum,
        setDisplayArticlesNum,
        filteredAndSlicedBookmarks,
        executeDeleteBookmark,
        executeMoveBookmark,
        selectedItemId
    };
};

export default useBookmarkedArticles;
