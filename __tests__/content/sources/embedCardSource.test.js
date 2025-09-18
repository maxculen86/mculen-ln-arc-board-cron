import nodeFetch from 'node-fetch';
import embedCardSource from '../../../content/sources/embedCardSource';
import { handleHttpError } from '../../../components/private/common/utils/handleHttpError';
import logger from '../../../components/private/common/utils/logger';
import { signingServiceCachedCall } from '../../../content/sources/utils/signingServiceSource/getImagesAuth';
import { resizeImgUrl } from '../../../components/private/common/utils/image/resizer/v2/resizerHelper';

jest.mock('node-fetch');
jest.mock('../../../components/private/common/utils/handleHttpError');
jest.mock('../../../components/private/common/utils/logger');
jest.mock('../../../content/sources/utils/signingServiceSource/getImagesAuth');
jest.mock(
    '../../../components/private/common/utils/image/resizer/v2/resizerHelper'
);
jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.lanacionar.arcpublishing.com',
    ARC_ACCESS_TOKEN: 'test-token-123'
}));

const mockSuccessResponse = {
    _id: 'FJ5UOR2HONA5RGOM226UQF24MI',
    headlines: {
        basic: 'Pizza estilo Tortugas Ninja: La Receta Definitiva!'
    },
    description: {
        basic: '¡Cowabunga, amantes de la pizza! Preparar una pizza al estilo de las Tortugas Ninja es fácil y delicioso.'
    },
    promo_items: {
        basic: {
            url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/6E3ED45ARFBZ3ADKYOXZVZDP2A.jpg'
        },
        receta: {
            embed: {
                config: {
                    prepTime: 10,
                    cookTime: 20,
                    counterPortion: 8,
                    cookingTypes: ['Al horno'],
                    regions: ['Italiana', 'Estadounidense']
                }
            }
        }
    },
    credits: {
        by: [
            {
                name: 'Juan Pravata'
            }
        ]
    },
    taxonomy: {
        primary_section: {
            name: 'Pizzas y empanadas'
        }
    },
    publish_date: '2025-07-11T02:10:14.604Z',
    canonical_url:
        '/recetas/pizza-estilo-tortugas-ninja-la-receta-definitiva-nid03012024/',
    website: 'foodit'
};

const mockEmptyResponse = {
    _id: 'ABC123'
};

const mockResponseWithoutImage = {
    _id: 'NO_IMAGE_123',
    headlines: {
        basic: 'Article without image'
    },
    promo_items: {}
};

const mockCachedCall = jest.fn();
const mockSigningResponse = { hash: 'mock-auth-hash-123' };
const mockResizedUrl =
    'https://resizer.glanacion.com/resizer/v2/resized-image.jpg';

