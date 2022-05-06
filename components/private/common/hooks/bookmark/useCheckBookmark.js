import { useState, useEffect, useCallback } from 'react';
import { baseUrl } from '../../utils/bookmarkHelper';

export default function useCheckBookmark(termicaBookmark, token, noteId) {
    const [data, setData] = useState(false);

    const getDataFromAPI = useCallback(async () => {
        try {
            const res = await fetch(
                `${baseUrl()}/bookmarks-type/story/${noteId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    }
                }
            );
            if (res.ok) {
                const datos = await res.json();
                const { bookmarkId = false } = datos;
                setData(bookmarkId);
            } else {
                setData(false);
            }
        } catch (err) {
            console.log(err);
        }
    }, [token, noteId]);
    useEffect(() => {
        if (
            !token ||
            !noteId ||
            typeof window === 'undefined' ||
            !termicaBookmark
        ) {
            setData(false);
        } else {
            getDataFromAPI();
        }
    }, [token, noteId, termicaBookmark, getDataFromAPI]);

    return data;
}
