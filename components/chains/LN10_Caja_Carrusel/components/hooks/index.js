import { useCallback, useEffect, useRef, useState } from 'react';
import { handleEventSwipeVideo } from '../helpers';

export function useGetElementsToScroll() {
    const [visibleItems, setVisibleItems] = useState(0);
    const itemCarouselWidth = 280;

    const getVisibleItems = (containerRef, itemWidth) => {
        if (containerRef?.current) {
            const containerWidth = containerRef.current.offsetWidth;
            return Math.floor(containerWidth / itemWidth);
        }
        return 0;
    };

    const containerRef = useRef(null);

    useEffect(() => {
        const updateVisibleItems = () => {
            setVisibleItems(getVisibleItems(containerRef, itemCarouselWidth));
        };

        updateVisibleItems();

        window.addEventListener('resize', updateVisibleItems);
        return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);

    return { containerRef, elementsToScroll: visibleItems, itemCarouselWidth };
}

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

                        const videoIdObserved =
                            entry.target.getAttribute('data-scroller-id');

                        const videoTitle =
                            entry.target.getAttribute('data-title');

                        handleEventSwipeVideo({
                            videoIdObserved,
                            videoTitle
                        });
                    }
                });
            },
            {
                threshold: 0.9
            }
        );

        if (containerRef?.current) {
            const childs = containerRef?.current?.childNodes;
            childs?.forEach(childRef => {
                if (childRef) {
                    observer.observe(childRef);
                }
            });
        }

        return () => {
            observer.disconnect();
        };
    }, [containerRef?.current]);
}

export function useHandleNext({ containerRef, showNext }) {
    return useCallback(() => {
        if (showNext) {
            containerRef?.current?.scrollBy({
                left: containerRef?.current?.offsetWidth,
                behavior: 'smooth'
            });
        }
    }, [containerRef?.current, showNext]);
}

export function useHandleBack({ containerRef, showBack }) {
    return useCallback(() => {
        if (showBack) {
            containerRef?.current?.scrollBy({
                left: -containerRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    }, [containerRef?.current, showBack]);
}

export function useScrollTo({ containerRef, isMobile, currentIndex }) {
    useEffect(() => {
        const scrollOptions = isMobile
            ? { top: containerRef.current.offsetHeight * currentIndex }
            : { left: containerRef.current.offsetWidth * currentIndex };

        containerRef?.current?.scrollTo({
            ...scrollOptions
        });
    }, [containerRef?.current, isMobile]);
}

export function useUpdateVideoWidth({ containerRef, isMobile }) {
    useEffect(() => {
        containerRef?.current?.parentElement?.style.setProperty(
            '--_video-width',
            `${containerRef?.current?.firstChild?.offsetWidth}px`
        );
    }, [containerRef?.current, isMobile]);
}
