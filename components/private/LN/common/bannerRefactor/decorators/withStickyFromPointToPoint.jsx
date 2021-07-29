/* eslint-disable no-bitwise                   */
/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useLayoutEffect } from 'react';
import throttle from '../../../../common/utils/throttle';

const gap = 24;

const addSticky = element => {
    if (!element) return;
    if (!element.classList.contains('--sticky')) {
        element.classList.add('--sticky');
    }

    if (!element.classList.contains('--active')) {
        element.classList.add('--active');
    }
};

const removeSticky = element => {
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

const componentDidReachTarget = (component, point1, point2) => {
    if (!component || !point1 || !point2) return false;
    // top del sidebar
    const { top } = point2.getBoundingClientRect();
    // heigt del header
    const { height } = point1.getBoundingClientRect();

    return top - component.clientHeight - gap - height <= 0;
};

const componentDidReachViewportTop = element => {
    const header = document.querySelector('#header');
    if (!element || !header) return false;
    const { bottom } = header.getBoundingClientRect();
    const { top } = element.getBoundingClientRect();
    return top < bottom;
};

const idle = (element, point1) => {
    if (!point1 || !element) return;

    const { top, height: componentHeight } = element.getBoundingClientRect();
    const { height: point1Height } = point1.getBoundingClientRect();

    element.style.top = `${Math.abs(
        top - componentHeight + point1Height + gap
    )}px`;
    element.style.position = 'relative';
    element.style.zIndex = 101;
};

export default Component => selectors => {
    return props => {
        const ref = React.createRef();
        const [selector1, selector2] = selectors;
        useLayoutEffect(() => {
            removeSticky(ref.current);
            const handleScroll = throttle(() => {
                // header
                const point1 = document.querySelector(selector1);
                // sidebar
                const point2 = document.querySelector(selector2);

                if (componentIsVisible(ref.current)) {
                    // evalua que el componente este entre los dos puntos
                    // si el componente toca el bottom del header (point1) y no toca el top del sidebar (point2)
                    // agrega sticky

                    if (
                        !componentDidReachTarget(ref.current, point1, point2) &&
                        componentDidReachViewportTop(ref.current)
                    ) {
                        addSticky(ref.current);
                    }

                    // Si el componente alcanza el sidebar (point2) y tiene la clase sticky elimina la clase --sticky
                    // agrega los estilos en linea solo si  el componente tiene la clase --sticky
                    if (
                        ref.current.classList.contains('--sticky') &&
                        componentDidReachTarget(ref.current, point1, point2)
                    ) {
                        removeSticky(ref.current);
                        idle(ref.current, point1);
                    }

                    if (
                        componentDidReachTarget(ref.current, point1, point2) &&
                        point2.getBoundingClientRect().top >=
                            point1.getBoundingClientRect().height +
                                ref.current.getBoundingClientRect().height
                    ) {
                        addSticky(ref.current);
                        ref.current.style.cssText = '';
                    }

                    if (
                        window.scrollY <
                        point1.getBoundingClientRect().height + gap
                    ) {
                        addSticky(ref.current);
                        ref.current.style.cssText = '';
                    }

                    // evalua si el header y el sidebar se tocan
                    // si el top del sidebar (point2) es menor o igual al heigth del header (point1) borra estilos en linea
                    if (
                        point2.getBoundingClientRect().top <=
                        point1.getBoundingClientRect().height
                    ) {
                        ref.current.style.cssText = '';
                    }
                } else {
                    removeSticky(ref.current);
                }
            }, 10);

            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }, [ref, selector1, selector2]);

        return <Component {...props} ref={ref} />;
    };
};
