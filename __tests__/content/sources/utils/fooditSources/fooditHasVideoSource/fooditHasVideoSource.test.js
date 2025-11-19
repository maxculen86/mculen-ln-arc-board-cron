import contentSource from '../../../../../../content/sources/fooditHasVideoSource';
import logger from '../../../../../../components/private/common/utils/logger';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://arc-api.com',
    ARC_ACCESS_TOKEN: 'test-token'
}));

jest.mock('../../../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

jest.mock('../../../../../../content/filters/foodit/fooditHasVideoSource');

const loggerPush = jest.spyOn(logger, 'push');

beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

describe('Content Sources - Foodit Has Video Source', () => {
    const mockArticleResponse = {
        _id: 'article-123',
        content_elements: [
            {
                type: 'video',
                _id: 'video-1',
                url: 'https://example.com/video.mp4'
            },
            {
                type: 'text',
                content: 'Some text content'
            }
        ]
    };

    beforeEach(() => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockArticleResponse)
            });
        });
    });

    describe('Fetch functionality', () => {
        it('should fetch article data successfully with global.fetch', async () => {
            const query = { idArticle: 'article-123' };
            const result = await contentSource.fetch(query);

            expect(global.fetch).toHaveBeenCalledWith(
                'https://arc-api.com/content/v4/stories/?website=foodit&_id=article-123&published=true&&included_fields=content_elements',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer test-token'
                    },
                    signal: expect.any(AbortSignal)
                }
            );

            expect(result).toEqual(mockArticleResponse);
        });

        it('should construct correct URL with idArticle parameter', async () => {
            const query = { idArticle: 'test-article-456' };
            await contentSource.fetch(query);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('_id=test-article-456'),
                expect.any(Object)
            );
        });

        it('should handle empty idArticle parameter', async () => {
            const query = {};
            const result = await contentSource.fetch(query);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('_id='),
                expect.any(Object)
            );
            expect(result).toEqual(mockArticleResponse);
        });

        it('should use correct headers format with Authorization Bearer', async () => {
            const query = { idArticle: 'article-123' };
            await contentSource.fetch(query);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer test-token'
                    }
                })
            );
        });

        it('should include correct query parameters in URL', async () => {
            const query = { idArticle: 'article-123' };
            await contentSource.fetch(query);

            const calledUrl = global.fetch.mock.calls[0][0];
            expect(calledUrl).toContain('website=foodit');
            expect(calledUrl).toContain('published=true');
            expect(calledUrl).toContain('included_fields=content_elements');
        });
    });

    describe('Error handling', () => {
        it('should handle fetch errors and log them', async () => {
            const query = { idArticle: 'article-123' };
            const fetchError = new Error('Network error');

            global.fetch = jest.fn(() => Promise.reject(fetchError));

            const result = await contentSource.fetch(query);

            expect(loggerPush).toHaveBeenCalledWith('Network error', {
                source: 'content/sources/fooditHasVideoSource',
                url: expect.stringContaining('article-123')
            });
            expect(result).toEqual({});
        });

        it('should handle HTTP error responses', async () => {
            const query = { idArticle: 'article-123' };

            global.fetch = jest.fn(() => {
                return Promise.resolve({
                    ok: false,
                    status: 404,
                    statusText: 'Not Found'
                });
            });

            const result = await contentSource.fetch(query);

            expect(loggerPush).toHaveBeenCalledWith(
                'HTTP error! status: 404 - Not Found',
                {
                    source: 'content/sources/fooditHasVideoSource',
                    url: expect.stringContaining('article-123')
                }
            );
            expect(result).toEqual({});
        });

        it('should handle 500 server errors', async () => {
            const query = { idArticle: 'article-123' };

            global.fetch = jest.fn(() => {
                return Promise.resolve({
                    ok: false,
                    status: 500,
                    statusText: 'Internal Server Error'
                });
            });

            const result = await contentSource.fetch(query);

            expect(loggerPush).toHaveBeenCalledWith(
                'HTTP error! status: 500 - Internal Server Error',
                expect.objectContaining({
                    source: 'content/sources/fooditHasVideoSource'
                })
            );
            expect(result).toEqual({});
        });

        it('should handle JSON parsing errors', async () => {
            const query = { idArticle: 'article-123' };
            const jsonError = new Error('JSON parse error');

            global.fetch = jest.fn(() => {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.reject(jsonError)
                });
            });

            const result = await contentSource.fetch(query);

            expect(loggerPush).toHaveBeenCalledWith(
                'JSON parse error',
                expect.objectContaining({
                    source: 'content/sources/fooditHasVideoSource'
                })
            );
            expect(result).toEqual({});
        });

        it('should handle AbortError for timeout', async () => {
            const query = { idArticle: 'article-123' };
            const abortError = new Error('The operation was aborted');
            abortError.name = 'AbortError';

            global.fetch = jest.fn(() => Promise.reject(abortError));

            const result = await contentSource.fetch(query);

            expect(loggerPush).toHaveBeenCalledWith('Request timed out', {
                source: 'content/sources/fooditHasVideoSource',
                url: expect.stringContaining('article-123')
            });
            expect(result).toEqual({});
        });
    });

    describe('Response handling', () => {
        it('should return complete article data with content_elements', async () => {
            const complexResponse = {
                _id: 'article-789',
                headline: 'Test Article',
                content_elements: [
                    {
                        type: 'video',
                        _id: 'video-1',
                        streams: [{ url: 'https://example.com/video.m3u8' }]
                    },
                    {
                        type: 'image',
                        _id: 'image-1',
                        url: 'https://example.com/image.jpg'
                    },
                    {
                        type: 'text',
                        content: 'Article content'
                    }
                ]
            };

            global.fetch = jest.fn(() => {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve(complexResponse)
                });
            });

            const query = { idArticle: 'article-789' };
            const result = await contentSource.fetch(query);

            expect(result).toEqual(complexResponse);
            expect(result.content_elements).toHaveLength(3);
            expect(result.content_elements[0].type).toBe('video');
        });

        it('should handle empty response', async () => {
            global.fetch = jest.fn(() => {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({})
                });
            });

            const query = { idArticle: 'article-123' };
            const result = await contentSource.fetch(query);

            expect(result).toEqual({});
        });
    });
});
