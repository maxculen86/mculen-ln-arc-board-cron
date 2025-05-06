import { useEffect, useState, useCallback } from 'react';
import useAuthManager from '../../../../../../private/common/auth/hooks/useAuthManager';
import {
    BookmarkCache,
    emitBookmarkAdded,
    emitBookmarkRemoved,
    SHOPPING_LIST_EVENTS
} from '../../../../common/shoppingList/shoppingListEvents';
import getBookmarkByArticleId from '../../../../common/bookmark/api/getBookmarkByArticleId';

export const useIsInShoppingList = (isSuscriptor, articleId = '') => {
    const [bookmarkId, setLocalBookmarkId] = useState(
        () => BookmarkCache.get(articleId) || null
    );
    const { token, accessToken } = useAuthManager();

    const setBookmarkId = useCallback(
        newBookmarkId => {
            console.log('Setting bookmarkId:', {
                articleId,
                newBookmarkId,
                previous: bookmarkId
            });

            setLocalBookmarkId(newBookmarkId);

            if (newBookmarkId) {
                BookmarkCache.set(articleId, newBookmarkId);
                emitBookmarkAdded(articleId, newBookmarkId);
            } else {
                BookmarkCache.remove(articleId);
                emitBookmarkRemoved(articleId, bookmarkId);
            }
        },
        [articleId, bookmarkId]
    );

    useEffect(() => {
        const handleBookmarkAdded = event => {
            const { articleId: eventArticleId, bookmarkId: eventBookmarkId } =
                event.detail;
            if (
                eventArticleId === articleId &&
                eventBookmarkId !== bookmarkId
            ) {
                setLocalBookmarkId(eventBookmarkId);
            }
        };

        const handleBookmarkRemoved = event => {
            const { articleId: eventArticleId } = event.detail;
            if (eventArticleId === articleId && bookmarkId !== null) {
                setLocalBookmarkId(null);
            }
        };

        const handleBookmarkUpdated = event => {
            const { articleId: eventArticleId, bookmarkId: eventBookmarkId } =
                event.detail;
            if (eventArticleId === articleId) {
                setLocalBookmarkId(eventBookmarkId);
            }
        };

        window.addEventListener(
            SHOPPING_LIST_EVENTS.BOOKMARK_ADDED,
            handleBookmarkAdded
        );
        window.addEventListener(
            SHOPPING_LIST_EVENTS.BOOKMARK_REMOVED,
            handleBookmarkRemoved
        );
        window.addEventListener(
            SHOPPING_LIST_EVENTS.BOOKMARK_UPDATED,
            handleBookmarkUpdated
        );

        return () => {
            window.removeEventListener(
                SHOPPING_LIST_EVENTS.BOOKMARK_ADDED,
                handleBookmarkAdded
            );
            window.removeEventListener(
                SHOPPING_LIST_EVENTS.BOOKMARK_REMOVED,
                handleBookmarkRemoved
            );
            window.removeEventListener(
                SHOPPING_LIST_EVENTS.BOOKMARK_UPDATED,
                handleBookmarkUpdated
            );
        };
    }, [articleId, bookmarkId]);

    useEffect(() => {
        const fetchUserBookmarks = async () => {
            if (BookmarkCache.has(articleId)) {
                const cachedBookmarkId = BookmarkCache.get(articleId);
                setLocalBookmarkId(cachedBookmarkId);
                return;
            }

            try {
                const { bookmarkId: resBookmarkId } =
                    await getBookmarkByArticleId({
                        bookmarkType: 'ingredientList',
                        articleId,
                        accessToken,
                        token
                    });

                if (resBookmarkId) {
                    setLocalBookmarkId(resBookmarkId);
                    BookmarkCache.set(articleId, resBookmarkId);
                }
            } catch (error) {
                console.error('Error fetching bookmark:', error);
            }
        };

        if (isSuscriptor && articleId && token && accessToken) {
            fetchUserBookmarks();
        }
    }, [isSuscriptor, articleId, token, accessToken]);

    return { bookmarkId, setBookmarkId };
};
