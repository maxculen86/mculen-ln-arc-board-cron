import { useLayoutEffect, useState } from 'react';

import getBookmarks from '../../bookmark/api/getBookmarks';
import {
    authManager,
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../../auth/helper/loginHelper';

const useGetRecetarioData = () => {
    const [loading, setLoading] = useState(true);
    const [userBookmarks, setUserBookmarks] = useState([]);

    useLayoutEffect(() => {
        const fetchBookmarks = async ({ accessToken, token } = {}) => {
            try {
                if (isSubscribed(SUBSCRIBED_HELPER.FOODIT)) {
                    const { data = [] } = await getBookmarks(
                        accessToken,
                        token
                    );
                    setUserBookmarks(data);
                }
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            } finally {
                setLoading(false);
            }
        };

        authManager(fetchBookmarks);
    }, []);

    return {
        loading,
        userBookmarks,
        setUserBookmarks
    };
};

export default useGetRecetarioData;
