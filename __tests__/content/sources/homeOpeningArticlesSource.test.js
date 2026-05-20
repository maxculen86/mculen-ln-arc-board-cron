jest.mock(
    '../../../content/sources/utils/homeOpeningArticles/transform',
    () => ({
        __esModule: true,
        extractAperturaHomeArticles: jest.fn()
    })
);

jest.mock('../../../components/private/common/utils/logger', () => ({
    __esModule: true,
    default: { push: jest.fn() }
}));

import homeOpeningArticlesSource from '../../../content/sources/homeOpeningArticlesSource';
import { extractAperturaHomeArticles } from '../../../content/sources/utils/homeOpeningArticles/transform';
import logger from '../../../components/private/common/utils/logger';

// Simula el cachedCall que Fusion inyecta en SSR: invoca la función pasándole
// el `query` declarado en options y devuelve el resultado (sin cachear, igual
// para todos los tests).
const cachedCallMock = () => jest.fn(async (_key, fn, opts) => fn(opts.query));

describe('homeOpeningArticlesSource', () => {
    const fakeJsonResponse = { items: [{ tipoSeccion: 'apertura' }] };

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(fakeJsonResponse)
        });
    });

    afterEach(() => {
        delete global.fetch;
    });

    it('exposes ttl of 120s', () => {
        expect(homeOpeningArticlesSource.ttl).toBe(120);
    });

    it('hits the hardcoded prod jsonv2 endpoint', async () => {
        extractAperturaHomeArticles.mockReturnValue([{ _id: 'a' }]);

        await homeOpeningArticlesSource.fetch(
            {},
            { cachedCall: cachedCallMock() }
        );

        expect(global.fetch).toHaveBeenCalledWith(
            'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=jsonv2'
        );
    });

    it('passes the parsed JSON through the extractor and returns content_elements', async () => {
        const articles = [{ _id: 'a' }, { _id: 'b' }];
        extractAperturaHomeArticles.mockReturnValue(articles);

        const result = await homeOpeningArticlesSource.fetch(
            {},
            { cachedCall: cachedCallMock() }
        );

        expect(extractAperturaHomeArticles).toHaveBeenCalledWith(
            fakeJsonResponse
        );
        expect(result).toEqual({ content_elements: articles });
    });

    it('invokes cachedCall with the right key, ttl=120 and independent=true', async () => {
        extractAperturaHomeArticles.mockReturnValue([]);
        const cachedCall = cachedCallMock();

        await homeOpeningArticlesSource.fetch({}, { cachedCall });

        expect(cachedCall).toHaveBeenCalledTimes(1);
        const [key, , opts] = cachedCall.mock.calls[0];
        expect(key).toBe('homeOpeningArticlesSource');
        expect(opts).toEqual({
            ttl: 120,
            independent: true
        });
    });

    it('returns an empty content_elements list on HTTP errors and logs the error', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });

        const result = await homeOpeningArticlesSource.fetch(
            {},
            { cachedCall: cachedCallMock() }
        );

        expect(result).toEqual({ content_elements: [] });
        expect(logger.push).toHaveBeenCalledTimes(1);
        expect(extractAperturaHomeArticles).not.toHaveBeenCalled();
    });

    it('returns empty list when the response body cannot be parsed', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockRejectedValue(new Error('boom'))
        });

        const result = await homeOpeningArticlesSource.fetch(
            {},
            { cachedCall: cachedCallMock() }
        );

        expect(result).toEqual({ content_elements: [] });
        expect(logger.push).toHaveBeenCalled();
    });
});
