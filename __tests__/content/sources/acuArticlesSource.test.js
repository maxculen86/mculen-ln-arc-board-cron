import acuArticlesSource from '../../../content/sources/acuArticlesSource';
import logger from '../../../components/private/common/utils/logger';
import transform from '../../../content/sources/utils/acuArticlesSource/transform';

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});
jest.mock('../../../content/sources/utils/acuArticlesSource/transform');

const loggerPush = jest.spyOn(logger, 'push');

beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() => {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ data: [] })
        });
    });
});

describe('Content Sources - Acu Articles Source', () => {
    const { fetch } = acuArticlesSource;

    const query = {
        'arc-site': 'la-nacion-ar',
        sectionId: '123',
        size: '30',
        page: '1'
    };

    it('Should return transformed data from the API response', async () => {
        const mockCachedCall = jest.fn();
        const mockApiResponse = { data: [] };
        const mockTransformedResponse = { data: [] };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockApiResponse)
        });

        transform.mockReturnValueOnce(mockTransformedResponse);

        const response = await fetch(query, { cachedCall: mockCachedCall });

        expect(global.fetch).toBeCalledTimes(1);
        expect(transform).toBeCalledWith(
            mockApiResponse,
            query,
            mockCachedCall
        );
        expect(response).toBe(mockTransformedResponse);
    });

    it('Should log an error if the API request fails', async () => {
        const mockCachedCall = jest.fn();
        const mockError = new Error('Mocked Error');

        global.fetch.mockRejectedValueOnce(mockError);

        await fetch(query, { cachedCall: mockCachedCall });

        expect(loggerPush).toBeCalledTimes(1);
        expect(loggerPush).toBeCalledWith(mockError, {
            source: 'content/sources/acuArticlesSource',
            query
        });
    });

    it('Should handle partial queries gracefully', async () => {
        const partialQuery = {
            'arc-site': 'la-nacion-ar',
            tagId: '456',
            size: '15',
            page: '2'
        };

        const mockCachedCall = jest.fn();
        const mockApiResponse = { data: [] };
        const mockTransformedResponse = { data: [] };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockApiResponse)
        });

        transform.mockReturnValueOnce(mockTransformedResponse);

        const response = await fetch(partialQuery, {
            cachedCall: mockCachedCall
        });

        expect(global.fetch).toBeCalledTimes(1);
        expect(transform).toBeCalledWith(
            mockApiResponse,
            partialQuery,
            mockCachedCall
        );
        expect(response).toBe(mockTransformedResponse);
    });
});
