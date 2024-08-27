import { PERSONALIZACION_APIV2 } from 'fusion:environment';
import { useState, useEffect, useCallback } from 'react';
import trasformBookmarkContent from '../../utils/bookmark/trasformBookmarkContent';

export default function useListBookmarks({
    termicaBookmark,
    subscription,
    token,
    accessToken
} = {}) {
    const [bookmarks, setBookmarks] = useState([]);
    const [meta, setMeta] = useState(false);
    const [loading, setLoading] = useState(true);
    const paginationQuery = meta
        ? `&nextKeyPK=${meta.nextKeyPK}&nextKeySK=${meta.nextKeySK}`
        : '';

    const getDataFromAPI = useCallback(async () => {
        try {
            if (accessToken && token) {
                const res = await fetch(
                    `${PERSONALIZACION_APIV2}bookmarks?size=30${paginationQuery}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: accessToken,
                            'X-Token': token
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
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    }, [bookmarks, paginationQuery, token, accessToken]);

    const deleteArticle = id => {
        const newListBookmarks = bookmarks.filter(
            ({ bookmarkId = '' }) => bookmarkId !== id
        );
        setBookmarks(newListBookmarks);
    };

    useEffect(() => {
        if (termicaBookmark && subscription) {
            getDataFromAPI();
        }

        if (!subscription) {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, accessToken, termicaBookmark, subscription]);

    return {
        bookmarks,
        loading,
        deleteArticle,
        morePages: meta && meta.nextKeyPK !== null,
        getNextPage: getDataFromAPI
    };
}
