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

    const executeDeleteBookmark = useCallback(
        async (bookmarkId, bookmarkTypeId) => {
            try {
                const bookmarkInfo = findBookmarkById(
                    userBookmarks,
                    bookmarkId
                );

                const fullBookmark = userBookmarks.find(
                    bookmark => bookmark.bookmarkId === bookmarkId
                );
                const bookmarkCollection = fullBookmark?.bookmarkGroup;

                const bookmarksInCurrentCollection = userBookmarks.filter(
                    bookmark => bookmark.bookmarkGroup === bookmarkCollection
                );

                const result = await fetchDeleteBookmark(
                    [{ bookmarkId, bookmarkTypeId }],
                    setUserBookmarks,
                    setSelectedItem,
                    userBookmarks.length,
                    bookmarkInfo,
                    userBookmarks
                );

                if (
                    result &&
                    selectedItemId !== 'Todas' &&
                    selectedItemId === bookmarkCollection
                ) {
                    if (bookmarksInCurrentCollection.length === 1) {
                        setSelectedItem({
                            id: 'Todas',
                            quantity: userBookmarks.length - 1
                        });
                    } else {
                        setSelectedItem(prevSelected => ({
                            ...prevSelected,
                            quantity: bookmarksInCurrentCollection.length - 1
                        }));
                    }
                }

                return result;
            } catch (error) {
                console.error('Error in executeDeleteBookmark:', error);
                return false;
            }
        },
        [setUserBookmarks, setSelectedItem, userBookmarks, selectedItemId]
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
                const result = await moveBookmark({
                    bookmarkId,
                    bookmarkTypeId,
                    targetCollectionId,
                    targetCollectionName,
                    bookmarkContent,
                    bookmarkParent
                });

                if (result?.success) {
                    const targetCollection =
                        targetCollectionName || targetCollectionId;

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

                        if (selectedItemId !== 'Todas') {
                            const remainingInCurrentCollection =
                                updatedBookmarks.filter(
                                    bookmark =>
                                        bookmark.bookmarkGroup ===
                                        selectedItemId
                                );

                            if (remainingInCurrentCollection.length === 0) {
                                setSelectedItem({
                                    id: 'Todas',
                                    quantity: updatedBookmarks.length
                                });
                            } else {
                                setSelectedItem(prevSelected => ({
                                    ...prevSelected,
                                    quantity:
                                        remainingInCurrentCollection.length
                                }));
                            }
                        }

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
        [setUserBookmarks, selectedItemId, setSelectedItem]
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
