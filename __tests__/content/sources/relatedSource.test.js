import { ARC_ACCESS_TOKEN } from 'fusion:environment';
import source from '../../../content/sources/relatedSource';
import logger from '../../../components/private/common/utils/logger';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.example.com',
    ARC_ACCESS_TOKEN: 'mock-token'
}));

jest.mock('../../../components/private/common/utils/logger', () => ({
    push: jest.fn()
}));

const { fetch } = source;

describe('relatedSource', () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        global.fetch = jest.fn();
        logger.push.mockClear();
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });

    it('debería obtener el contenido relacionado exitosamente', async () => {
        const mockResponse = {
            content_elements: [{ _id: '123', headlines: { basic: 'Test' } }]
        };
        const query = {
            'arc-site': 'la-nacion-ar',
            id: 'article-id',
            includedFields: 'headlines.basic',
            notPublished: 'true'
        };

        global.fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse)
        });

        const result = await fetch(query);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining(
                'https://api.example.com/content/v4/stories/?website=la-nacion-ar&published=false&_id=article-id&included_fields=headlines.basic'
            ),
            expect.objectContaining({
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
                }
            })
        );
        expect(result).toEqual(mockResponse);
    });

    it('debería manejar parámetros opcionales faltantes', async () => {
        const mockResponse = {};

        const query = {
            'arc-site': 'la-nacion-ar',
            id: 'article-id',
            notPublished: false
        };

        global.fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse)
        });

        await fetch(query);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining(
                'https://api.example.com/content/v4/stories/?website=la-nacion-ar&_id=article-id'
            ),
            expect.anything()
        );
    });

    it('debería manejar errores de fetch correctamente', async () => {
        const error = new Error('Network error');
        global.fetch.mockRejectedValue(error);
        const query = { 'arc-site': 'la-nacion-ar', id: 'article-id' };

        const result = await fetch(query);

        expect(logger.push).toHaveBeenCalledWith(
            error,
            {
                source: 'content/sources/relatedSource',
                query,
                url: expect.any(String)
            },
            'la-nacion-ar'
        );
        expect(result).toEqual({});
    });

    it('debería lanzar y registrar error cuando la respuesta no es ok', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Server Error'
        });
        const query = { 'arc-site': 'la-nacion-ar', id: 'article-id' };

        const result = await fetch(query);

        expect(logger.push).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'HTTP 500: Server Error'
            }),
            expect.anything(),
            'la-nacion-ar'
        );
        expect(result).toEqual({});
    });
});
