import {
    API_IA_MUNDIAL,
    API_IA_CHAT_TIMEOUT,
    API_IA_SESSION_TIMEOUT
} from 'fusion:environment';
import fetchWithTimeout from '../../../../private/common/utils/fetchWithTimeout';

export const getAuthHeaders = accessToken => ({
    'Content-Type': 'application/json',
    'x-authorization': accessToken
});

// Los valores viajan como string desde `fusion:environment`
export const CHAT_TIMEOUT_MS = Number(API_IA_CHAT_TIMEOUT);
export const SESSION_TIMEOUT_MS = Number(API_IA_SESSION_TIMEOUT);

async function apiFetch(path, body, accessToken, timeoutMs) {
    const response = await fetchWithTimeout(
        `${API_IA_MUNDIAL}${path}`,
        {
            method: 'POST',
            headers: getAuthHeaders(accessToken),
            body: JSON.stringify(body)
        },
        timeoutMs
    );

    if (!response.ok) {
        const error = new Error(
            `Mundial Chat API error [${path}]: ${response.status} ${response.statusText}`
        );
        error.status = response.status;
        throw error;
    }

    return response.json();
}

export async function createMundialSession({ userId, accessToken }) {
    const data = await apiFetch(
        '/api/session',
        { user_id: userId },
        accessToken,
        SESSION_TIMEOUT_MS
    );
    if (!data.session_id) {
        throw new Error('Mundial Chat: no se recibió session_id');
    }
    return data;
}

export const RESPONSE_FORMAT = 'text';

export async function sendMundialChatMessage({
    userId,
    sessionId,
    message,
    accessToken
}) {
    return apiFetch(
        '/api/chat',
        {
            user_id: userId,
            session_id: sessionId,
            message,
            response_type: RESPONSE_FORMAT
        },
        accessToken,
        CHAT_TIMEOUT_MS
    );
}

export const FALLBACK_SUGGESTED_QUESTIONS = [
    '¿Cómo será el nuevo formato del torneo?',
    '¿Cuál es el próximo rival de Argentina?',
    '¿Quién es hasta el momento el goleador del torneo?'
];

export async function getSuggestedQuestions({
    userId,
    accessToken,
    query = ''
} = {}) {
    try {
        const data = await apiFetch(
            '/api/sq',
            { query, user_id: userId },
            accessToken,
            SESSION_TIMEOUT_MS
        );
        if (Array.isArray(data) && data.length > 0) {
            return data;
        }
        return FALLBACK_SUGGESTED_QUESTIONS;
    } catch {
        return FALLBACK_SUGGESTED_QUESTIONS;
    }
}

const MSG_OUT_OF_CONTEXT =
    'En este momento no puedo responder tu consulta. Intenta nuevamente más tarde.';

// Evita mostrar el código técnico al usuario ("Error: unusable_response").
export const MSG_GENERIC_ERROR =
    'Ocurrió un error. Te invitamos a retomar el chat más adelante.';

export const MSG_TIMEOUT =
    'La respuesta está demorando más de lo habitual. Probá de nuevo.';

export function resolveErrorMessage(err) {
    // Antes que el status: el corte por tiempo no tiene respuesta HTTP
    if (err?.isTimeout) return MSG_TIMEOUT;
    const status = err?.status;
    if (status === 403 || status === 400) return MSG_OUT_OF_CONTEXT;
    return MSG_GENERIC_ERROR;
}
