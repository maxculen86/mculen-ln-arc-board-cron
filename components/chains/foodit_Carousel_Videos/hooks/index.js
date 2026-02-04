import { useCallback, useEffect, useRef } from 'react';

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

export function useScrollTo({ containerRef, isMobile, currentIndex, isOpen }) {
    const initialIndexRef = useRef(currentIndex);
    const hasScrolledRef = useRef(false);
    const prevIsOpenRef = useRef(false);

    useEffect(() => {
        if (isOpen && !prevIsOpenRef.current) {
            initialIndexRef.current = currentIndex;
            hasScrolledRef.current = false;
        }
        prevIsOpenRef.current = isOpen;
    }, [isOpen, currentIndex]);

    useEffect(() => {
        if (!isOpen) return;

        const el = containerRef?.current;
        if (!el || hasScrolledRef.current) return;

        const waitForDimensions = () => {
            const height = el.offsetHeight;
            const width = el.offsetWidth;

            if (height === 0 && width === 0) {
                requestAnimationFrame(waitForDimensions);
                return;
            }

            const index = initialIndexRef.current;
            const scrollOptions = isMobile
                ? { top: height * index }
                : { left: width * index };

            el.scrollTo(scrollOptions);
            hasScrolledRef.current = true;
        };

        waitForDimensions();
    }, [isMobile, isOpen]);
}

export function useUpdateVideoWidth({ containerRef, viewportWidth, isMobile }) {
    useEffect(() => {
        containerRef?.current?.parentElement?.style.setProperty(
            '--_video-width',
            `${containerRef?.current?.firstChild?.offsetWidth}px`
        );
    }, [containerRef, viewportWidth, isMobile]);
}
