import { useEffect, useCallback } from 'react';
import { markProgrammaticMute } from '../../../../private/common/utils/videoPlayerHelper';
import get from '../../../../private/common/utils/get';
import { armUserIntent, isWithinUserIntentWindow } from './userIntentRegistry';

const USER_GESTURE_EVENTS = ['pointerdown', 'touchstart', 'wheel', 'keydown'];

export function useObserverItems({
    containerRef,
    setCurrentIndex,
    isInitialPositioningRef
}) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (get(isInitialPositioningRef, 'current')) return;
                        if (!isWithinUserIntentWindow(containerRef?.current)) {
                            return;
                        }
                        const index = Number(
                            entry.target.getAttribute('data-scroller-index')
                        );
                        setCurrentIndex(index);
                    }
                });
            },
            {
                threshold: 0.9
            }
        );

        const container = containerRef?.current;
        const handleUserGesture = () => armUserIntent(container);

        const handleScrollMomentum = () => {
            if (isWithinUserIntentWindow(container)) {
                armUserIntent(container);
            }
        };

        if (container) {
            const childs = container.childNodes;
            childs?.forEach(childRef => {
                if (
                    typeof get(childRef, 'hasAttribute') === 'function' &&
                    childRef.hasAttribute('data-scroller-index')
                ) {
                    observer.observe(childRef);
                }
            });

            USER_GESTURE_EVENTS.forEach(eventName => {
                container.addEventListener(eventName, handleUserGesture, {
                    passive: true
                });
            });
            container.addEventListener('scroll', handleScrollMomentum, {
                passive: true
            });
        }

        return () => {
            observer.disconnect();
            if (container) {
                USER_GESTURE_EVENTS.forEach(eventName => {
                    container.removeEventListener(eventName, handleUserGesture);
                });
                container.removeEventListener('scroll', handleScrollMomentum);
            }
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
            armUserIntent(containerRef?.current);
            containerRef?.current?.scrollBy({
                ...scrollOptions,
                behavior: 'smooth'
            });
        }
    }, [containerRef?.current, showNext, isMobile, callback, currentIndex]);
}

export function useHandleBack({
    containerRef,
    showBack,
    isMobile,
    callback,
    currentIndex
}) {
    return useCallback(() => {
        const scrollOptions = isMobile
            ? { top: -containerRef.current.offsetHeight }
            : { left: -containerRef.current.offsetWidth };
        if (showBack && currentIndex > 0) {
            callback();
            armUserIntent(containerRef?.current);
            containerRef?.current?.scrollBy({
                ...scrollOptions,
                behavior: 'smooth'
            });
        }
    }, [containerRef?.current, showBack, isMobile, callback, currentIndex]);
}

// Extracted from useScrollTo's effect to keep it under Sonar's cognitive
// budget. A jump straight from the origin uses instant behavior so the first
// paint does not animate.
function applyScrollJump({
    container,
    isMobile,
    target,
    current,
    isInitialPositioningRef
}) {
    const isJumpFromOrigin = current === 0 && target !== 0;
    const { style } = container;
    const previousScrollBehavior = style.scrollBehavior;

    if (isJumpFromOrigin) {
        if (isInitialPositioningRef) {
            // eslint-disable-next-line no-param-reassign
            isInitialPositioningRef.current = true;
        }
        style.scrollBehavior = 'auto';
    }

    const behavior = isJumpFromOrigin ? 'instant' : 'auto';
    container.scrollTo(
        isMobile ? { top: target, behavior } : { left: target, behavior }
    );

    if (isJumpFromOrigin) {
        style.scrollBehavior = previousScrollBehavior;
    }
}

export function useScrollTo({
    containerRef,
    isMobile,
    currentIndex,
    isInitialPositioningRef
}) {
    // Read the ref lazily, not once into a variable. The effect must read it
    // when it runs (after commit, node already mounted); reading it earlier,
    // during render, would capture null and the initial scroll never fires.
    const readContainer = () => get(containerRef, 'current');

    useEffect(() => {
        const container = readContainer();
        if (!container) return undefined;

        let cancelled = false;
        let rafId;
        let clearRafId;

        const clearInitialPositioning = () => {
            if (!isInitialPositioningRef) return;
            if (clearRafId) return;
            clearRafId = requestAnimationFrame(() => {
                clearRafId = requestAnimationFrame(() => {
                    if (isInitialPositioningRef) {
                        // eslint-disable-next-line no-param-reassign
                        isInitialPositioningRef.current = false;
                    }
                    clearRafId = null;
                });
            });
        };

        const scrollToTarget = () => {
            const step = isMobile
                ? container.offsetHeight
                : container.offsetWidth;
            const target = step * currentIndex;
            const current = isMobile
                ? container.scrollTop
                : container.scrollLeft;

            const withinTolerance =
                step > 0 && Math.abs(current - target) <= step * 0.5;

            if (!withinTolerance) {
                applyScrollJump({
                    container,
                    isMobile,
                    target,
                    current,
                    isInitialPositioningRef
                });
            }

            if (step > 0) clearInitialPositioning();
        };

        const cleanup = () => {
            cancelled = true;
            if (rafId) cancelAnimationFrame(rafId);
            if (clearRafId) cancelAnimationFrame(clearRafId);
            if (isInitialPositioningRef) {
                // eslint-disable-next-line no-param-reassign
                isInitialPositioningRef.current = false;
            }
        };

        const step = isMobile ? container.offsetHeight : container.offsetWidth;
        if (step > 0) {
            scrollToTarget();
            return cleanup;
        }

        let retryCount = 0;
        const retry = () => {
            if (cancelled) return;
            const currentStep = isMobile
                ? container.offsetHeight
                : container.offsetWidth;
            if (currentStep <= 0) {
                rafId = requestAnimationFrame(retry);
                return;
            }
            scrollToTarget();
            retryCount += 1;
            if (retryCount < 2) {
                rafId = requestAnimationFrame(retry);
            }
        };
        rafId = requestAnimationFrame(retry);

        return cleanup;
    }, [readContainer(), isMobile, currentIndex]);
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
            if (playerRef?.current) {
                markProgrammaticMute(playerRef.current);
                playerRef.current.setMute(isMuted);
            }
        } else {
            playerRef.current?.skipAd?.();
            playerRef.current?.pauseAd?.();
            playerRef.current?.stop?.();
            playerRef.current?.remove?.();
            // eslint-disable-next-line no-param-reassign
            playerRef.current = null;
        }
    }, [isInView, loading]);
}
