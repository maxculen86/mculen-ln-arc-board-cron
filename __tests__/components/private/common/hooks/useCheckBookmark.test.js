import 'regenerator-runtime/runtime';
import env from '../../../../../__mocks__/fusion:environment';
import React from 'react';
import useCheckBookmark from '../../../../../components/private/common/hooks/bookmark/useCheckBookmark';
import { authManager } from '../../../../../auth/helper/loginHelper';

jest.mock('../../../../../auth/helper/loginHelper');

describe('Private - Common - Hooks - Bookmark - useCheckBookmark', () => {
    const setData = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([false, setData]);
    React.useEffect = jest.fn().mockImplementation(f => f());
    React.useCallback = jest.fn().mockImplementation(f => f);
    window.LN = {
        observable: {
            publish: jest.fn(),
            subscribe: jest.fn((event, callback) => {
                if (event === 'statusRotationAuth') {
                    callback({ isFinished: true });
                }
            })
        }
    };

    const termicaBookmark = true;
    const id = '53EATJZRNRF7XBWU76XLHLTURI';
    const bookmarkId = '722cd2ae-3917-48f5-8c1d-775ab46a27fe';
    const isSuscriber = true;

    global.fetch = jest.fn();
    fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
            bookmarkId
        })
    });

    afterEach(() => {
        setData.mockClear();
        fetch.mockClear();
        authManager.mockImplementation(callback =>
            callback({ accessToken: 'mock-access-token', token: 'mock-token' })
        );
    });

    it('Should return null when termicaBookmark is closed', () => {
        const termicaBookmark = false;
        expect(useCheckBookmark(termicaBookmark, id, isSuscriber)).toBe(false);
        expect(fetch).not.toBeCalled();
    });
    it('Should return null when there is no token', () => {
        expect(useCheckBookmark(termicaBookmark, id, false)).toBe(false);
        expect(fetch).not.toBeCalled();
    });
    it('Should return null when there is no noteId', () => {
        const id = '';
        expect(useCheckBookmark(termicaBookmark, id, isSuscriber)).toBe(false);
        expect(fetch).not.toBeCalled();
    });
    it('Should call fetch correctly and return bookmarkId when note is saved', async () => {
        useCheckBookmark(termicaBookmark, id, isSuscriber);
        expect(fetch).toBeCalledWith(
            `https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/bookmarks-type/story/${id}`,
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
