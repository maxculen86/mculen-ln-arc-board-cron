import authorFetch from '../../../../../../__mocks__/data/author/authorFetch.json';
import chefsSource from '../../../../../../content/sources/chefsSource';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.lanacionar.arcpublishing.com',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com'
}));

jest.mock('../../../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

const imageResizerV2 =
    'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fsandbox.lanacionar%2FJ43DRG7ZGZCANB6PYJG2VQ35QY.jpg?&width=280&quality=70&smart=false';
const responseWithResizerV2 = {
    ...authorFetch,
    image: { url: imageResizerV2 }
};

describe('Content - Sources - Utils - FooditSources - chefsSource', () => {
    const { fetch } = chefsSource;

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(authorFetch)
            })
        );

        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should test fetch function of chefsSource', async () => {
        const query = { _id: 'juan-pravata-666', website: 'foodit' };

        const response = await fetch(query, {
            cachedCall: jest.fn()
        });

        expect(response).toEqual(responseWithResizerV2);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.sandbox.lanacionar.arcpublishing.com/author/v1/author-service?website=foodit&_id=juan-pravata-666',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: expect.any(AbortSignal)
            }
        );

        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should not include Authorization header when ARC_ACCESS_TOKEN is undefined', async () => {
        const query = { _id: 'juan-pravata-666', website: 'foodit' };

        await fetch(query, {
            cachedCall: jest.fn()
        });

        const callArgs = global.fetch.mock.calls[0][1];
        expect(callArgs.headers).toEqual({
            'Content-Type': 'application/json'
        });
        expect(callArgs.headers).not.toHaveProperty('Authorization');
    });

    it('should handle HTTP errors correctly', async () => {
        const query = { _id: 'invalid-chef', website: 'foodit' };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                statusText: 'Not Found',
                json: () => Promise.resolve({})
            })
        );

        const response = await fetch(query, {
            cachedCall: jest.fn()
        });

        expect(response).toEqual({});
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should handle network errors correctly', async () => {
        const query = { _id: 'juan-pravata-666', website: 'foodit' };

        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Network error'))
        );

        const response = await fetch(query, {
            cachedCall: jest.fn()
        });

        expect(response).toEqual({});
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should handle timeout errors correctly', async () => {
        const query = { _id: 'juan-pravata-666', website: 'foodit' };

        const abortError = new Error('The operation was aborted');
        abortError.name = 'AbortError';

        global.fetch = jest.fn(() => Promise.reject(abortError));

        const response = await fetch(query, {
            cachedCall: jest.fn()
        });

        expect(response).toEqual({});
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw error when _id is missing', async () => {
        const query = { website: 'foodit' };

        await expect(fetch(query, { cachedCall: jest.fn() })).rejects.toThrow(
            'El id de chef es necesario.'
        );
    });
});
