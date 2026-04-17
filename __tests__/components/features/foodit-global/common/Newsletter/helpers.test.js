import * as helpers from '../../../../../../components/features/foodit-global/common/Newsletter/helpers/helpers';

describe('newsletters helpers', () => {
    describe('getNewsletters', () => {
        beforeEach(() => {
            global.fetch = jest.fn();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should call fetch with correct URL and headers', async () => {
            global.fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce([])
            });

            await helpers.getNewsletters({
                accessToken: 'Bearer abc',
                token: 'tok123'
            });

            expect(global.fetch).toHaveBeenCalledWith(
                'https://api-newsletters.lanacion.com.ar/v3/Suscripciones',
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer abc',
                        'X-Token': 'tok123',
                        'Content-Type': 'application/json'
                    }
                }
            );
        });

        it('should return subscription state keyed by newsletter ID', async () => {
            global.fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce([
                    { servicio: { id: 243 }, suscripto: true },
                    { servicio: { id: 244 }, suscripto: false }
                ])
            });

            const result = await helpers.getNewsletters({
                accessToken: 'Bearer abc',
                token: 'tok123'
            });

            expect(result).toEqual({ 243: true, 244: false });
        });

        it('should ignore newsletters not in the local list', async () => {
            global.fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce([
                    { servicio: { id: 243 }, suscripto: true },
                    { servicio: { id: 999 }, suscripto: true }
                ])
            });

            const result = await helpers.getNewsletters({
                accessToken: 'Bearer abc',
                token: 'tok123'
            });

            expect(result).toEqual({ 243: true });
            expect(result[999]).toBeUndefined();
        });

        it('should return an empty object when API returns an empty array', async () => {
            global.fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce([])
            });

            const result = await helpers.getNewsletters({
                accessToken: 'Bearer abc',
                token: 'tok123'
            });

            expect(result).toEqual({});
        });

        it('should handle items without servicio.id gracefully', async () => {
            global.fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce([
                    { servicio: null, suscripto: true },
                    { servicio: { id: 244 }, suscripto: true }
                ])
            });

            const result = await helpers.getNewsletters({
                accessToken: 'Bearer abc',
                token: 'tok123'
            });

            expect(result).toEqual({ 244: true });
        });
    });

    describe('postNewsletter', () => {
        beforeEach(() => {
            global.fetch = jest.fn();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should call fetch with correct URL, method, and headers', async () => {
            const mockResponse = { ok: true };
            global.fetch.mockResolvedValueOnce(mockResponse);

            await helpers.postNewsletter({
                accessToken: 'Bearer abc',
                token: 'tok123',
                add: [243],
                remove: []
            });

            expect(global.fetch).toHaveBeenCalledWith(
                'https://api-newsletters.lanacion.com.ar/v3/Suscripciones',
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer abc',
                        'X-Token': 'tok123',
                        'Content-Type': 'application/json'
                    }
                })
            );
        });

        it('should send correct body when subscribing', async () => {
            global.fetch.mockResolvedValueOnce({ ok: true });

            await helpers.postNewsletter({
                accessToken: 'Bearer abc',
                token: 'tok123',
                add: [243],
                remove: []
            });

            const body = JSON.parse(global.fetch.mock.calls[0][1].body);
            expect(body).toEqual({
                serviciosAgregar: [243],
                serviciosRemover: []
            });
        });

        it('should send correct body when unsubscribing', async () => {
            global.fetch.mockResolvedValueOnce({ ok: true });

            await helpers.postNewsletter({
                accessToken: 'Bearer abc',
                token: 'tok123',
                add: [],
                remove: [243]
            });

            const body = JSON.parse(global.fetch.mock.calls[0][1].body);
            expect(body).toEqual({
                serviciosAgregar: [],
                serviciosRemover: [243]
            });
        });

        it('should include email in body when provided', async () => {
            global.fetch.mockResolvedValueOnce({ ok: true });

            await helpers.postNewsletter({
                accessToken: 'Bearer abc',
                token: 'tok123',
                add: [243],
                remove: [],
                email: 'user@example.com'
            });

            const body = JSON.parse(global.fetch.mock.calls[0][1].body);
            expect(body.email).toBe('user@example.com');
        });

        it('should not include email in body when empty string', async () => {
            global.fetch.mockResolvedValueOnce({ ok: true });

            await helpers.postNewsletter({
                accessToken: 'Bearer abc',
                token: 'tok123',
                add: [243],
                remove: [],
                email: ''
            });

            const body = JSON.parse(global.fetch.mock.calls[0][1].body);
            expect(body.email).toBeUndefined();
        });

        it('should return the fetch response', async () => {
            const mockResponse = { ok: true, status: 200 };
            global.fetch.mockResolvedValueOnce(mockResponse);

            const result = await helpers.postNewsletter({
                accessToken: 'Bearer abc',
                token: 'tok123',
                add: [243],
                remove: []
            });

            expect(result).toBe(mockResponse);
        });
    });
});
