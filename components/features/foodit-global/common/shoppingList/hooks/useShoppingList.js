import { useEffect, useState } from 'react';
import { getTypeOfDevice } from '@ln/hooks';
import getBookmarks from '../../bookmark/api/getBookmarks';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../../auth/helper/loginHelper';
import useAuthManager from '../../../../../../auth/hooks/useAuthManager';

export const useShoppingList = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shoppingList, setShoppingList] = useState([]);
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        const fetchUserBookmarks = async () => {
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
            setLoading(false);
        };

        setIsMobile(getTypeOfDevice({ breakpoints: { sm: 768 } }) === 'mobile');

        const isValidSubsribed = isSubscribed(SUBSCRIBED_HELPER.FOODIT);

        if (isValidSubsribed && token && accessToken) {
            fetchUserBookmarks();
        }

        if (!isValidSubsribed) {
            setLoading(false);
        }
    }, [token, accessToken]);

    return {
        loading,
        shoppingList,
        setShoppingList,
        isMobile
    };
};
