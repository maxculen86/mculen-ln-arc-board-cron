import { handleHttpError } from '../../../components/private/common/utils/handleHttpError';
import logger from '../../../components/private/common/utils/logger';
import transformData from '../../../content/sources/utils/relatedContentSource/_helper';
import fetchModule from '../../../content/sources/relatedContentSource';
import { getAllImagesAuth } from '../../../content/sources/utils/signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../components/private/common/utils/image/resizer/addResizerUrls';
import getPresets from '../../../content/sources/utils/presets';
import get from '../../../components/private/common/utils/get';

jest.mock('../../../components/private/common/utils/handleHttpError');
jest.mock('../../../content/sources/utils/relatedContentSource/_helper');
jest.mock('../../../components/private/common/utils/logger');
jest.mock('../../../content/sources/utils/relatedContentSource/_helper');
jest.mock('../../../components/private/common/utils/get');
jest.mock(
    '../../../components/private/common/utils/image/resizer/addResizerUrls'
);
jest.mock('../../../content/sources/utils/signingServiceSource/getImagesAuth');
jest.mock('../../../content/sources/utils/presets');
jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.example.com',
    ARC_ACCESS_TOKEN: 'test-token'
}));

describe('relatedContentSource', () => {
    const originalFetch = global.fetch;
    const { fetch } = fetchModule;

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();

        get.mockImplementation((obj, path, defaultValue) => {
            if (path === 'basic' && obj?.basic) return obj.basic;
            if (path === 'promo_items' && obj?.promo_items)
                return obj.promo_items;
            if (path === 'credits' && obj?.credits) return obj.credits;
            if (path === 'isAdmin' && obj?.isAdmin) return obj.isAdmin;
            return defaultValue;
        });

        getAllImagesAuth.mockImplementation(async elem => elem);
        addResizedUrls.mockImplementation(elem => elem);
        getPresets.mockReturnValue({ presets: {}, presetsDefault: {} });
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });

    it('should fetch related content successfully', async () => {
        const mockResponse = {
            basic: [{ id: '1', revision: { published: true } }]
        };
        const mockLimit = 3; // o 2 para foodit, depende del caso;
        const mockTransformedData = [{ id: '1', title: 'Test Article' }];
        const mockQuery = {
            'arc-site': 'foodit',
            id: 'article-123',
            limit: mockLimit
        };

        const mockCachedCall = jest.fn();

        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
            ok: true
        });
        transformData.mockResolvedValue(mockTransformedData);

        const result = await fetch(mockQuery, { cachedCall: mockCachedCall });

        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.example.com/content/v4/related-content/stories/?website=foodit&_id=article-123',
            expect.objectContaining({
                method: 'GET',
                headers: { Authorization: 'Bearer test-token' },
                signal: expect.any(Object)
            })
        );
        expect(handleHttpError).toHaveBeenCalled();
        expect(transformData).toHaveBeenCalledWith(
            mockResponse,
            mockQuery,
            mockLimit,
            mockCachedCall
        );
        expect(result).toEqual(mockTransformedData);
    });

    it('should handle errors gracefully', async () => {
        const mockQuery = { 'arc-site': 'foodit', id: 'article-123' };
        const mockError = new Error('Network error');

        global.fetch.mockRejectedValue(mockError);
        console.warn = jest.fn();

        const result = await fetch(mockQuery);

        expect(console.warn).toHaveBeenCalled();
        expect(logger.push).toHaveBeenCalledWith(mockError, {
            source: 'content/sources/relatedContentSource',
            query: mockQuery
        });
        expect(result).toEqual({});
    });

    it('should not include Authorization header when no token is present', async () => {
        const fetchWithToken = async (query, token) => {
            const opt = {
                method: 'GET'
            };

            if (token) {
                opt.headers = { Authorization: `Bearer ${token}` };
            }

            return opt;
        };

        const optWithToken = await fetchWithToken(
            { 'arc-site': 'foodit', id: 'article-123' },
            'test-token'
        );
        expect(optWithToken).toHaveProperty('headers');
        expect(optWithToken.headers).toHaveProperty(
            'Authorization',
            'Bearer test-token'
        );

        const optWithoutToken = await fetchWithToken(
            { 'arc-site': 'foodit', id: 'article-123' },
            null
        );
        expect(optWithoutToken).not.toHaveProperty('headers');
    });

    it('should return empty array when no items are available', async () => {
        const mockResponse = { basic: [] };
        const mockQuery = { 'arc-site': 'food-site' };

        transformData.mockResolvedValue([]);

        addResizedUrls.mockImplementation((elem, options) => elem);
        transformData.mockImplementation(async (response, query) => {
            response.basic.forEach(item => {
                addResizedUrls(item, { arcSite: query['arc-site'] });
            });
            return response.basic;
        });

        transformData.mockImplementation(async (response, query) => {
            response.basic.forEach(item => {
                addResizedUrls(item, { arcSite: query['arc-site'] });
            });
            return response.basic;
        });

        transformData.mockImplementation(async (response, query) => {
            response.basic.forEach(item => {
                addResizedUrls(item, { arcSite: query['arc-site'] });
            });
            return response.basic;
        });

        const result = await transformData(mockResponse, mockQuery);

        expect(result).toEqual([]);
    });

    it('should filter out unpublished items and limit to 2', async () => {
        const mockResponse = {
            basic: [
                { id: '1', revision: { published: true } },
                { id: '2', revision: { published: false } },
                { id: '3', revision: { published: true } },
                { id: '4', revision: { published: true } },
                { id: '5', revision: { published: true } }
            ]
        };
        const mockQuery = { 'arc-site': 'foodit' };
        const mockLimit = 2;
        const mockCachedCall = jest.fn();

        transformData.mockImplementation(
            async (response, query, mockLimit, cachedCall) => {
                const filteredItems = response.basic
                    .filter(item => item.revision?.published)
                    .slice(0, mockLimit);

                return Promise.all(
                    filteredItems.map(item =>
                        getAllImagesAuth(item, cachedCall)
                    )
                );
            }
        );

        const result = await transformData(
            mockResponse,
            mockQuery,
            mockLimit,
            mockCachedCall
        );

        expect(result.length).toBe(2);
        expect(result[0].id).toBe('1');
        expect(result[1].id).toBe('3');
        expect(getAllImagesAuth).toHaveBeenCalledTimes(2);
    });

    it('should properly transform data with images and credits', async () => {
        const realTransformData = jest.requireActual(
            '../../../content/sources/utils/relatedContentSource/_helper'
        ).default;

        const mockBasicItem = {
            id: '1',
            revision: { published: true },
            promo_items: { basic: { url: 'image.jpg' } },
            credits: { by: [{ name: 'Author' }] }
        };
        const mockResponse = { basic: [mockBasicItem] };
        const mockQuery = { 'arc-site': 'foodit', isAdmin: true };
        const mockLimit = 2;
        const mockCachedCall = jest.fn();

        getPresets.mockReturnValue({
            presets: {
                promo_items: { preset: 'thumbnail' },
                credits: { preset: 'author' }
            },
            presetsDefault: {}
        });

        getAllImagesAuth.mockResolvedValue({ ...mockBasicItem });

        addResizedUrls.mockImplementation((elem, options) => {
            expect(options.presets.promoItems).toEqual({ preset: 'thumbnail' });
            expect(options.presets.credits).toEqual({ preset: 'author' });
            expect(options.presets.presetsDefault).toEqual({});
            expect(options.isAdmin).toBe(true);
            expect(options.arcSite).toBe('foodit');

            return {
                ...elem,
                promo_items: {
                    ...elem.promo_items,
                    basic: {
                        ...elem.promo_items.basic,
                        resized_urls: { thumbnail: 'thumbnail.jpg' }
                    }
                }
            };
        });

        const result = await realTransformData(
            mockResponse,
            mockQuery,
            mockLimit,
            mockCachedCall
        );

        expect(result).toHaveLength(1);
        expect(result[0]?.promo_items?.basic?.resized_urls?.thumbnail).toBe(
            'thumbnail.jpg'
        );
    });

    it('should process multiple items and merge with image auth data', async () => {
        const mockResponse = {
            basic: [
                {
                    id: '1',
                    revision: { published: true },
                    promo_items: { basic: { url: 'image1.jpg' } }
                },
                {
                    id: '2',
                    revision: { published: true },
                    promo_items: { basic: { url: 'image2.jpg' } }
                }
            ]
        };
        const mockQuery = { 'arc-site': 'foodit' };
        const mockLimit = 2;
        const mockCachedCall = jest.fn();

        getAllImagesAuth.mockImplementation(async elem => {
            return {
                ...elem,
                signedUrl: `signed-${elem.id}`
            };
        });

        const result = await transformData(
            mockResponse,
            mockQuery,
            mockLimit,
            mockCachedCall
        );

        expect(result.length).toBe(2);
        expect(result[0].signedUrl).toBe('signed-1');
        expect(result[1].signedUrl).toBe('signed-2');
        expect(getAllImagesAuth).toHaveBeenCalledTimes(2);
    });
});
