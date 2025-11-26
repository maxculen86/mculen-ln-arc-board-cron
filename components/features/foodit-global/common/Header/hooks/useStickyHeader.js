import { useEffect, useRef, useState } from 'react';

export const useStickyHeader = ({
    observerSelector = '.header-sentinel'
} = {}) => {
    const [sticky, setSticky] = useState('default');
    const hasLeftViewport = useRef(false);

    const getNextState = isIntersecting => {
        const hasLeft = hasLeftViewport.current;

        if (!isIntersecting && !hasLeft) {
            return 'hide-subheader';
        }

        if (hasLeft) {
            return isIntersecting ? 'show-subheader' : 'hide-subheader';
        }

        return 'default';
    };

    const updateViewportState = isIntersecting => {
        if (!isIntersecting && !hasLeftViewport.current) {
            hasLeftViewport.current = true;
        }
    };

    const handleIntersection = entries => {
        entries.forEach(entry => {
            const { isIntersecting } = entry;
            updateViewportState(isIntersecting);
            const nextState = getNextState(isIntersecting);
            setSticky(nextState);
        });
    };

    useEffect(() => {
        const sentinel = document.querySelector(observerSelector);
        if (!sentinel) return undefined;

        const intersectionObserver = new IntersectionObserver(
            handleIntersection
        );
        intersectionObserver.observe(sentinel);

        return () => intersectionObserver.unobserve(sentinel);
    }, [observerSelector]);

    return { sticky };
};
