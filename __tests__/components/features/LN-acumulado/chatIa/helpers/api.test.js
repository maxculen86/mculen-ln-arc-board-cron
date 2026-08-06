// Sin esto los valores llegan `undefined`: `fusion:environment` lo inyecta
// Fusion en el build y en test no existe
jest.mock('fusion:environment', () => ({
    API_IA_MUNDIAL: 'https://mundial-chatbot.test',
    API_IA_CHAT_TIMEOUT: '60000',
    API_IA_SESSION_TIMEOUT: '10000'
}));

import {
    CHAT_TIMEOUT_MS,
    createMundialSession,
    FALLBACK_SUGGESTED_QUESTIONS,
    getSuggestedQuestions,
    resolveErrorMessage,
    RESPONSE_FORMAT,
    sendMundialChatMessage,
    SESSION_TIMEOUT_MS
} from '../../../../../../components/features/LN-acumulado/chatIa/helpers/api';

const okResponse = data => ({
    ok: true,
    status: 200,
    json: async () => data
});

const errorResponse = status => ({
    ok: false,
    status,
    statusText: 'error',
    json: async () => ({})
});

const bodyOf = call => JSON.parse(call[1].body);

// Babel transpila los `async` a generadores, así que el cuerpo del helper
// arranca en un microtask: sin drenarlos, el reloj se mueve antes de que el
// `fetch` (y su `setTimeout`) existan
const flushUntilFetchStarts = async () => {
    for (let i = 0; i < 10 && !global.fetch.mock.calls.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.resolve();
    }
};

beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
});

describe('chatIa api helpers', () => {
    describe('sendMundialChatMessage', () => {
        it('should ask for a plain text response', async () => {
            global.fetch.mockResolvedValue(okResponse({}));

            await sendMundialChatMessage({
                userId: 'u-1',
                sessionId: 's-1',
                message: 'hola',
                accessToken: 'jwt'
            });

            const body = bodyOf(global.fetch.mock.calls[0]);
            // Contra la constante y no contra el literal: es la misma que alimenta el render
            expect(body.response_type).toBe(RESPONSE_FORMAT);
            expect(RESPONSE_FORMAT).toBe('text');
            expect(body).toMatchObject({
                user_id: 'u-1',
                session_id: 's-1',
                message: 'hola'
            });
        });

        it('should send the token in the x-authorization header', async () => {
            global.fetch.mockResolvedValue(okResponse({}));

            await sendMundialChatMessage({ accessToken: 'jwt' });

            const [, options] = global.fetch.mock.calls[0];
            expect(options.headers['x-authorization']).toBe('jwt');
        });

        it('should propagate the HTTP status so resolveErrorMessage can pick the copy', async () => {
            global.fetch.mockResolvedValue(errorResponse(403));

            await expect(sendMundialChatMessage({})).rejects.toMatchObject({
                status: 403
            });
        });
    });

    describe('createMundialSession', () => {
        it('should send the user id required by the new contract', async () => {
            global.fetch.mockResolvedValue(okResponse({ session_id: 's-1' }));

            await createMundialSession({ userId: 'u-1', accessToken: 'jwt' });

            expect(bodyOf(global.fetch.mock.calls[0])).toEqual({
                user_id: 'u-1'
            });
        });

        it('should throw when the response has no session id', async () => {
            global.fetch.mockResolvedValue(okResponse({}));

            await expect(createMundialSession({})).rejects.toThrow(
                'session_id'
            );
        });
    });

    describe('getSuggestedQuestions', () => {
        // Sin `query` el endpoint responde 422 y las sugerencias caen al fallback en silencio
        it('should always send the query field, even when empty', async () => {
            global.fetch.mockResolvedValue(okResponse(['una']));

            await getSuggestedQuestions({ userId: 'u-1', accessToken: 'jwt' });

            const body = bodyOf(global.fetch.mock.calls[0]);
            expect(body).toEqual({ query: '', user_id: 'u-1' });
        });

        it('should forward the query when one is given', async () => {
            global.fetch.mockResolvedValue(okResponse(['una']));

            await getSuggestedQuestions({
                userId: 'u-1',
                accessToken: 'jwt',
                query: 'mundial'
            });

            expect(bodyOf(global.fetch.mock.calls[0]).query).toBe('mundial');
        });

        it('should return the bare array that /api/sq responds with', async () => {
            global.fetch.mockResolvedValue(okResponse(['una', 'otra']));

            await expect(getSuggestedQuestions({})).resolves.toEqual([
                'una',
                'otra'
            ]);
        });

        it('should fall back to the hardcoded questions when the API fails', async () => {
            global.fetch.mockRejectedValue(new Error('red caída'));

            await expect(getSuggestedQuestions({})).resolves.toEqual(
                FALLBACK_SUGGESTED_QUESTIONS
            );
        });

        it('should fall back to the hardcoded questions when the API returns an empty array', async () => {
            global.fetch.mockResolvedValue(okResponse([]));

            await expect(getSuggestedQuestions({})).resolves.toEqual(
                FALLBACK_SUGGESTED_QUESTIONS
            );
        });
    });

    describe('resolveErrorMessage', () => {
        it.each([400, 403])(
            'should use the out-of-context copy for %i',
            status => {
                expect(resolveErrorMessage({ status })).toMatch(
                    /no puedo responder tu consulta/
                );
            }
        );

        it.each([500, undefined])(
            'should use the generic copy for %s',
            status => {
                expect(resolveErrorMessage({ status })).toMatch(
                    /Ocurrió un error/
                );
            }
        );

        // El corte por tiempo no tiene respuesta HTTP, así que sin la rama de
        // `isTimeout` cae en el genérico "retomá el chat más adelante", que
        // sugiere esperar justo cuando reintentar es lo que corresponde
        it('should use the timeout copy when the request was cut by time', () => {
            expect(resolveErrorMessage({ isTimeout: true })).toMatch(
                /demorando más de lo habitual/
            );
        });
    });

    describe('timeouts', () => {
        // `/api/chat` genera con el LLM: si compartiera el timeout corto de
        // sesión, cortaría respuestas largas que están llegando bien
        it('should give the chat endpoint more room than the session one', () => {
            expect(CHAT_TIMEOUT_MS).toBeGreaterThan(SESSION_TIMEOUT_MS);
        });

        it.each([
            ['sendMundialChatMessage', sendMundialChatMessage, CHAT_TIMEOUT_MS],
            ['createMundialSession', createMundialSession, SESSION_TIMEOUT_MS]
        ])('should cut a hung %s by time', async (_label, call, timeoutMs) => {
            jest.useFakeTimers();
            global.fetch.mockImplementation(
                (url, options) =>
                    new Promise((resolve, reject) => {
                        options?.signal?.addEventListener('abort', () => {
                            const abortError = new Error('Aborted');
                            abortError.name = 'AbortError';
                            reject(abortError);
                        });
                    })
            );

            const pending = call({ accessToken: 'jwt' });
            const assertion = expect(pending).rejects.toMatchObject({
                isTimeout: true
            });

            await flushUntilFetchStarts();

            // Un tick antes del corte el request sigue vivo: prueba que el valor
            // que se aplica es el de este endpoint y no otro
            jest.advanceTimersByTime(timeoutMs - 1);
            expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(false);

            jest.advanceTimersByTime(1);
            await assertion;

            jest.useRealTimers();
        });
    });
});
