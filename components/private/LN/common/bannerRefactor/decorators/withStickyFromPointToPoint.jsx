/* eslint-disable no-bitwise                   */
/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useRef, useLayoutEffect } from 'react';
import debounce from '../../../../common/utils/debounce';

const show = element => {
    if (!element) return;
    if (!element.classList.contains('--sticky')) {
        element.classList.add('--sticky');
    }

    if (!element.classList.contains('--active')) {
        element.classList.add('--active');
    }
};

const hide = element => {
    if (!element) return;
    if (element.classList.contains('--sticky')) {
        element.classList.remove('--sticky');
    }

    if (element.classList.contains('--active')) {
        element.classList.remove('--active');
    }
};

const componentIsVisible = component =>
    !component.classList.contains('hlp-none');

const componentDidReachTarget = (component, target) => {
    if (!component || !target) return false;
    const { top } = target.getBoundingClientRect();
    return component.clientHeight > top;
};

const componentDidReachViewportTop = element => {
    const header = document.querySelector('#header');
    if (!element || !header) return false;
    const { bottom } = header.getBoundingClientRect();
    const { top } = element.getBoundingClientRect();
    return top < bottom;
};

export default Component => Target => {
    return props => {
        const scrollPosition = useRef(0);

        const ref = React.createRef();

        useLayoutEffect(() => {
            hide(ref.current);
            const handleScroll = debounce(() => {
                const windowY = window.scrollY;
                const target = document.querySelector(`.${Target}`);

                if (componentIsVisible(ref.current)) {
                    scrollPosition.current = windowY;
                    if (
                        !componentDidReachTarget(ref.current, target) &&
                        componentDidReachViewportTop(ref.current)
                    )
                        show(ref.current);
                    if (componentDidReachTarget(ref.current, target)) {
                        hide(ref.current);
                    }
                } else {
                    hide(ref.current);
                }
            });

            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }, [ref]);

        return <Component {...props} ref={ref} />;
    };
};
