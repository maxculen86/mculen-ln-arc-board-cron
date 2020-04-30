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

const componentDidReachTarget = (component, target) =>
    component.offsetTop + component.clientHeight > target.offsetTop;

export default Component => Target => {
    const scrollPos = useRef(0);

    const ref = React.createRef();

    useLayoutEffect(() => {
        const handleScroll = () => {
            const windowY = window.scrollY;
            const target = document.getElementById(`${Target}`);
            show(ref.current);
            if (windowY < scrollPos.current) {
                // scrolls up
                scrollPos.current = windowY;
                hide(ref.current);
            } else if (windowY >= scrollPos.current) {
                // scrolls down
                scrollPos.current = windowY;
                if (!componentDidReachTarget(ref.current, target)) {
                    show(ref.current);
                } else {
                    hide(ref.current);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return React.memo(props => {
        return <Component {...props} ref={ref} />;
    });
};
