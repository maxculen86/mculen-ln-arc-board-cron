import { useEffect } from 'react';
import getBookmarks from '../api/getBookmarks';
import { fillBookmarks } from '../iconHelper';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../../auth/helper/loginHelper';
import useAuthManager from '../../../../../../auth/hooks/useAuthManager';

export const UserBookmarks = () => {
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        localStorage.removeItem('bookmarkFolders');
        localStorage.removeItem('bookmarkedItems');

        const fetchUserBookmarks = async () => {
            const { data = [] } = await getBookmarks(token, accessToken);

            const bookmarks = data.map(({ bookmarkTypeId, bookmarkId }) => {
                return { bookmarkTypeId, bookmarkId };
            });
            localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarks));

            if (bookmarks.length) {
                fillBookmarks(
                    bookmarks.map(bookmark => bookmark.bookmarkTypeId)
                );
            }
        };

        if (isSubscribed(SUBSCRIBED_HELPER.FOODIT)) fetchUserBookmarks();
    }, [token, accessToken]);

    return null;
};
