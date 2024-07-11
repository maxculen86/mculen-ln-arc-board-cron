import 'regenerator-runtime/runtime';
import env from '../../../../../__mocks__/fusion:environment';
import React from 'react';
import useCountBookmarks from '../../../../../components/private/common/hooks/bookmark/useCountBookmarks';
import { authManager } from '../../../../../auth/helper/loginHelper';

jest.mock('../../../../../auth/helper/loginHelper');

describe('Private - Common - Hooks - Bookmark - useCountBookmarks', () => {
    const setData = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([null, setData]);
    React.useEffect = jest.fn().mockImplementation(f => f());
    React.useCallback = jest.fn().mockImplementation(f => f);
    beforeEach(() => {
        jest.clearAllMocks();
        authManager.mockImplementation(callback =>
            callback({ accessToken: 'mock-access-token', token: 'mock-token' })
        );
    });

    const termicaBookmark = true;
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
            isSuscriber
        );
        expect(bookmarkCount).toBe(null);
        expect(fetch).not.toBeCalled();
    });
    it('Should return null when there is no token', () => {
        authManager.mockImplementation(callback =>
            callback({ accessToken: 'mock-access-token', token: undefined })
        );
        const { bookmarkCount } = useCountBookmarks(
            termicaBookmark,
            isSuscriber
        );
        expect(bookmarkCount).toBe(null);
        expect(fetch).not.toBeCalled();
    });
    it('Should return null when user is not suscriber', () => {
        const isSuscriber = false;
        const { bookmarkCount } = useCountBookmarks(
            termicaBookmark,
            isSuscriber
        );
        expect(bookmarkCount).toBe(null);
        expect(fetch).not.toBeCalled();
    });
    it('Should call fetch correctly when called with all necesary parameters', () => {
        useCountBookmarks(termicaBookmark, isSuscriber);
        expect(fetch).toBeCalledWith(
            `https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/bookmarks-count`,
            {
                headers: {
                    Authorization: 'mock-access-token',
                    'X-Token': 'mock-token'
                },
                method: 'GET'
            }
        );
    });
});
