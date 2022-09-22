import React from 'react';
import useFetch from '../../../../../components/private/common/hooks/useFetch';

describe('hook - useFetch', () => {
    const setData = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([false, setData]);
    React.useEffect = jest.fn().mockImplementation(f => f());
    React.useCallback = jest.fn().mockImplementation(f => f);
    const url =
        'https://qa-audionews.lanacion.com.ar/mp3/22/9/08/A/20220908205601/UK57ZJT3DJGPRFTACPR7KTFUWA/';

    global.fetch = jest.fn();
    fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
            audio_url:
                'https://qa-audionews.lanacion.com.ar/mp3/22/9/08/A/20220908205601-UK57ZJT3DJGPRFTACPR7KTFUWA.1aa42b0e-c9e7-49e2-b561-f6a1243679d1.mp3'
        })
    });

    afterEach(() => {
        setData.mockClear();
        fetch.mockClear();
    });

    it('Should return null when termicaBookmark is closed', () => {
        const url = null;
        expect(useFetch({ url })).toStrictEqual({
            data: false,
            error: false,
            loading: false
        });
        expect(fetch).not.toBeCalled();
    });
});
