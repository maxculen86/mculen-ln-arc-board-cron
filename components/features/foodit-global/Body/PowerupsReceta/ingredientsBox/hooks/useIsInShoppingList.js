import { useEffect, useState } from 'react';
import getBookmarkByArticleId from '../../../../common/bookmark/api/getBookmarkByArticleId';

export const useIsInShoppingList = (isSuscriptor, articleId = '') => {
    const [bookmarkId, setBookmarkId] = useState(null);

    useEffect(() => {
        const fetchUserBookmarks = async () => {
            const { bookmarkId: resBookmarkId } = await getBookmarkByArticleId(
                'ingredientList',
                articleId
            );

            resBookmarkId && setBookmarkId(resBookmarkId);
        };

        if (isSuscriptor) fetchUserBookmarks();
    }, []);

    return { bookmarkId, setBookmarkId };
};
