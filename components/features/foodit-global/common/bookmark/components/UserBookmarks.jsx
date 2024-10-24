import { useEffect } from 'react';
import getBookmarks from '../api/getBookmarks';
import { toggleBookmarks } from '../iconHelper';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../../auth/helper/loginHelper';
import useAuthManager from '../../../../../../auth/hooks/useAuthManager';

export function UserBookmarks() {
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        localStorage.removeItem('bookmarkFolders');
        localStorage.removeItem('bookmarkedItems');

        const fetchUserBookmarks = async () => {
            const { data = [] } = await getBookmarks(token, accessToken);

            const bookmarks = data.map(({ bookmarkTypeId, bookmarkId }) => ({
                bookmarkTypeId,
                bookmarkId
            }));
            localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarks));

            if (bookmarks.length) {
                toggleBookmarks(
                    bookmarks.map(bookmark => bookmark.bookmarkTypeId),
                    true
                );
            }
        };

        if (isSubscribed(SUBSCRIBED_HELPER.FOODIT)) fetchUserBookmarks();
    }, [token, accessToken]);

    return null;
}
