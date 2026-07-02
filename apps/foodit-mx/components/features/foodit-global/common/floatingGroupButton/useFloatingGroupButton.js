import { useEffect, useState } from 'react';
import { getTypeOfDevice } from '@ln/hooks';

export const useFloatingGroupButton = ({ observerSelector }) => {
    const [visible, setVisible] = useState(false);

    const typeOfDevice = getTypeOfDevice({
        breakpoints: { desktop: 1280 }
    });

    useEffect(() => {
        if (observerSelector && typeOfDevice !== 'desktop') {
            const callback = entries => {
                entries.forEach(entry => {
                    setVisible(!entry.isIntersecting);
                });
            };

            const sentinel = document.querySelector(observerSelector);
            const intersectionObserver = new IntersectionObserver(callback);
            sentinel && intersectionObserver.observe(sentinel);

            return () => {
                sentinel && intersectionObserver.unobserve(sentinel);
            };
        }

        return () => {};
    }, [observerSelector, typeOfDevice]);

    return {
        visible
    };
};
