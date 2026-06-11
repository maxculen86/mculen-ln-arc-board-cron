// Store singleton del Resumen con IA. Maneja el estado de apertura del panel
// (isOpen): vive a nivel de módulo para dispararse imperativamente desde
// cualquier trigger (toolbar LN10, ícono del sharebar LN9) sin estar en el árbol
// React. El dato del resumen (summaryData) sale del contenido vía prop del panel,
// no del store, para tener una única fuente de verdad.

const initialState = {
    isOpen: false,
    // evento de cierre que registra el trigger al abrir, lo emite la X del panel
    closeEvent: null
};

let state = { ...initialState };
const listeners = new Set();

const setState = partial => {
    state = { ...state, ...partial };
    listeners.forEach(l => l());
};

export const iaSummaryStore = {
    getSnapshot: () => state,
    subscribe: listener => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
    open: (closeEvent = null) => setState({ isOpen: true, closeEvent }),
    close: () => setState({ isOpen: false, closeEvent: null }),
    toggle: () => setState({ isOpen: !state.isOpen })
};
