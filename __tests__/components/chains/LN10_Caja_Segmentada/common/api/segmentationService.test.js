import { getUserSegments } from '../../../../../../components/chains/LN10_Caja_Segmentada/common/api/segmentationService';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Segmentada/common/api/helpers',
    () => ({
        getCachedSegments: jest.fn(),
        setCachedSegments: jest.fn(),
        areCacheSegmentsValid: jest.fn(),
        fetchUserSegments: jest.fn()
    })
);

describe('segmentationService', () => {
    const {
        getCachedSegments,
        setCachedSegments,
        areCacheSegmentsValid,
        fetchUserSegments
    } = require('../../../../../../components/chains/LN10_Caja_Segmentada/common/api/helpers');

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getUserSegments', () => {
        it('should return cached segments when cache is valid', async () => {
            const mockCachedData = {
                segments: [1, 2, 3],
                timestamp: new Date('2023-01-01T12:00:00.000Z')
            };

            getCachedSegments.mockReturnValue(mockCachedData);
            areCacheSegmentsValid.mockReturnValue(true);

            const result = await getUserSegments();

            expect(getCachedSegments).toHaveBeenCalled();
            expect(areCacheSegmentsValid).toHaveBeenCalledWith(
                mockCachedData.timestamp
            );
            expect(fetchUserSegments).not.toHaveBeenCalled();
            expect(setCachedSegments).not.toHaveBeenCalled();
            expect(result).toEqual([1, 2, 3]);
        });

        it('should fetch new segments when no cache exists', async () => {
            const mockFetchedSegments = [4, 5, 6];

            getCachedSegments.mockReturnValue(null);
            fetchUserSegments.mockResolvedValue(mockFetchedSegments);

            const result = await getUserSegments();

            expect(getCachedSegments).toHaveBeenCalled();
            expect(areCacheSegmentsValid).not.toHaveBeenCalled();
            expect(fetchUserSegments).toHaveBeenCalled();
            expect(setCachedSegments).toHaveBeenCalledWith(mockFetchedSegments);
            expect(result).toEqual(mockFetchedSegments);
        });

        it('should fetch new segments when cache is invalid', async () => {
            const mockCachedData = {
                segments: [1, 2, 3],
                timestamp: new Date('2023-01-01T12:00:00.000Z')
            };
            const mockFetchedSegments = [7, 8, 9];

            getCachedSegments.mockReturnValue(mockCachedData);
            areCacheSegmentsValid.mockReturnValue(false);
            fetchUserSegments.mockResolvedValue(mockFetchedSegments);

            const result = await getUserSegments();

            expect(getCachedSegments).toHaveBeenCalled();
            expect(areCacheSegmentsValid).toHaveBeenCalledWith(
                mockCachedData.timestamp
            );
            expect(fetchUserSegments).toHaveBeenCalled();
            expect(setCachedSegments).toHaveBeenCalledWith(mockFetchedSegments);
            expect(result).toEqual(mockFetchedSegments);
        });

        it('should handle errors and rethrow them', async () => {
            const mockError = new Error('API Error');

            getCachedSegments.mockReturnValue(null);
            fetchUserSegments.mockRejectedValue(mockError);

            await expect(getUserSegments()).rejects.toThrow('API Error');

            expect(console.error).toHaveBeenCalledWith(
                'Error consultando segmentación:',
                mockError
            );
            expect(setCachedSegments).not.toHaveBeenCalled();
        });
    });
});
