import { useEffect, useState } from 'react';
import { getTypeOfDevice } from '@ln/hooks';
import getToken from '../../../../../private/common/utils/getToken';
import getBookmarks from '../../bookmark/api/getBookmarks';
import { isFooditSuscriptor } from '../../../hooks/useGetUserData';

export const useShoppingList = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        const fetchUserBookmarks = async () => {
            const { data = [] } = await getBookmarks('ingredientList');

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

        if (isFooditSuscriptor(getToken('ProductoPremiumId')))
            fetchUserBookmarks();
    }, []);

    return {
        loading,
        shoppingList,
        setShoppingList,
        isMobile
    };
};
