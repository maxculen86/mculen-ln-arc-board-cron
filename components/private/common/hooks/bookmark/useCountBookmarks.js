import { PERSONALIZACION_API } from 'fusion:environment';
import { useState, useEffect, useCallback } from 'react';

export default function useCountBookmarks(termicaBookmark, token, isSuscriber) {
    const [data, setData] = useState(null);

    const getDataFromAPI = useCallback(async () => {
        try {
            const res = await fetch(`${PERSONALIZACION_API}bookmarks-count`, {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            });

            if (res.ok) {
                const datos = await res.json();
                const { bookmarkCount = 0 } = datos;
                setData(bookmarkCount);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    }, [token]);
    useEffect(() => {
        if (token && termicaBookmark && isSuscriber) {
            getDataFromAPI();
        }
    }, [token, termicaBookmark, isSuscriber, getDataFromAPI]);

    const substractOne = () => {
        setData(data - 1);
    };

    return {
        bookmarkCount: data,
        substractOne
    };
}
