import React, { useState, useEffect } from 'react';

import getBookmarks from '../api/getBookmarks';
import { fillBookmarks } from '../iconHelper';
import getToken from '../../../../../private/common/utils/getToken';

export const UserBookmarks = () => {
    const [userBookmarks, setUserBookmarks] = useState([]);

    if (userBookmarks.length)
        localStorage.setItem('bookmarkedItems', JSON.stringify(userBookmarks));

    useEffect(() => {
        const fetchUserBookmarks = async () => {
            const { data = [] } = await getBookmarks();

            const bookmarks = data.map(({ bookmarkTypeId, bookmarkId }) => {
                return { bookmarkTypeId, bookmarkId };
            });

            if (bookmarks.length) {
                fillBookmarks(
                    bookmarks.map(bookmarks => bookmarks.bookmarkTypeId)
                );
                setUserBookmarks(bookmarks);
            }
        };

        const premiumProduct = getToken('ProductoPremiumId');
        if (typeof premiumProduct === 'string' && premiumProduct.includes('2'))
            fetchUserBookmarks();
    }, []);

    return <></>;
};
