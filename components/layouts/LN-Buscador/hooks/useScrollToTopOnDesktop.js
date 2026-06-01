import { useCallback } from 'react';

const DESKTOP_BREAKPOINT = 1280;

export function useScrollToTopOnDesktop() {
    return useCallback(() => {
        if (!window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches)
            return;

        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        window.scrollTo({
            top: 0,
            behavior: prefersReduced ? 'instant' : 'smooth'
        });
    }, []);
}
