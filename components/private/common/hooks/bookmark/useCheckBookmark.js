import { PERSONALIZACION_APIV2 } from 'fusion:environment';
import { useState, useEffect, useCallback } from 'react';

export default function useCheckBookmark(
    termicaBookmark,
    token,
    accessToken,
    noteId,
    isSuscriber
) {
    const [data, setData] = useState('');

    const getDataFromAPI = useCallback(async () => {
        try {
            if (accessToken && token) {
                const res = await fetch(
                    `${PERSONALIZACION_APIV2}bookmarks-type/story/${noteId}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: accessToken,
                            'X-Token': token
                        }
                    }
                );

                if (res.ok) {
                    const datos = await res.json();
                    const { bookmarkId = '' } = datos;
                    setData(bookmarkId);
                }
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    }, [token, noteId]);
    useEffect(() => {
        if (token && noteId && termicaBookmark && isSuscriber) {
            getDataFromAPI();
        }
    }, [token, noteId, termicaBookmark, getDataFromAPI, isSuscriber]);

    return data;
}
