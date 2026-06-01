import { useEffect, useState } from 'react';

const SCRIPT_SRC =
    'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';

/**
 * Carga el script del player de BeyondWords una sola vez y de forma compartida.
 * Si el script ya está presente (otra instancia lo cargó antes), no lo vuelve
 * a descargar y resuelve en cuanto `window.BeyondWords` está disponible.
 *
 * @returns {boolean} isLoaded - true cuando el global BeyondWords está listo.
 */
export const useBeyondWordsScript = () => {
    const [isLoaded, setIsLoaded] = useState(
        () => typeof window !== 'undefined' && !!window.BeyondWords
    );

    useEffect(() => {
        if (isLoaded) return undefined;

        const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
        if (existing) {
            if (window.BeyondWords) {
                setIsLoaded(true);
            } else {
                existing.addEventListener('load', () => setIsLoaded(true));
            }
            return undefined;
        }

        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = SCRIPT_SRC;
        script.onload = () => setIsLoaded(true);
        document.head.appendChild(script);

        return undefined;
    }, [isLoaded]);

    return isLoaded;
};
