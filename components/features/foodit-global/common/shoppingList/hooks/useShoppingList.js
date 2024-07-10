import { useEffect, useState } from 'react';
import { getTypeOfDevice } from '@ln/hooks';
import getBookmarks from '../../bookmark/api/getBookmarks';
import {
    authManager,
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../../auth/helper/loginHelper';

export const useShoppingList = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        const fetchUserBookmarks = async ({ accessToken, token } = {}) => {
            const { data = [] } = await getBookmarks(
                accessToken,
                token,
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
            setLoading(false);
        };

        const isMobile =
            getTypeOfDevice({ breakpoints: { sm: 768 } }) === 'mobile';

        setIsMobile(isMobile);

        if (isSubscribed(SUBSCRIBED_HELPER.FOODIT)) {
            authManager(fetchUserBookmarks);
        } else {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        shoppingList,
        setShoppingList,
        isMobile
    };
};
