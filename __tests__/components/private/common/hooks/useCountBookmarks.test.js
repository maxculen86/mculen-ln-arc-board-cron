import 'regenerator-runtime/runtime';
import env from '../../../../../__mocks__/fusion:environment';
import React from 'react';
import useCountBookmarks from '../../../../../components/private/common/hooks/bookmark/useCountBookmarks';

describe('Private - Common - Hooks - Bookmark - useCountBookmarks', () => {
    const setData = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([null, setData]);
    React.useEffect = jest.fn().mockImplementation(f => f());
    React.useCallback = jest.fn().mockImplementation(f => f);

    const termicaBookmark = true;
    const token = 'D5A09D56-8E4B-4BED-AD7E-65B73EBC8DF3';
    const isSuscriber = true;

    global.fetch = jest.fn();
    fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: () => ({
            bookmarkCount: 4
        })
    });

    afterEach(() => {
        setData.mockClear();
        fetch.mockClear();
    });

    it('Should return null when termicaBookmark is closed', () => {
        const termicaBookmark = false;
        const { bookmarkCount } = useCountBookmarks(
            termicaBookmark,
            token,
            isSuscriber
        );
        expect(bookmarkCount).toBe(null);
        expect(fetch).not.toBeCalled();
    });
    it('Should return null when there is no token', () => {
        const token = null;
        const { bookmarkCount } = useCountBookmarks(
            termicaBookmark,
            token,
            isSuscriber
        );
        expect(bookmarkCount).toBe(null);
        expect(fetch).not.toBeCalled();
    });
    it('Should return null when user is not suscriber', () => {
        const isSuscriber = false;
        const { bookmarkCount } = useCountBookmarks(
            termicaBookmark,
            token,
            isSuscriber
        );
        expect(bookmarkCount).toBe(null);
        expect(fetch).not.toBeCalled();
    });
    it('Should call fetch correctly when called with all necesary parameters', () => {
        const { bookmarkCount } = useCountBookmarks(
            termicaBookmark,
            token,
            isSuscriber
        );
        expect(fetch).toBeCalledWith(
            `https://api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/bookmarks-count`,
            {
                headers: {
                    Authorization: token
                },
                method: 'GET'
            }
        );
    });
});
