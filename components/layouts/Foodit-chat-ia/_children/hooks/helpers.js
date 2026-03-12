import { useCallback, useEffect, useRef, useState } from 'react';

export function useInactivityTimer({
    timeoutMs,
    onTimeout,
    enabled = true,
    autoStart = true
}) {
    const timerRef = useRef(null);
    const onTimeoutRef = useRef(onTimeout);

    useEffect(() => {
        onTimeoutRef.current = onTimeout;
    }, [onTimeout]);

    const stop = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const reset = useCallback(() => {
        if (!enabled) return;

        stop();
        timerRef.current = setTimeout(() => {
            onTimeoutRef.current();
        }, timeoutMs);
    }, [enabled, stop, timeoutMs]);

    useEffect(() => {
        if (enabled && autoStart) {
            reset();
        }

        return () => {
            stop();
        };
    }, [enabled, autoStart, reset, stop]);

    return {
        reset,
        stop
    };
}

export function useShowFuentesAfterMutation({
    ref,
    isGenerating,
    descripcion,
    isLastOutput,
    delayMs = 150
}) {
    const [showFuentes, setShowFuentes] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        if (!isLastOutput) {
            setShowFuentes(true);
            return undefined;
        }

        if (isGenerating) {
            setShowFuentes(false);
            return undefined;
        }

        let timeout;

        const observer = new MutationObserver(() => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setShowFuentes(true);
            }, delayMs);
        });

        observer.observe(node, {
            childList: true,
            subtree: true,
            characterData: true
        });

        return () => {
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, [isGenerating, descripcion, isLastOutput, ref, delayMs]);

    return showFuentes;
}

export function useViewportDirection(ref, options) {
    const [state, setState] = useState('in');

    useEffect(() => {
        const node = ref.current;
        if (!node || typeof IntersectionObserver === 'undefined') {
            return undefined;
        }

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setState('in');
                return;
            }

            const rootTop = entry.rootBounds?.top ?? 0;
            const rootBottom = entry.rootBounds?.bottom ?? window.innerHeight;

            if (entry.boundingClientRect.bottom < rootTop) {
                setState('above');
                return;
            }

            if (entry.boundingClientRect.top > rootBottom) {
                setState('below');
            }
        }, options);

        obs.observe(node);
        return () => obs.disconnect();
    }, [ref, options]);

    return state;
}
