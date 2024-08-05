import { useEffect, useState } from 'react';
import getBookmarkByArticleId from '../../../../common/bookmark/api/getBookmarkByArticleId';
import useAuthManager from '../../../../../../../auth/hooks/useAuthManager';

export const useIsInShoppingList = (articleId = '', isSuscriptor) => {
    const [bookmarkId, setBookmarkId] = useState(null);
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        const fetchUserBookmarks = async () => {
            const { bookmarkId: resBookmarkId } = await getBookmarkByArticleId({
                bookmarkType: 'ingredientList',
                articleId,
                accessToken,
                token
            });

            resBookmarkId && setBookmarkId(resBookmarkId);
        };

        if (isSuscriptor) fetchUserBookmarks();
    }, [token, accessToken]);

    return { bookmarkId, setBookmarkId };
};
