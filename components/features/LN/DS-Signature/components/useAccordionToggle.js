import { useState, useRef, useEffect } from 'react';

function useAccordionToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const pRef = useRef(null);
    const animatingRef = useRef(false);
    const abortRef = useRef(null);

    useEffect(() => () => abortRef.current?.abort(), []);

    const handleToggle = () => {
        if (animatingRef.current) return;
        const wrapper = wrapperRef.current;
        if (!wrapper || !pRef.current) {
            setIsOpen(prev => !prev);
            return;
        }

        animatingRef.current = true;
        const currentH = wrapper.offsetHeight;

        const onEnd = () => {
            wrapper.style.cssText = '';
            animatingRef.current = false;
        };

        wrapper.style.height = `${currentH}px`;
        wrapper.style.overflow = 'hidden';

        abortRef.current?.abort();
        abortRef.current = new AbortController();
        const { signal } = abortRef.current;

        if (!isOpen) {
            setIsOpen(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    wrapper.style.transition = 'height 0.3s ease';
                    wrapper.style.height = `${wrapper.scrollHeight}px`;
                    wrapper.addEventListener('transitionend', onEnd, {
                        once: true,
                        signal
                    });
                });
            });
        } else {
            setIsOpen(false);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    wrapper.style.transition = 'height 0.3s ease';
                    wrapper.style.height = `${pRef.current.offsetHeight}px`;
                    wrapper.addEventListener('transitionend', onEnd, {
                        once: true,
                        signal
                    });
                });
            });
        }
    };

    return { isOpen, wrapperRef, pRef, handleToggle };
}

export default useAccordionToggle;
