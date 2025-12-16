import { ARC_ACCESS_TOKEN } from 'fusion:environment';
import source from '../../../content/sources/signingServiceSource';
import logger from '../../../components/private/common/utils/logger';
import { handleHttpError } from '../../../components/private/common/utils/handleHttpError';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.example.com',
    ARC_ACCESS_TOKEN: 'mock-token'
}));

jest.mock('../../../components/private/common/utils/logger', () => ({
    push: jest.fn()
}));

jest.mock('../../../components/private/common/utils/handleHttpError', () => ({
    handleHttpError: jest.fn()
}));

const { fetch } = source;

describe('signingServiceSource', () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        global.fetch = jest.fn();
        logger.push.mockClear();
        handleHttpError.mockClear();
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });

    it('debería obtener datos del servicio de firma exitosamente', async () => {
        const mockResponse = { hash: 'signed-hash' };
        const params = { imageId: 'image-123' };

        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
            ok: true
        });

        const result = await fetch(params);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.example.com/signing-service/v2/sign/resizer/1?value=image-123',
            expect.objectContaining({
                method: 'GET',
                signal: expect.any(Object),
                headers: expect.objectContaining({
                    Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
                })
            })
        );
        expect(handleHttpError).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });

    it('debería codificar imageId correctamente', async () => {
        const params = { imageId: 'image/with/slashes' };
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({}),
            ok: true
        });

        await fetch(params);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('value=image%2Fwith%2Fslashes'),
            expect.anything()
        );
    });

    it('debería manejar errores de fetch y registrarlos', async () => {
        const error = new Error('Network fail');
        global.fetch.mockRejectedValue(error);
        const params = { imageId: 'image-123' };

        const result = await fetch(params);

        expect(logger.push).toHaveBeenCalledWith(
            error,
            {
                source: 'content/sources/signingServiceSource',
                imageId: 'image-123'
            },
            'la-nacion-ar'
        );
        expect(result).toEqual({});
    });

    it('debería manejar errores de timeout (AbortError)', async () => {
        const error = new Error('The operation was aborted');
        error.name = 'AbortError';
        global.fetch.mockRejectedValue(error);

        const params = { imageId: 'image-123' };

        const result = await fetch(params);

        expect(logger.push).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.stringContaining('Request timeout')
            }),
            expect.anything(),
            'la-nacion-ar'
        );
        expect(result).toEqual({});
    });
});
