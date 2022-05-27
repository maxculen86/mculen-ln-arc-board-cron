import { PERSONALIZACION_API } from 'fusion:environment';
import { useState, useEffect, useCallback } from 'react';

export default function useListBookmarks(termicaBookmark, token) {
    const [bookmarks, setBookmarks] = useState([]);
    const [meta, setMeta] = useState(false);

    const paginationQuery = meta
        ? `&nextKeyPK=${meta.nextKeyPK}&nextKeySK=${meta.nextKeySK}`
        : '';

    const getDataFromAPI = useCallback(async () => {
        try {
            const res = await fetch(
                `${PERSONALIZACION_API}bookmarks?size=30${paginationQuery}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    }
                }
            );
            if (res.ok) {
                const response = await res.json();
                const { data, metadata } = response || {};
                // Transformar data acá! :D
                setBookmarks([...bookmarks, ...data]);
                setMeta(metadata);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    }, [token, bookmarks, paginationQuery]);

    useEffect(() => {
        if (!token || typeof window === 'undefined' || !termicaBookmark) {
            setBookmarks([]);
        } else {
            getDataFromAPI();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, termicaBookmark]);

    return {
        bookmarks,
        morePages: meta && meta.nextKeyPK !== null,
        getNextPage: getDataFromAPI
    };
}
