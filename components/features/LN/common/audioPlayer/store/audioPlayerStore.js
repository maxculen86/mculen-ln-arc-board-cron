import handleCookie from '../../../../../private/LN/common/utils/handleCookie';

// Preferencia de "Escuchar resumen": persiste la última elección del usuario en
// cookie por 7 días (setCookie espera la expiración en minutos).
const SUMMARY_COOKIE = 'lnAudioSummary';
const SUMMARY_COOKIE_MINUTES = 7 * 24 * 60;

const { getCookie, setCookie } = handleCookie();

const readSummaryPreference = () => getCookie(SUMMARY_COOKIE) === 'true';
const persistSummaryPreference = isSummary =>
    setCookie(
        SUMMARY_COOKIE,
        isSummary ? 'true' : 'false',
        SUMMARY_COOKIE_MINUTES
    );

const initialState = {
    isOpen: false,
    noteId: null,
    isPlaying: false,
    isSummary: false,
    // null = todavía no sabemos si la nota trae resumen (se resuelve al cargar
    // el player); true/false una vez conocido. El switch queda deshabilitado
    // mientras no sea true.
    summaryAvailable: null,
    showVariantIa: false,
    hasError: false
};

let state = { ...initialState };
const listeners = new Set();

const setState = partial => {
    state = { ...state, ...partial };
    listeners.forEach(l => l());
};

export const audioPlayerStore = {
    getSnapshot: () => state,
    subscribe: listener => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
    open: (noteId, opts = {}) =>
        setState({
            isOpen: true,
            noteId,
            isSummary: readSummaryPreference(),
            summaryAvailable: null,
            hasError: false,
            ...opts
        }),
    close: () =>
        setState({
            isOpen: false,
            noteId: null,
            isPlaying: false,
            summaryAvailable: null,
            hasError: false
        }),
    setPlaying: isPlaying => setState({ isPlaying }),
    setSummaryAvailable: summaryAvailable => setState({ summaryAvailable }),
    setSummary: isSummary => {
        persistSummaryPreference(isSummary);
        setState({ isSummary });
    },
    setError: () =>
        setState({ isOpen: false, isPlaying: false, hasError: true })
};
