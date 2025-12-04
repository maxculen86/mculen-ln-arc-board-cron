import jwPlaylistSource from '../../../content/sources/jwPlaylistSource';
import { handleHttpError } from '../../../components/private/common/utils/handleHttpError';
import logger from '../../../components/private/common/utils/logger';

jest.mock('../../../components/private/common/utils/handleHttpError');
jest.mock('../../../components/private/common/utils/logger');

describe('jwPlaylistSource', () => {
    let consoleWarnSpy;

    beforeEach(() => {
        jest.clearAllMocks();

        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

        logger.push = jest.fn();
    });

    afterEach(() => {
        consoleWarnSpy.mockRestore();
    });

    describe('Metadata', () => {
        it('should have correct params definition', () => {
            expect(jwPlaylistSource.params).toEqual({
                playlistId: 'text'
            });
        });

        it('should have correct ttl', () => {
            expect(jwPlaylistSource.ttl).toBe(120);
        });

        it('should have fetch function', () => {
            expect(typeof jwPlaylistSource.fetch).toBe('function');
        });
    });

    describe('fetch', () => {
        const mockPlaylistId = 'test-playlist-123';
        const mockQuery = { playlistId: mockPlaylistId };
        const mockPlaylistData = {
            playlist: [
                {
                    mediaid: 'video1',
                    title: 'Test Video 1',
                    description: 'Description 1'
                },
                {
                    mediaid: 'video2',
                    title: 'Test Video 2',
                    description: 'Description 2'
                }
            ]
        };

        describe('Successful requests', () => {
            it('should fetch playlist data successfully', async () => {
                const mockResponse = {
                    ok: true,
                    status: 200,
                    json: jest.fn().mockResolvedValue(mockPlaylistData)
                };

                global.fetch = jest.fn().mockResolvedValue(mockResponse);
                handleHttpError.mockImplementation(() => {});

                const result = await jwPlaylistSource.fetch(mockQuery);

                expect(global.fetch).toHaveBeenCalledWith(
                    `https://cdn.jwplayer.com/v2/playlists/${mockPlaylistId}`
                );
                expect(handleHttpError).toHaveBeenCalledWith(mockResponse);
                expect(mockResponse.json).toHaveBeenCalled();
                expect(result).toEqual(mockPlaylistData);
            });

            it('should construct correct URL with playlistId', async () => {
                const mockResponse = {
                    ok: true,
                    json: jest.fn().mockResolvedValue(mockPlaylistData)
                };

                global.fetch = jest.fn().mockResolvedValue(mockResponse);
                handleHttpError.mockImplementation(() => {});

                await jwPlaylistSource.fetch({ playlistId: 'abc123' });

                expect(global.fetch).toHaveBeenCalledWith(
                    'https://cdn.jwplayer.com/v2/playlists/abc123'
                );
            });
        });

        describe('HTTP error handling', () => {
            it('should handle HTTP 404 error', async () => {
                const mockResponse = {
                    ok: false,
                    status: 404,
                    statusText: 'Not Found'
                };

                const httpError = {
                    message: 'HTTP error! status: 404 Not Found',
                    statusCode: 404
                };

                global.fetch = jest.fn().mockResolvedValue(mockResponse);
                handleHttpError.mockImplementation(() => {
                    throw httpError;
                });

                const result = await jwPlaylistSource.fetch(mockQuery);

                expect(result).toEqual({});
                expect(consoleWarnSpy).toHaveBeenCalledWith(
                    `content/jwPlaylistSource Error: ${JSON.stringify(mockQuery)} - errorMsj:${httpError.message}`
                );
                expect(logger.push).toHaveBeenCalledWith(httpError, {
                    source: 'content/sources/jwPlaylistSource',
                    query: mockQuery
                });
            });

            it('should handle HTTP 500 error', async () => {
                const mockResponse = {
                    ok: false,
                    status: 500,
                    statusText: 'Internal Server Error'
                };

                const httpError = {
                    message: 'HTTP error! status: 500 Internal Server Error',
                    statusCode: 500
                };

                global.fetch = jest.fn().mockResolvedValue(mockResponse);
                handleHttpError.mockImplementation(() => {
                    throw httpError;
                });

                const result = await jwPlaylistSource.fetch(mockQuery);

                expect(result).toEqual({});
                expect(logger.push).toHaveBeenCalledWith(httpError, {
                    source: 'content/sources/jwPlaylistSource',
                    query: mockQuery
                });
            });

            it('should handle HTTP 403 error', async () => {
                const mockResponse = {
                    ok: false,
                    status: 403,
                    statusText: 'Forbidden'
                };

                const httpError = {
                    message: 'HTTP error! status: 403 Forbidden',
                    statusCode: 403
                };

                global.fetch = jest.fn().mockResolvedValue(mockResponse);
                handleHttpError.mockImplementation(() => {
                    throw httpError;
                });

                const result = await jwPlaylistSource.fetch(mockQuery);

                expect(result).toEqual({});
            });
        });

        describe('Network and other errors', () => {
            it('should handle network error', async () => {
                const networkError = new Error('Network request failed');

                global.fetch = jest.fn().mockRejectedValue(networkError);

                const result = await jwPlaylistSource.fetch(mockQuery);

                expect(result).toEqual({});
                expect(consoleWarnSpy).toHaveBeenCalledWith(
                    `content/jwPlaylistSource Error: ${JSON.stringify(mockQuery)} - errorMsj:${networkError.message}`
                );
                expect(logger.push).toHaveBeenCalledWith(networkError, {
                    source: 'content/sources/jwPlaylistSource',
                    query: mockQuery
                });
            });

            it('should handle JSON parse error', async () => {
                const parseError = new Error('Unexpected token in JSON');
                const mockResponse = {
                    ok: true,
                    json: jest.fn().mockRejectedValue(parseError)
                };

                global.fetch = jest.fn().mockResolvedValue(mockResponse);
                handleHttpError.mockImplementation(() => {});

                const result = await jwPlaylistSource.fetch(mockQuery);

                expect(result).toEqual({});
                expect(logger.push).toHaveBeenCalledWith(parseError, {
                    source: 'content/sources/jwPlaylistSource',
                    query: mockQuery
                });
            });

            it('should handle timeout error', async () => {
                const timeoutError = new Error('Request timeout');

                global.fetch = jest.fn().mockRejectedValue(timeoutError);

                const result = await jwPlaylistSource.fetch(mockQuery);

                expect(result).toEqual({});
                expect(consoleWarnSpy).toHaveBeenCalled();
                expect(logger.push).toHaveBeenCalled();
            });
        });

        describe('Edge cases', () => {
            it('should handle empty playlistId', async () => {
                const mockResponse = {
                    ok: true,
                    json: jest.fn().mockResolvedValue({})
                };

                global.fetch = jest.fn().mockResolvedValue(mockResponse);
                handleHttpError.mockImplementation(() => {});

                await jwPlaylistSource.fetch({ playlistId: '' });

                expect(global.fetch).toHaveBeenCalledWith(
                    'https://cdn.jwplayer.com/v2/playlists/'
                );
            });

            it('should handle undefined playlistId', async () => {
                const mockResponse = {
                    ok: true,
                    json: jest.fn().mockResolvedValue({})
                };

                global.fetch = jest.fn().mockResolvedValue(mockResponse);
                handleHttpError.mockImplementation(() => {});

                await jwPlaylistSource.fetch({ playlistId: undefined });

                expect(global.fetch).toHaveBeenCalledWith(
                    'https://cdn.jwplayer.com/v2/playlists/undefined'
                );
            });

            it('should handle special characters in playlistId', async () => {
                const specialPlaylistId = 'playlist-with-special-chars_123';
                const mockResponse = {
                    ok: true,
                    json: jest.fn().mockResolvedValue(mockPlaylistData)
                };

                global.fetch = jest.fn().mockResolvedValue(mockResponse);
                handleHttpError.mockImplementation(() => {});

                await jwPlaylistSource.fetch({ playlistId: specialPlaylistId });

                expect(global.fetch).toHaveBeenCalledWith(
                    `https://cdn.jwplayer.com/v2/playlists/${specialPlaylistId}`
                );
            });

            it('should return empty object when error has no message', async () => {
                const errorWithoutMessage = {};

                global.fetch = jest.fn().mockRejectedValue(errorWithoutMessage);

                const result = await jwPlaylistSource.fetch(mockQuery);

                expect(result).toEqual({});
            });
        });

        describe('Logger integration', () => {
            it('should log error with correct source and query', async () => {
                const testError = new Error('Test error');
                global.fetch = jest.fn().mockRejectedValue(testError);

                await jwPlaylistSource.fetch(mockQuery);

                expect(logger.push).toHaveBeenCalledWith(testError, {
                    source: 'content/sources/jwPlaylistSource',
                    query: mockQuery
                });
                expect(logger.push).toHaveBeenCalledTimes(1);
            });

            it('should log different queries correctly', async () => {
                const query1 = { playlistId: 'playlist-1' };
                const query2 = { playlistId: 'playlist-2' };
                const testError = new Error('Test error');

                global.fetch = jest.fn().mockRejectedValue(testError);

                await jwPlaylistSource.fetch(query1);
                await jwPlaylistSource.fetch(query2);

                expect(logger.push).toHaveBeenNthCalledWith(1, testError, {
                    source: 'content/sources/jwPlaylistSource',
                    query: query1
                });

                expect(logger.push).toHaveBeenNthCalledWith(2, testError, {
                    source: 'content/sources/jwPlaylistSource',
                    query: query2
                });
            });
        });
    });
});
