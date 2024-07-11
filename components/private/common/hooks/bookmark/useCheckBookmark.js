import { PERSONALIZACION_APIV2 } from 'fusion:environment';
import { useState, useEffect, useCallback } from 'react';
import { authManager } from '../../../../../auth/helper/loginHelper';

export default function useCheckBookmark(termicaBookmark, noteId, isSuscriber) {
    const [data, setData] = useState('');

    const getDataFromAPI = useCallback(
        async ({ accessToken, token } = {}) => {
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
        },
        [noteId]
    );
    useEffect(() => {
        if (noteId && termicaBookmark && isSuscriber) {
            authManager(getDataFromAPI);
        }
    }, [noteId, termicaBookmark, getDataFromAPI, isSuscriber]);

    return data;
}
