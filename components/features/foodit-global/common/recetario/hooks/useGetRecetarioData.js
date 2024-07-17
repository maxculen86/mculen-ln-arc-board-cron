import { useLayoutEffect, useState } from 'react';

import getToken from '../../../../../private/common/utils/getToken';
import getBookmarks from '../../bookmark/api/getBookmarks';
import { isFooditSuscriptor } from '../../../hooks/useGetUserData';

const useGetRecetarioData = () => {
    const [loading, setLoading] = useState(true);
    const [userBookmarks, setUserBookmarks] = useState([]);

    useLayoutEffect(() => {
        const fetchBookmarks = async () => {
            try {
                if (isFooditSuscriptor(getToken('ProductoPremiumId'))) {
                    const { data = [] } = await getBookmarks();
                    setUserBookmarks(data);
                }
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, []);

    return {
        loading,
        userBookmarks,
        setUserBookmarks
    };
};

export default useGetRecetarioData;
