import 'regenerator-runtime/runtime';
import React, { useState, useEffect, useCallback } from 'react';
import useListBookmarks from '../../../../../components/private/common/hooks/bookmark/useListBookmarks';

describe('Private - Common - Hooks - Bookmark - useListBookmarks', () => {
    const setBookmarks = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([null, setBookmarks]);
    const setMeta = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([null, setMeta]);
    React.useEffect = jest.fn().mockImplementation(f => f());
    React.useCallback = jest.fn().mockImplementation(f => f);

    const termicaBookmark = true;
    const token = 'D5A09D56-8E4B-4BED-AD7E-65B73EBC8DF3';
    const bookmarkId = '722cd2ae-3917-48f5-8c1d-775ab46a27fe';

    global.fetch = jest.fn();
    fetch
        // .mockImplementationOnce(() => Promise.reject('API is down'))
        .mockImplementation(() =>
            Promise.resolve({
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
            })
        );

    afterEach(() => {
        setBookmarks.mockClear();
        fetch.mockClear();
    });

    it('Should not fetch when termicaBookmark is closed', () => {
        const data = useListBookmarks(false, token);
        expect(data).toBeDefined();
        expect(fetch).not.toBeCalled();
    });
    it('Should not fetch when there is no token', () => {
        const data = useListBookmarks(termicaBookmark, null);
        expect(data).toBeDefined();
        expect(fetch).not.toBeCalled();
    });
    it('Should call fetch correctly and return bookmarks when called with termica and token', () => {
        const data = useListBookmarks(termicaBookmark, token);
        const { bookmarks, morePages, getNextPage } = data || {};
        expect(data).toBeDefined();
        // expect(bookmarks).toBe([]);
        expect(fetch).toBeCalledWith(
            `https://api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/bookmarks?size=30`,
            {
                headers: {
                    Authorization: token
                },
                method: 'GET'
            }
        );
    });
    // it('Should fetch next page with getNextPage method', () => {
    //     const data = useListBookmarks(termicaBookmark, token);
    //     const { getNextPage } = data || {};
    //     expect(data).toBeDefined();
    //     getNextPage();
    //     expect(fetch).toBeCalledTimes(1);
    //     expect(fetch).toBeCalledWith(
    //         `https://api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/bookmarks?size=30&nextKeyPK=undefined&nextKeySK=undefined`,
    //         {
    //             headers: {
    //                 Authorization: token
    //             },
    //             method: 'GET'
    //         }
    //     );
    // });
});
