import fetchWithTimeout from '../../../../../components/private/common/utils/fetchWithTimeout';

const OK = { ok: true, status: 200 };

// `fetch` que solo resuelve si nadie abortó: modela el request colgado, que es
// el caso que el timeout existe para cortar
const hangingFetch = () =>
    jest.fn(
        (url, options) =>
            new Promise((resolve, reject) => {
                options?.signal?.addEventListener('abort', () => {
                    const abortError = new Error('Aborted');
                    abortError.name = 'AbortError';
                    reject(abortError);
                });
            })
    );

beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
});

afterEach(() => {
    jest.useRealTimers();
});

describe('fetchWithTimeout', () => {
    it('should resolve with the response when it arrives before the timeout', async () => {
        global.fetch = jest.fn().mockResolvedValue(OK);

        await expect(
            fetchWithTimeout('https://api.test/chat', { method: 'POST' }, 1000)
        ).resolves.toBe(OK);
    });

    it('should forward the original options along with the abort signal', async () => {
        global.fetch = jest.fn().mockResolvedValue(OK);
        const options = { method: 'POST', body: '{"a":1}' };

        await fetchWithTimeout('https://api.test/chat', options, 1000);

        const [url, sentOptions] = global.fetch.mock.calls[0];
        expect(url).toBe('https://api.test/chat');
        expect(sentOptions).toMatchObject(options);
        expect(sentOptions.signal).toBeInstanceOf(AbortSignal);
    });

    it('should abort the request once the timeout elapses', async () => {
        global.fetch = hangingFetch();

        const pending = fetchWithTimeout('https://api.test/chat', {}, 1000);
        const assertion = expect(pending).rejects.toThrow(
            'Timeout de 1000ms alcanzado en https://api.test/chat'
        );

        jest.advanceTimersByTime(1000);

        await assertion;
        expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(true);
    });

    // Sin esto el consumidor no puede separar "tardó demasiado" de cualquier
    // otro fallo de red, y el copy que ve el usuario termina siendo el genérico
    it('should flag the timeout error so the caller can tell it apart', async () => {
        global.fetch = hangingFetch();

        const pending = fetchWithTimeout('https://api.test/chat', {}, 1000);
        const assertion = expect(pending).rejects.toMatchObject({
            isTimeout: true
        });

        jest.advanceTimersByTime(1000);

        await assertion;
    });

    it('should let a real network failure through untouched', async () => {
        const networkError = new Error('Failed to fetch');
        global.fetch = jest.fn().mockRejectedValue(networkError);

        await expect(
            fetchWithTimeout('https://api.test/chat', {}, 1000)
        ).rejects.toBe(networkError);
    });

    it('should clear the timer when the response arrives in time', async () => {
        global.fetch = jest.fn().mockResolvedValue(OK);

        await fetchWithTimeout('https://api.test/chat', {}, 1000);

        expect(jest.getTimerCount()).toBe(0);
    });

    // Un env mal seteado llega como `NaN`: abortar en el tick 0 dejaría el chat
    // muerto en todos los entornos a la vez
    it.each([
        ['NaN', Number('no-es-un-numero')],
        ['undefined', undefined],
        ['cero', 0],
        ['negativo', -1]
    ])(
        'should fall back to a plain fetch when the timeout is %s',
        async (_label, timeout) => {
            global.fetch = jest.fn().mockResolvedValue(OK);

            await expect(
                fetchWithTimeout('https://api.test/chat', {}, timeout)
            ).resolves.toBe(OK);

            expect(global.fetch.mock.calls[0][1].signal).toBeUndefined();
        }
    );
});
