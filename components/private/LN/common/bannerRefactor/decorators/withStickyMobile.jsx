/* eslint-disable react/jsx-props-no-spreading */
import React, { useLayoutEffect, useRef } from 'react';

const isNotVisibleInViewport = element => {
    const bounds = element.getBoundingClientRect();
    return bounds.top < bounds.height && bounds.bottom < 0;
};

const hideElement = element => {
    if (element && element.classList.contains('--active')) {
        element.classList.remove('--active');
    }
};

const showElement = element => {
    if (element && !element.classList.contains('--active')) {
        element.classList.add('--active');
    }
};

export default Component => {
    return props => {
        const ref = useRef();
        const scrollPosition = useRef(0);

        useLayoutEffect(() => {
            hideElement(ref.current);

            const handleScroll = () => {
                const sticky = document.getElementById('sticky1_mob')
                    .parentElement;
                const windowY = window.scrollY;
                if (windowY < scrollPosition.current) {
                    // scrolls up
                    scrollPosition.current = windowY;
                    hideElement(ref.current);
                } else if (windowY >= scrollPosition.current) {
                    // scrolls down
                    scrollPosition.current = windowY;
                    if (isNotVisibleInViewport(sticky)) {
                        // if sticky one is out of the viewport
                        showElement(ref.current);
                    }
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }, [ref]);

        return <Component {...props} ref={ref} />;
    };
};
