/* eslint-disable no-bitwise                   */
/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useRef, useLayoutEffect } from 'react';

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

const idle = element => {
    const { top } = element.getBoundingClientRect();
    if (window.getComputedStyle(element).top === '0px') {
        element.style.top = `${Math.abs(top)}px`;
        element.style.position = 'relative';
        element.style.zIndex = 1;
    }
};

const componentIsVisible = component =>
    !component.classList.contains('hlp-none');

const componentDidReachTarget = (component, target) =>
    component.clientHeight > target.getBoundingClientRect().top;

export default Component => Target => {
    return props => {
        const scrollPosition = useRef(0);
        // const target = useRef(document.querySelector(`#${Target}`) || null);
        const ref = React.createRef();

        useLayoutEffect(() => {
            const handleScroll = () => {
                const windowY = window.scrollY;
                // TODO: change this by a ref and use getBoundingClientRect func
                const target = document.getElementById(`${Target}`);

                if (componentIsVisible(ref.current)) {
                    if (windowY < scrollPosition.current) {
                        scrollPosition.current = windowY;
                        ref.current.style.cssText = '';
                    } else if (windowY >= scrollPosition.current) {
                        scrollPosition.current = windowY;
                        if (!componentDidReachTarget(ref.current, target)) {
                            show(ref.current);
                        } else {
                            hide(ref.current);
                            idle(ref.current);
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
