import logger from '../../../components/private/common/utils/logger';
import { handleHttpError } from '../../../components/private/common/utils/handleHttpError';
import fooditQuerylySource, {
    resolve
} from '../../../content/sources/fooditQuerylySource';

jest.mock('../../../components/private/common/utils/logger');
jest.mock('../../../components/private/common/utils/handleHttpError');

jest.mock('fusion:environment', () => {
    return {
        API_QUERYLY: 'https://mock-queryly.com',
        API_KEY_QUERYLY: 'mock-api-key'
    };
});

describe('fooditQuerylySource', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        handleHttpError.mockImplementation(() => {});
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('resolve function', () => {
        it('should generate the correct URL with all parameters', () => {
            const key = {
                query: 'pollo',
                groups: 'section',
                itemGroups: 'arroz',
                skipArticles: 10
            };

            const result = resolve(key);

            expect(result).toContain(
                'https://mock-queryly.com/json.aspx?queryly_key=mock-api-key'
            );
            expect(result).toContain('query=pollo');
            expect(result).toContain('facetedkey=section');
            expect(result).toContain('facetedvalue=arroz');
            expect(result).toContain('endindex=10');
            expect(result).toContain('batchsize=24');
            expect(result).toContain(
                'extendeddatafields=category,creator,subtype,counter_time,guid,creator,imageresizer,promo_image,counter_time,section,subtype,content_code,video_jw'
            );
        });

        it('should generate the URL without "groups" and "itemGroups" with space', () => {
            const key = {
                query: 'pollo',
                groups: ' ',
                itemGroups: ' ',
                skipArticles: 5
            };

            const result = resolve(key);

            expect(result).toContain(
                'https://mock-queryly.com/json.aspx?queryly_key=mock-api-key'
            );
            expect(result).toContain('query=pollo');
            expect(result).toContain('endindex=5');
            expect(result).toContain('batchsize=24');
            expect(result).not.toContain('facetedkey=');
            expect(result).not.toContain('facetedvalue=');
        });

        it('should throw an error if "query" is not defined', () => {
            const invalidQuery = {};

            expect(() => resolve(invalidQuery)).toThrowError(
                'Debe definir un query (termino de busqueda) para realizar la consulta - Queryly Source Foodit'
            );
        });
    });

    describe('fetch function', () => {
        it('should fetch data and return parsed results', async () => {
            const mockResponse = {
                items: [
                    { title: 'Pollo comida salada 1' },
                    { title: 'Plato de pollo 2' }
                ],
                metadata: {
                    total: 50,
                    endindex: 24
                }
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockResponse
            });

            const query = {
                query: 'pollo',
                groups: 'section',
                itemGroups: 'arroz',
                skipArticles: 0,
                'arc-site': 'foodit',
                title: 'Mock Title',
                _id: '/tema'
            };

            const result = await fooditQuerylySource.fetch(query);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('query=pollo'),
                expect.objectContaining({
                    method: 'GET',
                    signal: expect.any(AbortSignal)
                })
            );

            expect(result).toEqual({
                articles: mockResponse.items,
                total: mockResponse.metadata.total,
                endindex: mockResponse.metadata.endindex,
                name: 'Mock Title',
                _id: query._id,
                title: query.title,
                query
            });
        });

        it('should log an error if fetch fails', async () => {
            const mockError = new Error('Fetch failed');
            global.fetch.mockRejectedValueOnce(mockError);

            const query = {
                query: 'pollo',
                'arc-site': 'foodit'
            };

            const result = await fooditQuerylySource.fetch(query);

            expect(result).toEqual({});

            expect(logger.push).toHaveBeenCalledWith(
                mockError,
                {
                    source: 'content/sources/fooditQuerylySource'
                },
                'foodit'
            );
        });

        it('should handle request timeout (AbortError)', async () => {
            const abortError = new Error('The operation was aborted');
            abortError.name = 'AbortError';

            global.fetch.mockRejectedValueOnce(abortError);

            const query = {
                query: 'pollo',
                'arc-site': 'foodit'
            };

            const result = await fooditQuerylySource.fetch(query);

            expect(result).toEqual({});

            expect(logger.push).toHaveBeenCalledWith(
                'Request timed out',
                {
                    source: 'content/sources/fooditQuerylySource',
                    url: expect.stringContaining('query=pollo')
                },
                'foodit'
            );
        });

        it('should handle HTTP errors and return empty object', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500
            });

            const query = {
                query: 'pollo',
                'arc-site': 'foodit'
            };

            const result = await fooditQuerylySource.fetch(query);

            expect(result).toEqual({});

            expect(logger.push).toHaveBeenCalledWith(
                expect.any(Error),
                {
                    source: 'content/sources/fooditQuerylySource'
                },
                'foodit'
            );
        });
    });
});
