import {
    getCachedSegments,
    setCachedSegments,
    areCacheSegmentsValid,
    fetchUserSegments
} from '../../../../../../components/chains/LN10_Caja_Segmentada/common/api/helpers';

jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        getAuthTokens: jest.fn()
    })
);

jest.mock('fusion:environment', () => ({
    SEGMENTATION_API:
        'https://qrnsxguohj5bj3np6dwvc5xgue0wbmwh.lambda-url.us-east-1.on.aws/api/segmentacion/v1/segments/',
    SEGMENTATION_APIKEY: 'mytw1wdyqv4jc7h8s0w6pe3v7x99p3i5a12j'
}));

global.fetch = jest.fn();
global.AbortController = jest.fn(() => ({
    abort: jest.fn(),
    signal: {}
}));
global.setTimeout = jest.fn(() => 'timeout-id');
global.clearTimeout = jest.fn();

describe('LN10_Caja_Segmentada helpers', () => {
    let mockLocalStorage;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();

        mockLocalStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        };

        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
            writable: true
        });

        fetch.mockClear();

        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getCachedSegments', () => {
        it('should return cached segments when valid data exists', () => {
            const mockSegments = [1, 2, 3];
            const mockTimestamp = '2023-01-01T00:00:00.000Z'; // domingo

            mockLocalStorage.getItem
                .mockReturnValueOnce(JSON.stringify(mockSegments))
                .mockReturnValueOnce(JSON.stringify(mockTimestamp));

            const result = getCachedSegments();

            expect(result).toEqual({
                segments: mockSegments,
                timestamp: new Date(mockTimestamp)
            });
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
                'userSegments'
            );
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
                'userSegmentsTimestamp'
            );
        });

        it('should return null when no segments exist', () => {
            mockLocalStorage.getItem.mockReturnValue(null);

            const result = getCachedSegments();

            expect(result).toBeNull();
        });

        it('should return null when segments exist but no timestamp', () => {
            const mockSegments = [1, 2, 3];

            mockLocalStorage.getItem
                .mockReturnValueOnce(JSON.stringify(mockSegments))
                .mockReturnValueOnce(null);

            const result = getCachedSegments();

            expect(result).toBeNull();
        });

        it('should return null when JSON parsing fails', () => {
            mockLocalStorage.getItem
                .mockReturnValueOnce('invalid-json')
                .mockReturnValueOnce('"2023-01-01T00:00:00.000Z"');

            const result = getCachedSegments();

            expect(result).toBeNull();
        });
    });

    describe('setCachedSegments', () => {
        beforeEach(() => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2023-01-01T12:00:00.000Z'));
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it('should save segments and timestamp to localStorage', () => {
            const mockSegments = [1, 2, 3];

            setCachedSegments(mockSegments);

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'userSegments',
                JSON.stringify(mockSegments)
            );
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'userSegmentsTimestamp',
                JSON.stringify('2023-01-01T12:00:00.000Z')
            );
        });
    });

    describe('areCacheSegmentsValid', () => {
        beforeEach(() => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2023-01-08T12:00:00.000Z')); // domingo
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it('should return true when cache is from same day', () => {
            const cacheTimestamp = new Date('2023-01-08T08:00:00.000Z'); // mismo domingo

            const result = areCacheSegmentsValid(cacheTimestamp);

            expect(result).toBe(true);
        });

        it('should return false when cache is expired', () => {
            const cacheTimestamp = new Date('2023-01-01T12:00:00.000Z'); // domingo (7 días atrás)

            const result = areCacheSegmentsValid(cacheTimestamp);

            expect(result).toBe(false);
        });

        it('should return false when cache is from previous week', () => {
            const cacheTimestamp = new Date('2023-01-02T12:00:00.000Z'); // lunes (6 días atrás)

            const result = areCacheSegmentsValid(cacheTimestamp);

            expect(result).toBe(false);
        });
    });

    describe('fetchUserSegments', () => {
        const {
            getAuthTokens
        } = require('../../../../../../components/private/common/auth/helper/loginHelper');

        it('should fetch user segments successfully', async () => {
            const mockSegments = [1, 2, 3];
            const mockAccessToken = 'valid-access-token';

            getAuthTokens.mockResolvedValue({ accessToken: mockAccessToken });
            fetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ userSegments: mockSegments })
            });

            const result = await fetchUserSegments();

            expect(getAuthTokens).toHaveBeenCalled();
            expect(fetch).toHaveBeenCalledWith(
                'https://qrnsxguohj5bj3np6dwvc5xgue0wbmwh.lambda-url.us-east-1.on.aws/api/segmentacion/v1/segments/1',
                {
                    method: 'GET',
                    headers: {
                        access_token: mockAccessToken,
                        apikey: 'mytw1wdyqv4jc7h8s0w6pe3v7x99p3i5a12j'
                    },
                    signal: expect.any(Object)
                }
            );
            expect(result).toEqual(mockSegments);
            expect(global.clearTimeout).toHaveBeenCalledWith('timeout-id');
        });

        it('should return empty array when no access token', async () => {
            getAuthTokens.mockResolvedValue({ accessToken: null });

            const result = await fetchUserSegments();

            expect(console.error).toHaveBeenCalledWith(
                'No accessToken disponible para consulta de segmentos'
            );
            expect(result).toEqual([]);
            expect(fetch).not.toHaveBeenCalled();
        });

        it('should throw error when API response is not ok', async () => {
            const mockAccessToken = 'mock-access-token';

            getAuthTokens.mockResolvedValue({ accessToken: mockAccessToken });
            fetch.mockResolvedValue({
                ok: false,
                status: 404
            });

            await expect(fetchUserSegments()).rejects.toThrow(
                'Error API segmentación: 404'
            );
            expect(global.clearTimeout).toHaveBeenCalledWith('timeout-id');
        });

        it('should return empty array when userSegments is not in response', async () => {
            const mockAccessToken = 'mock-access-token';

            getAuthTokens.mockResolvedValue({ accessToken: mockAccessToken });
            fetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({})
            });

            const result = await fetchUserSegments();

            expect(result).toEqual([]);
            expect(global.clearTimeout).toHaveBeenCalledWith('timeout-id');
        });

        it('should handle network error', async () => {
            const mockAccessToken = 'mock-access-token';

            getAuthTokens.mockResolvedValue({ accessToken: mockAccessToken });
            fetch.mockRejectedValue(new Error('Network error'));

            await expect(fetchUserSegments()).rejects.toThrow('Network error');
        });

        it('should handle AbortController timeout correctly', async () => {
            const mockAccessToken = 'mock-access-token';
            const mockAbortController = {
                abort: jest.fn(),
                signal: { aborted: false }
            };

            global.AbortController.mockImplementation(
                () => mockAbortController
            );

            let timeoutCallback;
            global.setTimeout.mockImplementation((callback, delay) => {
                expect(delay).toBe(5000);
                timeoutCallback = callback;
                return 'timeout-id';
            });

            getAuthTokens.mockResolvedValue({ accessToken: mockAccessToken });
            fetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ userSegments: [1, 2, 3] })
            });

            const result = await fetchUserSegments();

            expect(global.setTimeout).toHaveBeenCalledWith(
                expect.any(Function),
                5000
            );

            timeoutCallback();
            expect(mockAbortController.abort).toHaveBeenCalled();
            expect(global.clearTimeout).toHaveBeenCalledWith('timeout-id');
            expect(result).toEqual([1, 2, 3]);
        });
    });
});
