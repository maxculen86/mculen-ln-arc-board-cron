import { useCallback, useEffect } from 'react';

export function useObserverItems({ containerRef, setCurrentIndex }) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Number(
                            entry.target.getAttribute('data-scroller-index')
                        );
                        setCurrentIndex(index);
                    }
                });
            },
            { threshold: 0.9 }
        );

        if (containerRef?.current) {
            containerRef.current.childNodes.forEach(node => {
                if (node) observer.observe(node);
            });
        }

        return () => observer.disconnect();
    }, [containerRef]);
}

export function useHandleBack({ containerRef, showBack, isMobile }) {
    return useCallback(() => {
        const el = containerRef?.current;
        if (!el) return;

        if (!showBack && !isMobile) return;

        const scrollOptions = isMobile
            ? { top: -el.offsetHeight }
            : { left: -el.offsetWidth };

        el.scrollBy({
            ...scrollOptions,
            behavior: 'smooth'
        });
    }, [containerRef, showBack, isMobile]);
}

export function useHandleNext({ containerRef, showNext, isMobile }) {
    return useCallback(() => {
        const el = containerRef?.current;
        if (!el) return;

        if (!showNext && !isMobile) return;

        const scrollOptions = isMobile
            ? { top: el.offsetHeight }
            : { left: el.offsetWidth };

        el.scrollBy({
            ...scrollOptions,
            behavior: 'smooth'
        });
    }, [containerRef, showNext, isMobile]);
}

export function useScrollTo({ containerRef, isMobile, currentIndex }) {
    useEffect(() => {
        const scrollOptions = isMobile
            ? { top: containerRef.current.offsetHeight * currentIndex }
            : { left: containerRef.current.offsetWidth * currentIndex };
        containerRef?.current?.scrollTo({
            ...scrollOptions
        });
    }, [containerRef, isMobile]);
}

export function useUpdateVideoWidth({ containerRef, viewportWidth, isMobile }) {
    useEffect(() => {
        containerRef?.current?.parentElement?.style.setProperty(
            '--_video-width',
            `${containerRef?.current?.firstChild?.offsetWidth}px`
        );
    }, [containerRef, viewportWidth, isMobile]);
}
