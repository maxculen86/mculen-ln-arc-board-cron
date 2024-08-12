import 'regenerator-runtime/runtime';
import env from '../../../../../__mocks__/fusion:environment';
import { act } from 'react-dom/test-utils';
import React from 'react';
import useListBookmarks from '../../../../../components/private/common/hooks/bookmark/useListBookmarks';
import useAuthManager from '../../../../../auth/hooks/useAuthManager';

jest.mock('../../../../../auth/hooks/useAuthManager');
jest.mock('../../../../../auth/helper/loginHelper', () => ({
    getAuthFromCookie: jest.fn()
}));

describe('Private - Common - Hooks - Bookmark - useListBookmarks', () => {
    const setBookmarks = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([null, setBookmarks]);
    React.useEffect = jest.fn().mockImplementation(f => f());
    React.useCallback = jest.fn().mockImplementation(f => f);

    const termicaBookmark = true;
    const isSuscriber = true;

    global.fetch = jest.fn();
    fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
            data: [1, 2, 3],
            metadata: {
                size: 3,
                nextKeyPK: '582f263c-be28-480b-a534-a511cc652c80',
                nextKeySK: 1652808573178
            }
        })
    });

    afterEach(() => {
        setBookmarks.mockClear();
        fetch.mockClear();
    });

    it('Should not fetch when termicaBookmark is closed', () => {
        useAuthManager.mockImplementation(() => ({
            token: 'mock-tooken',
            accessToken: 'Bearer mock-access-token'
        }));
        const data = useListBookmarks(false, isSuscriber);
        expect(data).toBeDefined();
        expect(fetch).not.toBeCalled();
    });
    it('Should not fetch when there is no token', () => {
        useAuthManager.mockImplementation(() => ({
            token: null,
            accessToken: 'Bearer mock-access-token'
        }));
        const data = useListBookmarks(termicaBookmark, false);
        expect(data).toBeDefined();
        expect(fetch).not.toBeCalled();
    });
    it('Should call fetch correctly and return bookmarks when called with termica and token', async () => {
        let data;

        useAuthManager.mockImplementation(() => ({
            token: 'mock-tooken',
            accessToken: 'Bearer mock-access-token'
        }));

        await act(async () => {
            data = useListBookmarks(termicaBookmark, isSuscriber);
        });

        expect(data).toBeDefined();
        expect(fetch).toBeCalledWith(
            `https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/bookmarks?size=30`,
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
