/* eslint-disable no-bitwise                   */
/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useRef, useLayoutEffect } from 'react';

const isVisibleInViewport = element => {
    if (!element) return false;
    const bounds = element.getBoundingClientRect();
    return bounds && Math.abs(bounds.top) < bounds.height && bounds.bottom > 0;
};

const show = element => {
    if (!element.classList.contains('--sticky')) {
        element.classList.add('--sticky');
    }

    if (!element.classList.contains('--active')) {
        element.classList.add('--active');
    }
};

const hide = element => {
    if (element.classList.contains('--sticky')) {
        element.classList.remove('--sticky');
    }

    if (element.classList.contains('--active')) {
        element.classList.remove('--active');
    }
};

const idle = element => target => {
    const { top } = element.getBoundingClientRect();

    const sidebar = document.querySelector(`.${target}`);
    if (!sidebar) return;

    const { top: sidebartop } = sidebar.getBoundingClientRect();

    if (
        (window.getComputedStyle(element).top === '0px' ||
            window.getComputedStyle(element).top === 'auto') &&
        sidebartop > 0
    ) {
        element.style.top = `${Math.abs(top)}px`;
        element.style.position = 'relative';
        element.style.zIndex = 1;
    }
};

const componentIsVisible = component =>
    !component.classList.contains('hlp-none');

const componentDidReachTarget = (component, target) => {
    if (!component || !target) return false;
    const { top } = target.getBoundingClientRect();
    return component.clientHeight > top;
};

export default Component => Target => {
    return props => {
        const scrollPosition = useRef(0);

        const ref = React.createRef();

        useLayoutEffect(() => {
            hide(ref.current);
            const handleScroll = () => {
                const windowY = window.scrollY;

                const target = document.querySelector(`.${Target}`);

                if (componentIsVisible(ref.current)) {
                    if (windowY < scrollPosition.current) {
                        // Scroll up
                        scrollPosition.current = windowY;
                        ref.current.style.cssText = '';
                        hide(ref.current);
                    } else if (windowY >= scrollPosition.current) {
                        // Scroll down
                        scrollPosition.current = windowY;
                        // If it hasn't reached banner caja1 yet
                        if (!componentDidReachTarget(ref.current, target)) {
                            const header = document.querySelector('#header');
                            // If header is out of viewport we make banner cabezal sticky
                            if (!isVisibleInViewport(header)) show(ref.current);
                        } else {
                            hide(ref.current); // Banner cabezal no longer sticky
                            idle(ref.current)(Target); // Make it iddle
                        }
                    }
                } else {
                    hide(ref.current);
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }, [ref]);

        return <Component {...props} ref={ref} />;
    };
};
