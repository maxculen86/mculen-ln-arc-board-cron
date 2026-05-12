/**
 * API Layer — Chat IA Mundial 2026
 * -------------------------------------------------------
 * Endpoints:
 *   POST /api/session  → crea sesión, devuelve session_id
 *   POST /api/chat     → envía mensaje, devuelve respuesta IA
 *   POST /api/sq       → preguntas sugeridas (array de strings)
 */

const API_IA_MUNDIAL =
    'https://qa-mundial-iacore-487519182712.us-central1.run.app';

async function apiFetch(path, body) {
    const response = await fetch(`${API_IA_MUNDIAL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const error = new Error(
            `Mundial Chat API error [${path}]: ${response.status} ${response.statusText}`
        );
        error.status = response.status;
        throw error;
    }

    return response.json();
}

export async function createMundialSession({ userId }) {
    const data = await apiFetch('/api/session', { user_id: userId });
    if (!data.session_id) {
        throw new Error('Mundial Chat: no se recibió session_id');
    }
    return data;
}

export async function sendMundialChatMessage({ userId, sessionId, message }) {
    return apiFetch('/api/chat', {
        user_id: userId,
        session_id: sessionId,
        message
    });
}

export const FALLBACK_SUGGESTED_QUESTIONS = [
    '¿Cómo será el nuevo formato del torneo?',
    '¿Cuál es el próximo rival de Argentina?',
    '¿Quién es hasta el momento el goleador del torneo?'
];

export async function getSuggestedQuestions({ userId } = {}) {
    try {
        const data = await apiFetch('/api/sq', { user_id: userId });
        if (Array.isArray(data) && data.length > 0) {
            return data;
        }
        return FALLBACK_SUGGESTED_QUESTIONS;
    } catch {
        return FALLBACK_SUGGESTED_QUESTIONS;
    }
}

const MSG_OUT_OF_CONTEXT =
    'No tengo información disponible sobre ese tema. Estoy acá para ayudarte con temas relacionados al mundial de futbol 2026. Te invitamos a retomar el chat más adelante.';
const MSG_GENERIC_ERROR =
    'Ocurrió un error. Te invitamos a retomar el chat más adelante.';

export function resolveErrorMessage(err) {
    const status = err?.status;
    if (status === 403 || status === 400) return MSG_OUT_OF_CONTEXT;
    return MSG_GENERIC_ERROR;
}
