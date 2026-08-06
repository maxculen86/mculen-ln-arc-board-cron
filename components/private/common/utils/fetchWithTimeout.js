/**
 * El `AbortError` se traduce a un `Error` propio con `isTimeout` para que el
 * consumidor pueda distinguir "tardó demasiado" de "el usuario canceló", que en
 * `fetch` comparten el mismo `AbortError`.
 */
export default async function fetchWithTimeout(url, options, timeoutMs) {
    // Sin timeout válido no se envuelve nada, como antes
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
        return fetch(url, options);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } catch (err) {
        if (err?.name === 'AbortError') {
            const timeoutError = new Error(
                `Timeout de ${timeoutMs}ms alcanzado en ${url}`
            );
            timeoutError.isTimeout = true;
            throw timeoutError;
        }
        throw err;
    } finally {
        clearTimeout(timeoutId);
    }
}
