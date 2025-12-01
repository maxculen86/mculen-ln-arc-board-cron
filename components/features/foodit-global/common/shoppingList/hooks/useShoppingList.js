import { useState, useCallback, useEffect } from 'react';
import { getTypeOfDevicev2 } from '@ln/utils';
import getBookmarks from '../../bookmark/api/getBookmarks';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../private/common/auth/helper/loginHelper';
import useAuthManager from '../../../../../private/common/auth/hooks/useAuthManager';

export const useShoppingList = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shoppingList, setShoppingList] = useState([]);
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        if (getTypeOfDevicev2({ breakpoints: { sm: 768 } }) === 'mobile') {
            setIsMobile(true);
        }
    }, []);

    const fetchUserBookmarks = useCallback(async () => {
        try {
            setLoading(true);
            const { data = [] } = await getBookmarks(
                token,
                accessToken,
                'ingredientList'
            );

            setShoppingList(
                data.reduce(
                    (acc, list) =>
                        list.bookmarkContent
                            ? [
                                  ...acc,
                                  {
                                      ...list.bookmarkContent,
                                      bookmarkId: list.bookmarkId
                                  }
                              ]
                            : acc,
                    []
                )
            );
        } catch (error) {
            console.error('Error fetching bookmarks type shopping list');
        } finally {
            setLoading(false);
        }
    }, [token, accessToken]);

    useEffect(() => {
        const isValidSubscribed = isSubscribed(SUBSCRIBED_HELPER.FOODIT);

        if (isValidSubscribed && accessToken && token) {
            fetchUserBookmarks();
        }

        if (!isValidSubscribed) {
            setLoading(false);
        }
    }, [accessToken, token, fetchUserBookmarks]);

    return {
        loading,
        shoppingList,
        setShoppingList,
        isMobile
    };
};
