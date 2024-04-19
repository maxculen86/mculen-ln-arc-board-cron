import { useEffect, useState } from 'react';

export const useStickyHeader = ({
    observerSelector = '.header-sentinel'
} = {}) => {
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const callback = entries => {
            entries.forEach(entry => {
                setSticky(entry.isIntersecting);
            });
        };

        const sentinel = document.querySelector(observerSelector);
        const intersectionObserver = new IntersectionObserver(callback);

        sentinel && intersectionObserver.observe(sentinel);
        return () => {
            sentinel && intersectionObserver.unobserve(sentinel);
        };
    }, [observerSelector]);

    return {
        sticky
    };
};
