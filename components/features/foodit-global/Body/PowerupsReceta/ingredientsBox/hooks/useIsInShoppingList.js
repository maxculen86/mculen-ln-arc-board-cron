import { useEffect, useState } from 'react';
import getBookmarkByArticleId from '../../../../common/bookmark/api/getBookmarkByArticleId';
import { authManager } from '../../../../../../../auth/helper/loginHelper';

export const useIsInShoppingList = (articleId = '', isSuscriptor) => {
    const [bookmarkId, setBookmarkId] = useState(null);

    useEffect(() => {
        const fetchUserBookmarks = async ({ accessToken, token } = {}) => {
            const { bookmarkId: resBookmarkId } = await getBookmarkByArticleId(
                'ingredientList',
                articleId,
                accessToken,
                token
            );

            resBookmarkId && setBookmarkId(resBookmarkId);
        };

        if (isSuscriptor) authManager(fetchUserBookmarks);
    }, []);

    return { bookmarkId, setBookmarkId };
};
