import { PERSONALIZACION_APIV2 } from 'fusion:environment';
import { useState, useEffect, useCallback } from 'react';
import { authManager } from '../../../../../auth/helper/loginHelper';

export default function useCountBookmarks(termicaBookmark, isSuscriber) {
    const [data, setData] = useState(null);

    const getDataFromAPI = useCallback(async ({ accessToken, token } = {}) => {
        try {
            if (accessToken && token) {
                const res = await fetch(
                    `${PERSONALIZACION_APIV2}bookmarks-count`,
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
                    const { bookmarkCount = 0 } = datos;
                    setData(bookmarkCount);
                }
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    }, []);
    useEffect(() => {
        if (termicaBookmark && isSuscriber) {
            authManager(getDataFromAPI);
        }
    }, [termicaBookmark, isSuscriber, getDataFromAPI]);

    const substractOne = () => {
        setData(data - 1);
    };

    return {
        bookmarkCount: data,
        substractOne
    };
}
