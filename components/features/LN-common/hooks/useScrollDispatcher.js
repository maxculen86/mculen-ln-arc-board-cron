import { useEffect } from 'react';
import {
    runTriggers,
    getScrollPercentBetweenElements,
    getOffsets
} from './helpers';

const listeners = [];

export const registerScrollTrigger = ({
    id, // Por si se repiten thresholds
    type, // 'percentage' o 'position'
    threshold, // (% o px) cuando se dispara el callback
    thresholdStep, // intervalos cada cuanto se dispara el callback (solo %)
    callback
}) => {
    if (!['position', 'percentage'].includes(type)) return;
    listeners.push({ id, type, threshold, thresholdStep, callback });
};

/**
 *Hook con un listener por pagina que ejecuta callbacks acorde a los triggers registrados.
 */
const useScrollDispatcher = ({ startSelector, endSelector } = {}) => {
    useEffect(() => {
        const alreadyDispatched = new Set();

        // Si no se envian selectores, considera el documento entero
        const startEl = startSelector
            ? document.querySelector(startSelector)
            : document.documentElement;

        const endEl = endSelector ? document.querySelector(endSelector) : null;

        let ticking = false; // Para no llamar tanto a requestAnimationFrame

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY + window.innerHeight;

                const { startOffset, endOffset } = getOffsets(startEl, endEl);

                const scrollPercent = getScrollPercentBetweenElements(
                    scrollY,
                    startOffset,
                    endOffset
                );

                runTriggers(
                    listeners,
                    scrollY,
                    scrollPercent,
                    alreadyDispatched
                );

                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [startSelector, endSelector]);
};

export default useScrollDispatcher;
