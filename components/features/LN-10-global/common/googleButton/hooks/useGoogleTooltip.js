import { useState, useEffect, useRef } from 'react';

const CLOSE_COUNT_KEY = 'google_tooltip_close_count';
const CTA_CLICKED_KEY = 'google_tooltip_cta_clicked';

function useGoogleTooltip() {
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);
    const hasBeenInViewRef = useRef(false);
    const scrolledAwayRef = useRef(false);

    useEffect(() => {
        try {
            if (
                typeof window !== 'undefined' &&
                targetRef.current &&
                targetRef.current.offsetParent !== null
            ) {
                const closeCount = parseInt(
                    localStorage.getItem(CLOSE_COUNT_KEY) || '0',
                    10
                );
                const ctaClicked =
                    localStorage.getItem(CTA_CLICKED_KEY) === 'true';

                if (closeCount < 3 && !ctaClicked && !scrolledAwayRef.current) {
                    setIsVisible(true);
                }
            }
        } catch (error) {
            console.error(
                'useGoogleTooltip - LocalStorage unavailable or error: ',
                error
            );
        }
    }, []);

    useEffect(() => {
        if (!isVisible || !targetRef.current) {
            return undefined;
        }
        const el = targetRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    hasBeenInViewRef.current = true;
                } else if (hasBeenInViewRef.current) {
                    setIsVisible(false);
                    scrolledAwayRef.current = true;
                    observer.unobserve(el);
                }
            },
            { threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        try {
            const count = parseInt(
                localStorage.getItem(CLOSE_COUNT_KEY) || '0',
                10
            );
            localStorage.setItem(CLOSE_COUNT_KEY, String(count + 1));
        } catch (error) {
            console.error(
                'useGoogleTooltip handleClose - LocalStorage unavailable or error: ',
                error
            );
        }
    };

    const handleCTAClick = () => {
        setIsVisible(false);
        try {
            localStorage.setItem(CTA_CLICKED_KEY, 'true');
        } catch (error) {
            console.error(
                'useGoogleTooltip handleCTAClick - LocalStorage unavailable or error: ',
                error
            );
        }
    };

    return { isVisible, handleClose, handleCTAClick, targetRef };
}

export default useGoogleTooltip;
