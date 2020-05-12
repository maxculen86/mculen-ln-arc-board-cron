import { useEffect, useMemo } from 'react';

const useMutationObserver = (isActive, callback, elementId, observerConfig) => {
    const observer = useMemo(() => new MutationObserver(callback), [callback]);

    useEffect(() => {
        if (isActive) {
            const targetNode = document.getElementById(elementId);
            observer.observe(targetNode, observerConfig);
        } else {
            observer.disconnect();
        }

        return () => observer.disconnect();
    }, [elementId, isActive, observer, observerConfig]);
};

export default useMutationObserver;
