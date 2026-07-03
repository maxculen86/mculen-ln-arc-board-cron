import { useCallback, useState, useLayoutEffect } from 'react';

export default function useWrapDetect(containerRef, itemRef) {
    const [isWrapped, setIsWrapped] = useState(false);

    const measure = useCallback(() => {
        const container = containerRef && containerRef.current;
        const item = itemRef && itemRef.current;
        if (!container || !item) return;
        const baseline = container.firstElementChild;
        if (!baseline) return;
        const iRect = item.getBoundingClientRect();
        const bRect = baseline.getBoundingClientRect();
        const marginTop = parseFloat(getComputedStyle(item).marginTop) || 0;
        setIsWrapped(iRect.top - marginTop - bRect.top > 1);
    }, [containerRef, itemRef]);

    useLayoutEffect(() => {
        measure();
        const container = containerRef && containerRef.current;
        if (!container || typeof ResizeObserver === 'undefined')
            return undefined;
        const observer = new ResizeObserver(() => measure());
        observer.observe(container);
        return () => observer.disconnect();
    }, [measure, containerRef]);

    return isWrapped;
}
