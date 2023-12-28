import { useEffect, useState } from 'react';
import { getConfigByLayout } from './helpers';

export const useFloatingGroupButton = ({ layout }) => {
    const [visible, setVisible] = useState(false);

    const { buttons = [], className = '', observerSelector } =
        getConfigByLayout(layout) || {};

    useEffect(() => {
        if (!observerSelector) return;

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
    }, [observerSelector]);

    return {
        buttons,
        className,
        visible
    };
};
