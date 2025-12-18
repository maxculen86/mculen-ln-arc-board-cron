import contentApiSource from './contentApiSource';

jest.mock(
    'fusion:environment',
    () => ({
        CONTENT_BASE: 'https://api.example.com',
        ARC_ACCESS_TOKEN: 'mock-token'
    }),
    { virtual: true }
);

jest.mock(
    './utils/redirect',
    () =>
        class Redirect extends Error {
            constructor(url, statusCode) {
                super(`Redirect to ${url}`);
                this.url = url;
                this.statusCode = statusCode;
            }
        }
);

describe('contentApiSource', () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });

    it('should fetch content and return data for website_url', async () => {
        const mockData = { some: 'data' };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        });

        const result = await contentApiSource.fetch({
            website_url: '/some-url',
            'arc-site': 'la-nacion-ar'
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/content/v4/?website_url=/some-url'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: 'Bearer mock-token'
                })
            })
        );
        expect(result).toEqual(mockData);
    });

    it('should throw Redirect error when redirect_url is present in response', async () => {
        const mockData = { redirect_url: '/new-url' };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        });

        try {
            await contentApiSource.fetch({
                website_url:
                    '//sandbox.lanacion.com.ar/trastornosdelaalimentacion',
                'arc-site': 'la-nacion-ar'
            });
        } catch (error) {
            expect(error.constructor.name).toBe('Redirect');
            expect(error.statusCode).toBe(301);
        }
    });

    it('should return undefined for source_id (as per original logic)', async () => {
        const mockData = { some: 'data' };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        });

        const result = await contentApiSource.fetch({
            source_id: '123',
            id: '123',
            'arc-site': 'la-nacion-ar'
        });

        expect(result).toBeUndefined();
    });

    it('should throw error on API failure', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
        });

        await expect(
            contentApiSource.fetch({
                website_url: '/error',
                'arc-site': 'la-nacion-ar'
            })
        ).rejects.toEqual({
            message: 'HTTP error! status: 500 Internal Server Error',
            statusCode: 500
        });
    });
});
