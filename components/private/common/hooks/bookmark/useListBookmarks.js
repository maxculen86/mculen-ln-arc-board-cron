import { PERSONALIZACION_API } from 'fusion:environment';
import { useState, useEffect, useCallback } from 'react';
import trasformBookmarkContent from '../../utils/bookmark/trasformBookmarkContent';

export default function useListBookmarks(termicaBookmark, token, isSuscriber) {
    const [bookmarks, setBookmarks] = useState([]);
    const [meta, setMeta] = useState(false);
    const [loading, setLoading] = useState(true);
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
                const transformedData = trasformBookmarkContent(data);
                setBookmarks([...bookmarks, ...transformedData]);
                setMeta(metadata);
                setLoading(false);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    }, [token, bookmarks, paginationQuery]);

    const deleteArticle = id => {
        const newListBookmarks = bookmarks.filter(
            ({ bookmarkId = '' }) => bookmarkId !== id
        );
        setBookmarks(newListBookmarks);
    };

    useEffect(() => {
        if (token && termicaBookmark && isSuscriber) {
            getDataFromAPI();
        } else {
            setBookmarks([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, termicaBookmark, isSuscriber]);

    return {
        bookmarks,
        loading,
        deleteArticle,
        morePages: meta && meta.nextKeyPK !== null,
        getNextPage: getDataFromAPI
    };
}
