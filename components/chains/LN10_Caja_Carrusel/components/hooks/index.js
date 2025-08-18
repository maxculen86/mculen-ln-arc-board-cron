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

    const viewportRef = useRef(null);

    useEffect(() => {
        const updateVisibleItems = () => {
            setVisibleItems(getVisibleItems(viewportRef, itemCarouselWidth));
        };

        updateVisibleItems();

        window.addEventListener('resize', updateVisibleItems);
        return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);

    return {
        containerRef: viewportRef,
        elementsToScroll: visibleItems,
        itemCarouselWidth
    };
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
                        if (videoIdObserved && videoTitle) {
                            handleEventSwipeVideo({
                                videoIdObserved,
                                videoTitle
                            });
                        }
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

export function useHandleNext({
    containerRef,
    showNext,
    isMobile,
    callback,
    currentIndex
}) {
    return useCallback(() => {
        const scrollOptions = isMobile
            ? { top: containerRef.current.offsetHeight }
            : { left: containerRef.current.offsetWidth };
        if (showNext || isMobile) {
            callback(currentIndex);
            containerRef?.current?.scrollBy({
                ...scrollOptions,
                behavior: 'smooth'
            });
        }
    }, [containerRef?.current, showNext, isMobile, currentIndex]);
}

export function useHandleBack({
    containerRef,
    showBack,
    callback,
    currentIndex
}) {
    return useCallback(() => {
        if (showBack) {
            callback();
            containerRef?.current?.scrollBy({
                left: -containerRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    }, [containerRef?.current, showBack, currentIndex]);
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

export function useUpdateVideoWidth({ containerRef, viewportWidth, isMobile }) {
    useEffect(() => {
        containerRef?.current?.parentElement?.style.setProperty(
            '--_video-width',
            `${containerRef?.current?.firstChild?.offsetWidth}px`
        );
    }, [containerRef?.current, viewportWidth, isMobile]);
}

export function useVideoJwCustomSettings({ isInView, loading, playerRef }) {
    useEffect(() => {
        if (isInView) {
            if (playerRef?.current?.getState() === 'idle') {
                playerRef?.current?.play();
            }
            const isMuted =
                window?.localStorage.getItem('jwplayer.mute') === 'true';
            playerRef?.current?.setMute(isMuted);
        } else {
            playerRef?.current?.stop();
        }
    }, [isInView, loading]);
}
