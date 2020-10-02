/* eslint-disable react/jsx-props-no-spreading */
import React, { useLayoutEffect, useRef } from 'react';

const isNotVisibleInViewport = element => {
    if (element) {
        const bounds = element.getBoundingClientRect();
        return bounds.top < -100 && bounds.bottom < 0;
    }
    return false;
};

const hideElement = element => {
    if (element.classList.contains('--active')) {
        element.classList.remove('--active');
    }
};

const showElement = element => {
    if (!element.classList.contains('--active')) {
        element.classList.add('--active');
    }
};

export default Component => {
    return props => {
        const ref = React.createRef();
        const scrollPosition = useRef(0);

        useLayoutEffect(() => {
            // const sticky2 = document.getElementById('sticky2_mob').parentElement;
            const sticky = document.querySelector('#sticky1_mob');

            hideElement(ref.current);

            const handleScroll = () => {
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
