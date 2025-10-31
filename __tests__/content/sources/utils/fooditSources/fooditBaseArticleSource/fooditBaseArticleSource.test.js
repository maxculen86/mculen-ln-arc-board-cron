import { addResizedUrls } from '../../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import {
    getUrlQuery,
    transformSubtype
} from '../../../../../../content/sources/utils/articleSourceNota/_helper';
import {
    getArticleSubtype,
    getImageConfig
} from '../../../../../../content/sources/utils/fooditSources/fooditArticleSource';
import { getAllImagesAuth } from '../../../../../../content/sources/utils/signingServiceSource/getImagesAuth';
import logger from '../../../../../../components/private/common/utils/logger';
import fooditBaseArticleSource from '../../../../../../content/sources/fooditBaseArticleSource';
import mockArticleData from '../../../../../../__mocks__/data/articles/articleFetch.json';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.lanacionar.arcpublishing.com',
    ARC_ACCESS_TOKEN: undefined,
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com'
}));

jest.mock('../../../../../../components/private/common/utils/logger', () => ({
    push: jest.fn()
}));

jest.mock(
    '../../../../../../content/sources/utils/articleSourceNota/_helper',
    () => ({
        getUrlQuery: jest.fn(
            query =>
                `/content/v4/stories?website=${query['arc-site']}&_id=${query.id || query.url}`
        ),
        transformSubtype: jest.fn(data => ({
            ...data,
            subtype: 'transformed-subtype'
        }))
    })
);

jest.mock(
    '../../../../../../content/sources/utils/signingServiceSource/getImagesAuth',
    () => ({
        getAllImagesAuth: jest.fn((data, cachedCall) =>
            Promise.resolve({
                ...data,
                imagesAuth: 'mocked-auth',
                promo_items: {
                    basic: {
                        auth: { 1: 'mock-hash' }
                    }
                }
            })
        )
    })
);

jest.mock(
    '../../../../../../content/sources/utils/fooditSources/fooditArticleSource/index',
    () => ({
        getArticleSubtype: jest.fn(subtype => subtype || 'storytelling'),
        getImageConfig: jest.fn(() => ({
            promoItems: { sizes: [{ width: 300, height: 200 }] },
            contentElements: { sizes: [{ width: 720, height: 480 }] },
            credits: { sizes: [{ width: 150, height: 150 }] }
        }))
    })
);

jest.mock(
    '../../../../../../components/private/common/utils/image/resizer/addResizerUrls',
    () => ({
        addResizedUrls: jest.fn((data, options) => ({
            ...data,
            resizedImages: true,
            promo_items: {
                basic: {
                    url: 'https://resized-image.com/image.jpg'
                }
            }
        }))
    })
);