describe('embedCardSource.fetch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        handleHttpError.mockImplementation(() => {});
        signingServiceCachedCall.mockResolvedValue(mockSigningResponse);
        resizeImgUrl.mockReturnValue(mockResizedUrl);
    });

    it('should return recipe data when noteId is valid', async () => {
        nodeFetch.mockResolvedValue({
            ok: true,
            json: async () => mockSuccessResponse
        });

        const result = await embedCardSource.fetch({
            noteId: 'FJ5UOR2HONA5RGOM226UQF24MI'
        });

        expect(handleHttpError).toHaveBeenCalled();
        expect(result).toEqual(mockSuccessResponse);
        expect(nodeFetch).toHaveBeenCalledWith(
            'https://api.sandbox.lanacionar.arcpublishing.com/content/v4/stories/?website=foodit&_id=FJ5UOR2HONA5RGOM226UQF24MI&published=true',
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer test-token-123'
                }
            }
        );
    });

    it('should encode noteId with special characters', async () => {
        nodeFetch.mockResolvedValue({
            ok: true,
            json: async () => mockSuccessResponse
        });

        await embedCardSource.fetch({
            noteId: 'ABC 123'
        });

        expect(nodeFetch).toHaveBeenCalledWith(
            expect.stringContaining('_id=ABC%20123'),
            expect.any(Object)
        );
    });

    it('should preserve already encoded noteId', async () => {
        nodeFetch.mockResolvedValue({
            ok: true,
            json: async () => mockSuccessResponse
        });

        await embedCardSource.fetch({
            noteId: 'ABC%20123'
        });

        expect(nodeFetch).toHaveBeenCalledWith(
            expect.stringContaining('_id=ABC%20123'),
            expect.any(Object)
        );
    });

    it('should return error object when data has no headlines.basic', async () => {
        nodeFetch.mockResolvedValue({
            ok: true,
            json: async () => mockEmptyResponse
        });

        const result = await embedCardSource.fetch({
            noteId: 'ABC123'
        });

        expect(result).toEqual({
            error: true,
            message: 'No data found for noteId: ABC123',
            noteId: 'ABC123'
        });
    });

    it('should return error object when data is null', async () => {
        nodeFetch.mockResolvedValue({
            ok: true,
            json: async () => null
        });

        const result = await embedCardSource.fetch({
            noteId: 'NULL123'
        });

        expect(result).toEqual({
            error: true,
            message: 'No data found for noteId: NULL123',
            noteId: 'NULL123'
        });
    });

    it('should log an error and return error object on fetch failure', async () => {
        const error = new Error('Network error');
        nodeFetch.mockRejectedValue(error);

        const result = await embedCardSource.fetch({
            noteId: 'ERROR123'
        });

        expect(logger.push).toHaveBeenCalledWith(
            error,
            expect.objectContaining({
                source: 'content/sources/embedCardSource.js',
                noteId: 'ERROR123',
                url: expect.stringContaining('ERROR123')
            })
        );
        expect(result).toEqual({
            error: true,
            message: 'Network error',
            noteId: 'ERROR123'
        });
    });

    it('should log an error and return error object on HTTP error', async () => {
        const httpError = new Error('HTTP 404: Not Found');
        nodeFetch.mockResolvedValue({
            ok: false,
            status: 404
        });
        handleHttpError.mockImplementationOnce(() => {
            throw httpError;
        });

        const result = await embedCardSource.fetch({
            noteId: 'NOTFOUND123'
        });

        expect(logger.push).toHaveBeenCalledWith(
            httpError,
            expect.objectContaining({
                source: 'content/sources/embedCardSource.js',
                noteId: 'NOTFOUND123'
            })
        );
        expect(result).toEqual({
            error: true,
            message: 'HTTP 404: Not Found',
            noteId: 'NOTFOUND123'
        });
    });

    describe('Image resizing functionality', () => {
        it('should resize promo_items.basic image when cachedCall is provided', async () => {
            nodeFetch.mockResolvedValue({
                ok: true,
                json: async () => mockSuccessResponse
            });

            const result = await embedCardSource.fetch(
                { noteId: 'FJ5UOR2HONA5RGOM226UQF24MI' },
                { cachedCall: mockCachedCall }
            );

            expect(signingServiceCachedCall).toHaveBeenCalledWith(
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/6E3ED45ARFBZ3ADKYOXZVZDP2A.jpg',
                mockCachedCall
            );

            expect(resizeImgUrl).toHaveBeenCalledWith({
                arcImage: {
                    url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/6E3ED45ARFBZ3ADKYOXZVZDP2A.jpg',
                    auth: { 1: 'mock-auth-hash-123' },
                    type: 'image'
                },
                defaultResizeWithSmart: {
                    width: 400,
                    height: 300,
                    media: '(min-width: 320px)',
                    class: '',
                    type: 'image'
                }
            });

            expect(result.promo_items.basic.url).toBe(mockResizedUrl);
        });

        it('should return original data when cachedCall is not provided', async () => {
            nodeFetch.mockResolvedValue({
                ok: true,
                json: async () => mockSuccessResponse
            });

            const result = await embedCardSource.fetch({
                noteId: 'FJ5UOR2HONA5RGOM226UQF24MI'
            });

            expect(signingServiceCachedCall).not.toHaveBeenCalled();
            expect(resizeImgUrl).not.toHaveBeenCalled();
            expect(result).toEqual(mockSuccessResponse);
        });

        it('should handle articles without promo_items.basic gracefully', async () => {
            nodeFetch.mockResolvedValue({
                ok: true,
                json: async () => mockResponseWithoutImage
            });

            const result = await embedCardSource.fetch(
                { noteId: 'NO_IMAGE_123' },
                { cachedCall: mockCachedCall }
            );

            expect(signingServiceCachedCall).not.toHaveBeenCalled();
            expect(resizeImgUrl).not.toHaveBeenCalled();
            expect(result).toEqual(mockResponseWithoutImage);
        });

        it('should handle empty or missing image URL in promo_items.basic', async () => {
            const responseWithEmptyImage = {
                ...mockSuccessResponse,
                promo_items: {
                    basic: {
                        url: ''
                    }
                }
            };

            nodeFetch.mockResolvedValue({
                ok: true,
                json: async () => responseWithEmptyImage
            });

            const result = await embedCardSource.fetch(
                { noteId: 'EMPTY_IMAGE_123' },
                { cachedCall: mockCachedCall }
            );

            expect(signingServiceCachedCall).not.toHaveBeenCalled();
            expect(resizeImgUrl).not.toHaveBeenCalled();
            expect(result.promo_items.basic.url).toBe('');
        });

        it('should preserve all other promo_items.basic properties when resizing', async () => {
            const responseWithImageMetadata = {
                ...mockSuccessResponse,
                promo_items: {
                    basic: {
                        url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/6E3ED45ARFBZ3ADKYOXZVZDP2A.jpg',
                        alt_text: 'Pizza photo',
                        caption: 'Delicious pizza',
                        width: 800,
                        height: 600
                    }
                }
            };

            nodeFetch.mockResolvedValue({
                ok: true,
                json: async () => responseWithImageMetadata
            });

            const result = await embedCardSource.fetch(
                { noteId: 'WITH_METADATA_123' },
                { cachedCall: mockCachedCall }
            );

            expect(result.promo_items.basic).toEqual({
                url: mockResizedUrl,
                alt_text: 'Pizza photo',
                caption: 'Delicious pizza',
                width: 800,
                height: 600
            });
        });

        it('should handle null promo_items.basic gracefully', async () => {
            const responseWithNullPromoItems = {
                ...mockSuccessResponse,
                promo_items: {
                    basic: null
                }
            };

            nodeFetch.mockResolvedValue({
                ok: true,
                json: async () => responseWithNullPromoItems
            });

            const result = await embedCardSource.fetch(
                { noteId: 'NULL_PROMO_123' },
                { cachedCall: mockCachedCall }
            );

            expect(signingServiceCachedCall).not.toHaveBeenCalled();
            expect(resizeImgUrl).not.toHaveBeenCalled();
            expect(result.promo_items.basic).toBeNull();
        });
    });
});
