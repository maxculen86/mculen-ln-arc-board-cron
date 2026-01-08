import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import get from '../../../../../../components/private/common/utils/get';
import getPresets from '../../../../../../content/sources/utils/presets';
import { addResizedUrls } from '../../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import logger from '../../../../../../components/private/common/utils/logger';
import { getCategoryImageAuth } from '../../../../../../content/sources/utils/fooditSources/utils/authImage';
import fooditCategoryImageSource from '../../../../../../content/sources/fooditCategoryImageSource';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.foodit.arcpublishing.com',
    ARC_ACCESS_TOKEN: undefined
}));

jest.mock('../../../../../../components/private/common/utils/logger', () => ({
    push: jest.fn()
}));

jest.mock('../../../../../../components/private/common/utils/get');

jest.mock('../../../../../../content/sources/utils/presets', () =>
    jest.fn(() => ({
        presets: {
            promo_items: {
                sizes: [{ width: 300, height: 200 }]
            }
        }
    }))
);

jest.mock(
    '../../../../../../components/private/common/utils/image/resizer/addResizerUrls',
    () => ({
        addResizedUrls: jest.fn((data, options) => ({
            ...data,
            resizedImages: true
        }))
    })
);

jest.mock(
    '../../../../../../content/sources/utils/fooditSources/utils/authImage',
    () => ({
        getCategoryImageAuth: jest.fn(data =>
            Promise.resolve({
                ...data,
                auth: { 1: 'mock-hash-value' }
            })
        )
    })
);

describe('Content - Sources - fooditCategoryImageSource', () => {
    const { fetch } = fooditCategoryImageSource;

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () =>
                    Promise.resolve({
                        _id: 'test-image-123',
                        url: 'https://example.com/image.jpg',
                        width: 1920,
                        height: 1080
                    })
            })
        );

        get.mockImplementation((obj, path, defaultValue) => {
            const keys = path.split('.');
            let result = obj;
            for (const key of keys) {
                if (result && typeof result === 'object' && key in result) {
                    result = result[key];
                } else {
                    return defaultValue;
                }
            }
            return result;
        });

        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('Validation', () => {
        it('should throw an error if id is not provided', async () => {
            const query = {
                'arc-site': 'foodit'
            };

            await expect(async () => {
                await fetch(query);
            }).rejects.toThrow('Debe definir id para obtener la imagen');
        });
    });

    describe('Successful image fetch', () => {
        it('should fetch and transform image data successfully', async () => {
            const query = {
                id: 'test-image-123',
                'arc-site': 'foodit',
                imageConfig: 'default'
            };

            const mockCachedCall = jest.fn();
            const result = await fetch(query, { cachedCall: mockCachedCall });

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/photo/api/v2/photos/test-image-123'),
                expect.objectContaining({
                    method: 'GET',
                    signal: expect.any(AbortSignal)
                })
            );

            expect(getCategoryImageAuth).toHaveBeenCalled();
            expect(getPresets).toHaveBeenCalledWith(query);
            expect(addResizedUrls).toHaveBeenCalled();

            expect(result).toHaveProperty('resizedImages', true);
        });
    });

    describe('HTTP error handling', () => {
        it('should handle HTTP errors and return empty object', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 404
                })
            );

            const query = {
                id: 'non-existent-image',
                'arc-site': 'foodit'
            };

            const result = await fetch(query);

            expect(result).toEqual({});

            expect(logger.push).toHaveBeenCalledWith(
                expect.any(Error),
                {
                    source: 'content/sources/fooditCategoryImageSource',
                    id: 'non-existent-image'
                },
                'foodit'
            );
        });
    });

    describe('Timeout handling', () => {
        it('should handle request timeout (AbortError)', async () => {
            const abortError = new Error('The operation was aborted');
            abortError.name = 'AbortError';

            global.fetch = jest.fn(() => Promise.reject(abortError));

            const query = {
                id: 'test-image-123',
                'arc-site': 'foodit'
            };

            const result = await fetch(query);

            expect(result).toEqual({});

            expect(logger.push).toHaveBeenCalledWith(
                'Request timed out',
                {
                    source: 'content/sources/fooditCategoryImageSource',
                    id: 'test-image-123'
                },
                'foodit'
            );
        });
    });

    describe('Image authentication', () => {
        it('should add authentication hash to image data', async () => {
            const mockImageData = {
                _id: 'image-456',
                url: 'https://example.com/original.jpg',
                width: 1920,
                height: 1080
            };

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockImageData)
                })
            );

            getCategoryImageAuth.mockResolvedValueOnce({
                ...mockImageData,
                auth: { 1: 'transformed-hash' }
            });

            const query = {
                id: 'image-456',
                'arc-site': 'foodit'
            };

            await fetch(query);

            expect(getCategoryImageAuth).toHaveBeenCalledWith(
                mockImageData,
                undefined
            );

            expect(addResizedUrls).toHaveBeenCalledWith(
                {
                    promo_items: {
                        basic: {
                            ...mockImageData,
                            auth: { 1: 'transformed-hash' }
                        }
                    }
                },
                expect.objectContaining({
                    presets: expect.any(Object)
                })
            );
        });
    });
});
