import React, { useEffect } from 'react';

import getBookmarks from '../api/getBookmarks';
import { fillBookmarks } from '../iconHelper';
import getToken from '../../../../../private/common/utils/getToken';
import { isFooditSuscriptor } from '../../../hooks/useGetUserData';

export const UserBookmarks = () => {
    useEffect(() => {
        localStorage.removeItem('bookmarkFolders');
        localStorage.removeItem('bookmarkItems');

        const fetchUserBookmarks = async () => {
            const { data = [] } = await getBookmarks();

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

        const premiumProduct = getToken('ProductoPremiumId');
        isFooditSuscriptor(premiumProduct) && fetchUserBookmarks();
    }, []);

    return <></>;
};
