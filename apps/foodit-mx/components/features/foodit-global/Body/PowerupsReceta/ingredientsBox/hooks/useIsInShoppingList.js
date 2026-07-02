import { useEffect, useState, useCallback } from 'react';
import useAuthManager from '../../../../../../private/common/auth/hooks/useAuthManager';
import {
    BookmarkCache,
    emitBookmarkAdded,
    emitBookmarkRemoved,
    SHOPPING_LIST_EVENTS
} from '../../../../common/shoppingList/shoppingListEvents';
import getBookmarkByArticleId from '../../../../common/bookmark/api/getBookmarkByArticleId';
import { registerShoppingListEventListeners } from '../_helper';

export const useIsInShoppingList = (isSuscriptor, articleId = '') => {
    const [bookmarkId, setLocalBookmarkId] = useState(
        () => BookmarkCache.get(articleId) || null
    );
    const { token, accessToken } = useAuthManager();

    const setBookmarkId = useCallback(
        newBookmarkId => {
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

    useEffect(
        () =>
            registerShoppingListEventListeners(
                articleId,
                bookmarkId,
                setLocalBookmarkId,
                SHOPPING_LIST_EVENTS
            ),
        [articleId, bookmarkId]
    );

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
