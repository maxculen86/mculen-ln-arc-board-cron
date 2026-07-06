import { useEffect, useRef } from 'react';

export function useKeyboardNavigation({
    wrapperRef,
    containerRef,
    currentIndex,
    isMobile,
    itemCount,
    handleBack,
    handleNext
}) {
    const stateRef = useRef({ currentIndex, isMobile, handleBack, handleNext });

    useEffect(() => {
        stateRef.current = { currentIndex, isMobile, handleBack, handleNext };
    }, [currentIndex, isMobile, handleBack, handleNext]);

    useEffect(() => {
        const isFirst = () => stateRef.current.currentIndex === 0;
        const isLast = () => stateRef.current.currentIndex >= itemCount - 1;
        const isMobileView = () => stateRef.current.isMobile;

        const back = () => {
            stateRef.current.handleBack?.();
            return true;
        };

        const next = () => {
            stateRef.current.handleNext?.();
            return true;
        };

        const scrollToEdge = edge => {
            const el = containerRef?.current;
            if (!el) return true;

            const axis = isMobileView() ? 'top' : 'left';
            const size = isMobileView() ? el.scrollHeight : el.scrollWidth;

            el.scrollTo({
                [axis]: edge === 'end' ? size : 0,
                behavior: 'smooth'
            });
            return true;
        };

        const keyHandlers = {
            ArrowLeft: () => !isFirst() && back(),
            ArrowRight: () => !isLast() && next(),
            ArrowUp: () => isMobileView() && !isFirst() && back(),
            ArrowDown: () => isMobileView() && !isLast() && next(),
            Home: () => scrollToEdge('start'),
            End: () => scrollToEdge('end')
        };

        const handleKeyDown = event => {
            if (!wrapperRef?.current?.contains(document.activeElement)) return;

            const handled = keyHandlers[event.key]?.();
            if (handled) event.preventDefault();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [wrapperRef, containerRef, itemCount]);
}