describe('Content - Sources - fooditBaseArticleSource', () => {
    const { fetch } = fooditBaseArticleSource;

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockArticleData)
            })
        );

        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('Successful requests', () => {
        it('should fetch and process article data successfully', async () => {
            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit',
                url: '/article/test',
                isInApertura: false,
                isAdmin: false
            };

            const result = await fetch(query, { cachedCall: jest.fn() });

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/content/v4/stories'),
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    signal: expect.any(AbortSignal)
                }
            );

            expect(getUrlQuery).toHaveBeenCalledWith(query);
            expect(getAllImagesAuth).toHaveBeenCalledWith(
                mockArticleData,
                expect.any(Function)
            );
            expect(transformSubtype).toHaveBeenCalled();
            expect(getArticleSubtype).toHaveBeenCalled();
            expect(getImageConfig).toHaveBeenCalled();
            expect(addResizedUrls).toHaveBeenCalled();

            expect(result).toHaveProperty('subtype', 'transformed-subtype');
            expect(result).toHaveProperty('resizedImages', true);

            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        it('should handle isInApertura and isAdmin flags correctly', async () => {
            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit',
                isInApertura: true,
                isAdmin: true
            };

            await fetch(query, { cachedCall: jest.fn() });

            expect(addResizedUrls).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({
                    isInApertura: true,
                    isAdmin: true,
                    arcSite: 'foodit'
                })
            );
        });

        it('should default isInApertura and isAdmin to false when not provided', async () => {
            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            await fetch(query);

            expect(addResizedUrls).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({
                    isInApertura: false,
                    isAdmin: false
                })
            );
        });

        it('should merge getAllImagesAuth result with original data', async () => {
            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            await fetch(query);

            expect(transformSubtype).toHaveBeenCalledWith(
                expect.objectContaining({
                    imagesAuth: 'mocked-auth',
                    promo_items: expect.objectContaining({
                        basic: expect.objectContaining({
                            auth: { 1: 'mock-hash' }
                        })
                    })
                })
            );
        });
    });

    describe('Authorization header', () => {
        it('should not include Authorization header when ARC_ACCESS_TOKEN is undefined', async () => {
            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            await fetch(query);

            const callArgs = global.fetch.mock.calls[0][1];
            expect(callArgs.headers).toEqual({
                'Content-Type': 'application/json'
            });
            expect(callArgs.headers).not.toHaveProperty('Authorization');
        });
    });

    describe('HTTP errors', () => {
        it('should handle 404 errors correctly', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 404,
                    statusText: 'Not Found'
                })
            );

            const query = {
                id: 'non-existent-article',
                'arc-site': 'foodit',
                url: '/article/not-found'
            };

            const result = await fetch(query);

            expect(result).toEqual({});
            expect(logger.push).toHaveBeenCalledWith(
                'HTTP error! status: 404 - Not Found',
                {
                    source: 'content/source/articleSource',
                    url: '/article/not-found'
                },
                'foodit'
            );
        });

        it('should handle 500 errors correctly', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 500,
                    statusText: 'Internal Server Error'
                })
            );

            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit',
                url: '/article/test'
            };

            const result = await fetch(query);

            expect(result).toEqual({});
            expect(logger.push).toHaveBeenCalledWith(
                'HTTP error! status: 500 - Internal Server Error',
                {
                    source: 'content/source/articleSource',
                    url: '/article/test'
                },
                'foodit'
            );
        });
    });

    describe('Network errors', () => {
        it('should handle network errors correctly', async () => {
            global.fetch = jest.fn(() =>
                Promise.reject(new TypeError('Network request failed'))
            );

            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit',
                url: '/article/test'
            };

            const result = await fetch(query);

            expect(result).toEqual({});
            expect(logger.push).toHaveBeenCalledWith(
                'Network request failed',
                {
                    source: 'content/source/articleSource',
                    url: '/article/test'
                },
                'foodit'
            );
        });
    });

    describe('Timeout errors', () => {
        it('should handle timeout errors (AbortError) correctly', async () => {
            const abortError = new Error('The operation was aborted');
            abortError.name = 'AbortError';

            global.fetch = jest.fn(() => Promise.reject(abortError));

            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit',
                url: '/article/test'
            };

            const result = await fetch(query);

            expect(result).toEqual({});
            expect(logger.push).toHaveBeenCalledWith(
                'Request timed out',
                {
                    source: 'content/source/articleSource',
                    url: '/article/test'
                },
                'foodit'
            );
        });
    });

    describe('Query parameters', () => {
        it('should handle query with url parameter', async () => {
            const query = {
                url: '/article/test-url',
                'arc-site': 'foodit'
            };

            await fetch(query);

            expect(getUrlQuery).toHaveBeenCalledWith(query);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/content/v4/stories'),
                expect.any(Object)
            );
        });

        it('should handle query with id parameter', async () => {
            const query = {
                id: 'article-id-123',
                'arc-site': 'foodit'
            };

            await fetch(query);

            expect(getUrlQuery).toHaveBeenCalledWith(query);
        });

        it('should handle imageConfig parameter', async () => {
            const query = {
                id: 'test-article',
                'arc-site': 'foodit',
                imageConfig: 'custom-config'
            };

            await fetch(query);

            expect(getImageConfig).toHaveBeenCalled();
        });
    });

    describe('cachedCall integration', () => {
        it('should pass cachedCall to getAllImagesAuth', async () => {
            const mockCachedCall = jest.fn();
            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            await fetch(query, { cachedCall: mockCachedCall });

            expect(getAllImagesAuth).toHaveBeenCalledWith(
                mockArticleData,
                mockCachedCall
            );
        });

        it('should work without cachedCall parameter', async () => {
            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            const result = await fetch(query);

            expect(result).toBeDefined();
            expect(getAllImagesAuth).toHaveBeenCalled();
        });

        it('should handle undefined cachedCall gracefully', async () => {
            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            const result = await fetch(query, { cachedCall: undefined });

            expect(result).toBeDefined();
        });
    });

    describe('Edge cases', () => {
        it('should handle empty response data', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({})
                })
            );

            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            const result = await fetch(query);

            expect(result).toBeDefined();
        });

        it('should handle missing url in query for logger', async () => {
            global.fetch = jest.fn(() =>
                Promise.reject(new Error('Test error'))
            );

            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            await fetch(query);

            expect(logger.push).toHaveBeenCalledWith(
                'Test error',
                {
                    source: 'content/source/articleSource',
                    url: ''
                },
                'foodit'
            );
        });

        it('should handle null response from getAllImagesAuth', async () => {
            getAllImagesAuth.mockResolvedValueOnce(null);

            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            await fetch(query);

            expect(transformSubtype).toHaveBeenCalled();
        });

        it('should handle errors in getAllImagesAuth', async () => {
            getAllImagesAuth.mockRejectedValueOnce(
                new Error('Auth service error')
            );

            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit',
                url: '/article/test'
            };

            const result = await fetch(query);

            expect(result).toEqual({});
            expect(logger.push).toHaveBeenCalled();
        });

        it('should handle errors in transformSubtype', async () => {
            transformSubtype.mockImplementationOnce(() => {
                throw new Error('Transform error');
            });

            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            const result = await fetch(query);

            expect(result).toEqual({});
        });

        it('should handle errors in addResizedUrls', async () => {
            addResizedUrls.mockImplementationOnce(() => {
                throw new Error('Resize error');
            });

            const query = {
                id: 'test-article-123',
                'arc-site': 'foodit'
            };

            const result = await fetch(query);

            expect(result).toEqual({});
        });
    });
});
