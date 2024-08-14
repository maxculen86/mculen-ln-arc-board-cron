import 'regenerator-runtime/runtime';
import env from '../../../../../__mocks__/fusion:environment';
import { act } from 'react-dom/test-utils';
import React from 'react';
import useCountBookmarks from '../../../../../components/private/common/hooks/bookmark/useCountBookmarks';
import useAuthManager from '../../../../../auth/hooks/useAuthManager';

jest.mock('../../../../../auth/helper/loginHelper');

jest.mock('../../../../../auth/hooks/useAuthManager');

describe('Private - Common - Hooks - Bookmark - useCountBookmarks', () => {
    const setData = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([null, setData]);
    React.useEffect = jest.fn().mockImplementation(f => f());
    React.useCallback = jest.fn().mockImplementation(f => f);
    beforeEach(() => {
        jest.clearAllMocks();
        useAuthManager.mockImplementation(() => ({
            token: 'mock-tooken',
            accessToken: 'Bearer mock-access-token'
        }));
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
        useAuthManager.mockImplementation(() => ({
            token: undefined,
            accessToken: 'mock-access-token'
        }));
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
    it('Should call fetch correctly when called with all necesary parameters', async () => {
        await act(async () => {
            useCountBookmarks(termicaBookmark, isSuscriber);
        });
        expect(fetch).toBeCalledWith(
            `https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/bookmarks-count`,
            {
                headers: {
                    Authorization: 'Bearer mock-access-token',
                    'X-Token': 'mock-tooken'
                },
                method: 'GET'
            }
        );
    });
});
