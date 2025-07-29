import { useEffect, useState } from 'react';

import getBookmarks from '../../bookmark/api/getBookmarks';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../private/common/auth/helper/loginHelper';
import useAuthManager from '../../../../../private/common/auth/hooks/useAuthManager';

const useGetRecetarioData = () => {
    const [loading, setLoading] = useState(true);
    const [userBookmarks, setUserBookmarks] = useState([]);
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const { data = [] } = await getBookmarks(token, accessToken);
                setUserBookmarks(data);
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            } finally {
                setLoading(false);
            }
        };

        const isValidSubsribed = isSubscribed(SUBSCRIBED_HELPER.FOODIT);

        if (isValidSubsribed && accessToken && token) {
            fetchBookmarks();
        }

        if (!isValidSubsribed) {
            setLoading(false);
        }
    }, [token, accessToken]);

    return {
        loading,
        userBookmarks,
        setUserBookmarks
    };
};

export default useGetRecetarioData;
