import { useEffect, useState } from 'react';
import getBookmarks from '../../bookmark/api/getBookmarks';
import useAuthManager from '../../../../../private/common/auth/hooks/useAuthManager';

export const useGetWeeklyMenu = subscription => {
    const [loading, setLoading] = useState(true);
    const [weeklyMenu, setWeeklyMenu] = useState([]);
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        const fetchUserBookmarks = async () => {
            try {
                const { data = [] } = await getBookmarks(
                    token,
                    accessToken,
                    'weeklyMenu'
                );

                setWeeklyMenu(data);
            } catch (error) {
                console.error('Error fetching bookmarks type weekly menu');
            } finally {
                setLoading(false);
            }
        };

        if (subscription && accessToken && token) {
            fetchUserBookmarks();
        }
    }, [token, accessToken]);

    return {
        loading,
        weeklyMenu,
        setWeeklyMenu
    };
};
