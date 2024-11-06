import { useEffect, useState } from 'react';

export const useStickyHeader = ({
    observerSelector = '.header-sentinel'
} = {}) => {
    const [sticky, setSticky] = useState(true);

    useEffect(() => {
        const callback = entries => {
            entries.forEach(entry => {
                setSticky(entry.isIntersecting);
            });
        };

        const sentinel = document.querySelector(observerSelector);
        const intersectionObserver = new IntersectionObserver(callback);

        if (sentinel) intersectionObserver.observe(sentinel);
        return () => {
            if (sentinel) intersectionObserver.unobserve(sentinel);
        };
    }, [observerSelector]);

    return {
        sticky
    };
};
