import { useState, useEffect, useCallback } from 'react';
import { baseUrl } from '../../utils/bookmarkHelper';

export default function useListBookmarks(termicaBookmark, token) {
    const [data, setData] = useState(false);

    const getDataFromAPI = useCallback(async () => {
        try {
            const res = await fetch(`${baseUrl()}/bookmarks?size=8`, {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            });
            if (res.ok) {
                const datos = await res.json();
                setData(datos);
            } else {
                setData(false);
            }
        } catch (err) {
            console.log(err);
        }
    }, [token]);
    useEffect(() => {
        if (!token || typeof window === 'undefined' || !termicaBookmark) {
            setData(false);
        } else {
            getDataFromAPI();
        }
    }, [token, termicaBookmark, getDataFromAPI]);

    return data;
}
