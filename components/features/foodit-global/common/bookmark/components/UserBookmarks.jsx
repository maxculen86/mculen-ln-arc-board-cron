import { useEffect } from 'react';
import getBookmarks from '../api/getBookmarks';
import { toggleBookmarks } from '../iconHelper';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../private/common/auth/helper/loginHelper';
import useAuthManager from '../../../../../private/common/auth/hooks/useAuthManager';

export function UserBookmarks() {
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        localStorage.removeItem('bookmarkFolders');
        localStorage.removeItem('bookmarkedItems');

        const fetchUserBookmarks = async () => {
            const { data = [] } = await getBookmarks(token, accessToken);

            const bookmarks = data.map(
                ({ bookmarkTypeId, bookmarkId, bookmarkGroup }) => ({
                    bookmarkTypeId,
                    bookmarkId,
                    bookmarkGroup
                })
            );
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
