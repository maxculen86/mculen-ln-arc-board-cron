import 'regenerator-runtime/runtime';
import env from '../../../../../__mocks__/fusion:environment';
import React, { useState, useEffect, useCallback } from 'react';
import useCheckBookmark from '../../../../../components/private/common/hooks/bookmark/useCheckBookmark';

describe('Private - Common - Hooks - Bookmark - useCheckBookmark', () => {
    const setData = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([false, setData]);
    React.useEffect = jest.fn().mockImplementation(f => f());
    React.useCallback = jest.fn().mockImplementation(f => f);

    const termicaBookmark = true;
    const token = 'D5A09D56-8E4B-4BED-AD7E-65B73EBC8DF3';
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
    });

    it('Should return null when termicaBookmark is closed', () => {
        const termicaBookmark = false;
        expect(useCheckBookmark(termicaBookmark, token, id, isSuscriber)).toBe(
            false
        );
        expect(fetch).not.toBeCalled();
    });
    it('Should return null when there is no token', () => {
        const token = null;
        expect(useCheckBookmark(termicaBookmark, token, id, false)).toBe(false);
        expect(fetch).not.toBeCalled();
    });
    it('Should return null when there is no noteId', () => {
        const id = '';
        expect(useCheckBookmark(termicaBookmark, token, id, isSuscriber)).toBe(
            false
        );
        expect(fetch).not.toBeCalled();
    });
    it('Should call fetch correctly and return bookmarkId when note is saved', async () => {
        useCheckBookmark(termicaBookmark, token, id, isSuscriber);
        expect(fetch).toBeCalledWith(
            `https://api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/bookmarks-type/story/${id}`,
            {
                headers: {
                    Authorization: token
                },
                method: 'GET'
            }
        );
    });
});
