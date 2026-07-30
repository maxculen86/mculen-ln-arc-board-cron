import { renderHook, waitFor } from '@testing-library/react';
import { extractAperturaHomeArticles } from '../../../../../content/sources/utils/homeOpeningArticles/transform';
import useHomeOpeningArticlesClient from '../useHomeOpeningArticlesClient';

jest.mock(
    '../../../../../content/sources/utils/homeOpeningArticles/transform',
    () => ({
        extractAperturaHomeArticles: jest.fn()
    })
);

describe('useHomeOpeningArticlesClient', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    it('should return initial state with empty content elements when isAperturaHome is false', () => {
        const { result } = renderHook(() =>
            useHomeOpeningArticlesClient({ isAperturaHome: false })
        );

        expect(result.current).toEqual({ content_elements: [] });
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should handle fetch errors and return empty content elements', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() =>
            useHomeOpeningArticlesClient({ isAperturaHome: true })
        );

        await waitFor(() => {
            expect(result.current).toEqual({ content_elements: [] });
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should handle non-ok http responses and return empty content elements', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 500
        });

        const { result } = renderHook(() =>
            useHomeOpeningArticlesClient({ isAperturaHome: true })
        );

        await waitFor(() => {
            expect(result.current).toEqual({ content_elements: [] });
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should not update state if component is unmounted before fetch completes', async () => {
        let rejectFetch;
        const fetchPromise = new Promise((resolve, reject) => {
            rejectFetch = reject;
        });
        global.fetch.mockReturnValue(fetchPromise);

        const { result, unmount } = renderHook(() =>
            useHomeOpeningArticlesClient({ isAperturaHome: true })
        );

        unmount();
        rejectFetch(new Error('Cleanup'));

        await new Promise(resolve => setTimeout(resolve, 50));

        expect(result.current).toEqual({ content_elements: [] });
    });

    it('should fetch and return articles when isAperturaHome is true (and share promise for concurrent calls)', async () => {
        const mockResponse = { data: 'mocked-data' };
        const mockExtractedArticles = [{ _id: '1' }, { _id: '2' }];

        let resolveFetch;
        const fetchPromise = new Promise(resolve => {
            resolveFetch = () =>
                resolve({
                    ok: true,
                    json: jest.fn().mockResolvedValue(mockResponse)
                });
        });

        global.fetch.mockReturnValue(fetchPromise);
        extractAperturaHomeArticles.mockReturnValue(mockExtractedArticles);

        const { result: firstResult } = renderHook(() =>
            useHomeOpeningArticlesClient({ isAperturaHome: true })
        );
        const { result: secondResult } = renderHook(() =>
            useHomeOpeningArticlesClient({ isAperturaHome: true })
        );

        expect(firstResult.current).toEqual({ content_elements: [] });
        expect(secondResult.current).toEqual({ content_elements: [] });

        resolveFetch();

        await waitFor(() => {
            expect(firstResult.current).toEqual({
                content_elements: mockExtractedArticles
            });
            expect(secondResult.current).toEqual({
                content_elements: mockExtractedArticles
            });
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            '/?_website=la-nacion-ar&outputType=opening',
            { cache: 'no-store' }
        );
        expect(extractAperturaHomeArticles).toHaveBeenCalledWith(mockResponse);
    });

    it('should use cached content elements on subsequent calls and avoid new fetch', async () => {
        const { result } = renderHook(() =>
            useHomeOpeningArticlesClient({ isAperturaHome: true })
        );

        expect(result.current).toEqual({
            content_elements: [{ _id: '1' }, { _id: '2' }]
        });

        expect(global.fetch).not.toHaveBeenCalled();
    });
});
