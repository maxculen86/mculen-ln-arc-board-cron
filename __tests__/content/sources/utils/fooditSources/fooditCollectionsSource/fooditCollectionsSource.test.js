import contentSource from '../../../../../../content/sources/fooditCollectionsSource';
import logger from '../../../../../../components/private/common/utils/logger';
import {
    resolve,
    transform
} from '../../../../../../content/sources/utils/fooditSources/fooditCollectionsSource/helper';

jest.mock('../../../../../../components/private/common/utils/logger');
jest.mock(
    '../../../../../../content/sources/utils/fooditSources/fooditCollectionsSource/helper'
);
jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.example.com',
    ARC_ACCESS_TOKEN: 'test-token-123'
}));

describe('Content - Sources - fooditCollectionsSource', () => {
    let fetchMock;
    let mockAbortController;
    let mockAbort;

    const { fetch } = contentSource;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        mockAbort = jest.fn();
        mockAbortController = {
            abort: mockAbort,
            signal: { aborted: false }
        };
        global.AbortController = jest.fn(() => mockAbortController);

        fetchMock = jest.fn();
        global.fetch = fetchMock;

        logger.push = jest.fn();

        resolve.mockReturnValue('/api/collections/123');
        transform.mockImplementation(data => data);
    });

    afterEach(() => {
        jest.useRealTimers();
        delete global.fetch;
    });

    const defaultQuery = {
        url: '/collections/test',
        'arc-site': 'foodit',
        id: '123',
        size: '10',
        from: '0'
    };

    describe('fetch method', () => {
        it('should fetch data successfully', async () => {
            const mockData = { items: [{ id: 1 }, { id: 2 }] };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            };
            fetchMock.mockResolvedValue(mockResponse);

            const result = await fetch(defaultQuery);

            expect(resolve).toHaveBeenCalledWith(defaultQuery);
            expect(fetchMock).toHaveBeenCalledWith(
                'https://api.example.com/api/collections/123',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer test-token-123'
                    },
                    signal: mockAbortController.signal
                }
            );
            expect(transform).toHaveBeenCalledWith(
                mockData,
                defaultQuery,
                undefined
            );
            expect(result).toEqual(mockData);
        });

        it('should call transform with cachedCall parameter', async () => {
            const mockData = { items: [] };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            };
            fetchMock.mockResolvedValue(mockResponse);

            const cachedCall = { someCache: 'data' };
            await fetch(defaultQuery, { cachedCall });

            expect(transform).toHaveBeenCalledWith(
                mockData,
                defaultQuery,
                cachedCall
            );
        });

        it('should handle HTTP error responses', async () => {
            const mockResponse = {
                ok: false,
                status: 404,
                statusText: 'Not Found'
            };
            fetchMock.mockResolvedValue(mockResponse);

            const result = await fetch(defaultQuery);

            expect(logger.push).toHaveBeenCalledWith(
                expect.any(Error),
                {
                    source: 'content/source/fooditCollectionSource',
                    url: '/collections/test'
                },
                'foodit'
            );
            expect(result).toEqual({});
        });

        it('should handle network errors', async () => {
            const networkError = new Error('Network failure');
            fetchMock.mockRejectedValue(networkError);

            const result = await fetch(defaultQuery);

            expect(logger.push).toHaveBeenCalledWith(
                networkError,
                {
                    source: 'content/source/fooditCollectionSource',
                    url: '/collections/test'
                },
                'foodit'
            );
            expect(result).toEqual({});
        });

        it('should clear timeout after successful request', async () => {
            const mockData = { items: [] };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            };
            fetchMock.mockResolvedValue(mockResponse);

            await fetch(defaultQuery);

            expect(jest.getTimerCount()).toBe(0);
        });

        it('should clear timeout after failed request', async () => {
            const networkError = new Error('Network failure');
            fetchMock.mockRejectedValue(networkError);

            await fetch(defaultQuery);

            expect(jest.getTimerCount()).toBe(0);
        });

        it('should handle missing url in query', async () => {
            const queryWithoutUrl = {
                'arc-site': 'foodit',
                id: '123'
            };
            const mockData = { items: [] };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            };
            fetchMock.mockResolvedValue(mockResponse);

            await fetch(queryWithoutUrl);

            expect(logger.push).not.toHaveBeenCalled();
        });

        it('should handle JSON parsing errors', async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
            };
            fetchMock.mockResolvedValue(mockResponse);

            const result = await fetch(defaultQuery);

            expect(logger.push).toHaveBeenCalledWith(
                expect.any(Error),
                {
                    source: 'content/source/fooditCollectionSource',
                    url: '/collections/test'
                },
                'foodit'
            );
            expect(result).toEqual({});
        });
    });

    describe('Authorization header', () => {
        it('should include Authorization header when ARC_ACCESS_TOKEN is present', async () => {
            const mockData = { items: [] };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            };
            fetchMock.mockResolvedValue(mockResponse);

            await fetch(defaultQuery);

            expect(fetchMock).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer test-token-123'
                    })
                })
            );
        });
    });

    describe('Edge cases', () => {
        it('should handle empty response data', async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({})
            };
            fetchMock.mockResolvedValue(mockResponse);

            const result = await fetch(defaultQuery);

            expect(result).toBeDefined();
            expect(transform).toHaveBeenCalled();
        });

        it('should handle undefined cachedCall gracefully', async () => {
            const mockData = { items: [] };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            };
            fetchMock.mockResolvedValue(mockResponse);

            const result = await fetch(defaultQuery, {
                cachedCall: undefined
            });

            expect(result).toBeDefined();
            expect(transform).toHaveBeenCalledWith(
                mockData,
                defaultQuery,
                undefined
            );
        });

        it('should work without cachedCall parameter', async () => {
            const mockData = { items: [] };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            };
            fetchMock.mockResolvedValue(mockResponse);

            const result = await fetch(defaultQuery);

            expect(result).toBeDefined();
            expect(transform).toHaveBeenCalled();
        });
    });
});
