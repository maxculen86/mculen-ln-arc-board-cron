import { useEffect, useRef, useState } from 'react';

export default function useIntersectionObserver({
    rootMargin = '0px',
    threshold = 0,
    hide = false,
    onViewport = () => {}
} = {}) {
    const targetRef = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        if (hide) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    onViewport();
                    observer.disconnect();
                }
            },
            { rootMargin, threshold }
        );

        if (targetRef?.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef?.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [rootMargin, threshold, hide]);

    return { targetRef, isIntersecting };
}
