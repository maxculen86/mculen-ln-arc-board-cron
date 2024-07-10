import React, { useEffect } from 'react';
import getBookmarks from '../api/getBookmarks';
import { fillBookmarks } from '../iconHelper';
import {
    isSubscribed,
    SUBSCRIBED_HELPER,
    authManager
} from '../../../../../../auth/helper/loginHelper';

export const UserBookmarks = () => {
    useEffect(() => {
        localStorage.removeItem('bookmarkFolders');
        localStorage.removeItem('bookmarkedItems');

        const fetchUserBookmarks = async ({ accessToken, token }) => {
            const { data = [] } = await getBookmarks(accessToken, token);

            const bookmarks = data.map(({ bookmarkTypeId, bookmarkId }) => {
                return { bookmarkTypeId, bookmarkId };
            });
            localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarks));

            if (bookmarks.length) {
                fillBookmarks(
                    bookmarks.map(bookmarks => bookmarks.bookmarkTypeId)
                );
            }
        };

        if (isSubscribed(SUBSCRIBED_HELPER.FOODIT))
            authManager(fetchUserBookmarks);
    }, []);

    return <></>;
};
